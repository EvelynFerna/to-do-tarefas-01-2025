async function carregarTarefas() {
  const res = await fetch('http://localhost:3000/tarefas')
  const tarefas = await res.json()

  const colunas = {
    A_FAZER: document.querySelector('#afazer'),
    FAZENDO: document.querySelector('#fazendo'),
    PRONTO: document.querySelector('#pronto')
  }

  Object.values(colunas).forEach(col => col.innerHTML = '')

  tarefas.forEach(t => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
      <strong>Descrição:</strong> ${t.descricao}<br>
      <strong>Setor:</strong> ${t.setor}<br>
      <strong>Prioridade:</strong> ${t.prioridade}<br>
      <strong>Vinculado a:</strong> ${t.usuario.nome}<br>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="excluir(${t.id})">Excluir</button><br>
      <select id="status-${t.id}">
        <option value="A_FAZER"${t.status === 'A_FAZER' ? ' selected' : ''}>A Fazer</option>
        <option value="FAZENDO"${t.status === 'FAZENDO' ? ' selected' : ''}>Fazendo</option>
        <option value="PRONTO"${t.status === 'PRONTO' ? ' selected' : ''}>Pronto</option>
      </select>
      <button onclick="alterarStatus(${t.id})">Alterar Status</button>
    `
    colunas[t.status].appendChild(card)
  })
}

function editar(id) {
  fetch(`http://localhost:3000/tarefas`)
    .then(res => res.json())
    .then(tarefas => {
      const tarefa = tarefas.find(t => t.id === id)
      localStorage.setItem('tarefaEdit', JSON.stringify(tarefa))
      window.location.href = 'cadastro-tarefas.html'
    })
}

function excluir(id) {
  if (!confirm('Deseja excluir essa tarefa?')) return
  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: 'DELETE'
  }).then(() => carregarTarefas())
}

function alterarStatus(id) {
  const status = document.querySelector(`#status-${id}`).value
  fetch(`http://localhost:3000/tarefas/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  }).then(() => carregarTarefas())
}

document.addEventListener('DOMContentLoaded', carregarTarefas)
