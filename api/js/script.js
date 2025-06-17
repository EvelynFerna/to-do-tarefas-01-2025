
async function carregarUsuarios() {
  const usuarioSelect = document.getElementById('usuario');
  if (!usuarioSelect) return;

  try {
    const res = await fetch('http://localhost:3000/usuarios');
    const usuarios = await res.json();

    usuarioSelect.innerHTML = '';
    usuarios.forEach(usuario => {
      const option = document.createElement('option');
      option.value = usuario.id;
      option.textContent = usuario.nome;
      usuarioSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    usuarioSelect.innerHTML = '<option disabled>Erro ao carregar</option>';
    usuarioSelect.disabled = true;
  }
}

const form = document.getElementById('formCadastroTarefa');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById('prioridade').value.toUpperCase();
    const status = document.getElementById('status').value;
    const usuarioId = parseInt(document.getElementById('usuario').value);

    const tarefa = { descricao, setor, prioridade, status, usuarioId };
    const tarefaId = localStorage.getItem('tarefaEdicaoId');

    try {
      const url = tarefaId
        ? `http://localhost:3000/tarefas/${tarefaId}`
        : `http://localhost:3000/tarefas`;
      const method = tarefaId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
      });

      if (!res.ok) throw new Error('Erro ao salvar tarefa');
      alert(tarefaId ? 'Tarefa atualizada!' : 'Tarefa cadastrada!');
      localStorage.removeItem('tarefaEdicaoId');
      window.location.href = 'gerenciartarefas.html';
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar tarefa');
    }
  });

  carregarTarefaParaEdicao();
}


async function carregarTarefas() {
  const container = document.querySelector('.tarefas');
  if (!container) return;

  const res = await fetch('http://localhost:3000/tarefas');
  const tarefas = await res.json();

  const colunas = {
    A_FAZER: document.querySelector('[data-status="A_FAZER"]'),
    FAZENDO: document.querySelector('[data-status="FAZENDO"]'),
    PRONTO: document.querySelector('[data-status="PRONTO"]')
  };

  Object.values(colunas).forEach(col => col.innerHTML = col.querySelector('h3').outerHTML);

  tarefas.forEach(tarefa => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <strong>Descrição:</strong> ${tarefa.descricao}<br>
      <strong>Setor:</strong> ${tarefa.setor}<br>
      <strong>Prioridade:</strong> ${tarefa.prioridade}<br>
      <strong>Vinculado a:</strong> ${tarefa.usuario?.nome || 'Desconhecido'}<br>
      <button onclick="editarTarefa(${tarefa.id})">Editar</button>
      <button onclick="excluirTarefa(${tarefa.id})">Excluir</button><br><br>
      <select id="status-${tarefa.id}">
        <option value="A_FAZER" ${tarefa.status === 'A_FAZER' ? 'selected' : ''}>A Fazer</option>
        <option value="FAZENDO" ${tarefa.status === 'FAZENDO' ? 'selected' : ''}>Fazendo</option>
        <option value="PRONTO" ${tarefa.status === 'PRONTO' ? 'selected' : ''}>Pronto</option>
      </select>
      <button onclick="atualizarStatus(${tarefa.id})">Atualizar</button>
    `;
    colunas[tarefa.status].appendChild(card);
  });
}


async function excluirTarefa(id) {
  if (!confirm('Deseja excluir esta tarefa?')) return;

  try {
    await fetch(`http://localhost:3000/tarefas/${id}`, { method: 'DELETE' });
    carregarTarefas();
  } catch (err) {
    console.error(err);
    alert('Erro ao excluir tarefa');
  }
}

async function atualizarStatus(id) {
  try {
    const novoStatus = document.getElementById(`status-${id}`).value;

    const res = await fetch(`http://localhost:3000/tarefas`);
    const tarefas = await res.json();
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) return alert('Tarefa não encontrada');

    tarefa.status = novoStatus;

    await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefa)
    });

    carregarTarefas();
  } catch (error) {
    console.error(error);
    alert('Erro ao atualizar status');
  }
}
function editarTarefa(id) {
  localStorage.setItem('tarefaEdicaoId', id);
  window.location.href = 'cadastrodetarefas.html';
}

async function carregarTarefaParaEdicao() {
  const tarefaId = localStorage.getItem('tarefaEdicaoId');
  if (!tarefaId) return;

  try {
    const res = await fetch('http://localhost:3000/tarefas');
    const tarefas = await res.json();
    const tarefa = tarefas.find(t => t.id == tarefaId);

    if (!tarefa) return;

    document.getElementById('descricao').value = tarefa.descricao;
    document.getElementById('setor').value = tarefa.setor;
    document.getElementById('prioridade').value = tarefa.prioridade.toLowerCase();
    document.getElementById('status').value = tarefa.status;
    document.getElementById('usuario').value = tarefa.usuarioId;
  } catch (error) {
    console.error('Erro ao carregar tarefa para edição', error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios();
  carregarTarefas();
});
