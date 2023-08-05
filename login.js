const firebaseConfig = {
    apiKey: "AIzaSyB3ew6jNivndgi23Qt-J82SI6JdctQAzKE",
    authDomain: "react-auth-22e3e.firebaseapp.com",
    projectId: "react-auth-22e3e",
    storageBucket: "react-auth-22e3e.appspot.com",
    messagingSenderId: "1033348236004",
    appId: "1:1033348236004:web:61f06539b25ac94248a2f1"
};
firebase.initializeApp(firebaseConfig)

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        login();
    }
}

function showLoading(){
    const loadingAnimation = document.querySelector('.loading');
    loadingAnimation.style.display = 'flex';
    return loadingAnimation
}

function hideLoading(){
    const loadingAnimation = showLoading();
    loadingAnimation.style.display = 'none';
}

function login() {
    showLoading();
    console.log('antes')
    firebase.auth().signInWithEmailAndPassword(document.getElementById('username').value, document.getElementById('password').value).then(response =>{
        console.log('success', response)
        var username = response.user.email.split('@')[0];
        console.log(username)
        if (username != 'admin'){
            showSection(username);
        }
        else{
            window.location.href="pages/admin.html";
        }
        
        hideLoading();
        
    }).catch(error => {
        alert('Usuário ou senha inválidos!');
        console.log('error', error)
        hideLoading();
    });
    console.log('depois')
}

function showSection(sectionId) {
    // Oculte o formulário de login
    var page = sectionId + ".html";
    window.location.href="pages/" + page;
}

function voltarLogin() {
    document.getElementById("btn-voltar").removeEventListener("click", voltarLogin); // Removendo o ouvinte atual, se existir
    window.location.href = "../index.html";
      
    const sections = document.querySelectorAll('.class-id');

    // Percorra a lista de elementos e oculte-os
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.main-login').style.display = 'flex'; // Exibe o formulário de login
    document.getElementById('password').value = ''
}
