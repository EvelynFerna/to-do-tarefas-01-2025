const formCadastroUsuario = document.getElementById('formCadastroUsuario');

formCadastroUsuario.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const usuario = {
        nome,
        email
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');

    formCadastroUsuario.reset();
});