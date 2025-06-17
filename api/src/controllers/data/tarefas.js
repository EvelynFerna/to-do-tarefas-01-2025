async function carregarUsuarios() {
  const res = await fetch('http://localhost:3000/usuarios')
  const usuarios = await res.json()
  const select = document.querySelector('#usuario')

  usuarios.forEach(u => {
    const option = document.createElement('option')
    option.value = u.id
    option.textContent = u.nome
    select.appendChild(option)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  carregarUsuarios()

  // Edição: preencher formulário se houver dados no localStorage
  const dados = JSON.parse(localStorage.getItem('tarefaEdit'))
  if (dados) {
    document.querySelector('#descricao').value = dados.descricao
    document.querySelector('#setor').value = dados.setor
    document.querySelector('#prioridade').value = dados.prioridade
    setTimeout(() => {
      document.querySelector('#usuario').value = dados.usuarioId
    }, 200)
    localStorage.setItem('id', dados.id)
  }
})

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const descricao = document.querySelector('#descricao').value.trim()
  const setor = document.querySelector('#setor').value.trim()
  const prioridade = document.querySelector('#prioridade').value
  const usuarioId = parseInt(document.querySelector('#usuario').value)

  if (!descricao || !setor || !prioridade || !usuarioId) {
    alert('Preencha todos os campos!')
    return
  }

  const tarefa = {
    descricao, setor, prioridade, usuarioId
  }

  const id = localStorage.getItem('id')
  if (id) {
    tarefa.id = parseInt(id)
  }

  const res = await fetch('http://localhost:3000/tarefas', {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarefa)
  })

  if (res.ok) {
    alert('Cadastro concluído com sucesso')
    localStorage.removeItem('tarefaEdit')
    localStorage.removeItem('id')
    window.location.href = 'gerenciartarefas.html'
  } else {
    alert('Erro ao cadastrar tarefa')
  }
})
