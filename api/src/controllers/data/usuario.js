document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const nome = document.querySelector('#nome').value.trim()
  const email = document.querySelector('#email').value.trim()

  if (!nome || !email || !email.includes('@')) {
    alert('Preencha todos os campos corretamente.')
    return
  }

  const res = await fetch('http://localhost:3000/usuario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email })
  })

  if (res.ok) {
    alert('Cadastro concluído com sucesso!')

    window.location.href = 'gerenciartarefas.html'
  } else {
    alert('Erro ao cadastrar o usuário.')
  }
})
