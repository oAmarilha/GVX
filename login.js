function handleKeyDown(event) {
    if (event.key === 'Enter') {
        login();
    }
}

function showLoading() {
    const loadingAnimation = document.querySelector('.loading');
    loadingAnimation.style.display = 'flex';
}

function hideLoading() {
    const loadingAnimation = document.querySelector('.loading');
    loadingAnimation.style.display = 'none';
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(document.getElementById('username').value, document.getElementById('password').value).then(response => {
        window.location.href = 'dash.html'
        hideLoading();
    }).catch(error => {
        alert('Usuário ou senha inválidos!');
        hideLoading();
    });
}

function voltarLogin() {
    document.getElementById("btn-voltar").removeEventListener("click", voltarLogin); // Removendo o ouvinte atual, se existir
    window.location.href = "login.html";
      
    const sections = document.querySelectorAll('.class-id');

    // Percorra a lista de elementos e oculte-os
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.main-login').style.display = 'flex'; // Exibe o formulário de login
    document.getElementById('password').value = ''
}

