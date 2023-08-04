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
        let username = response.user.email.split('@')[0];
        console.log(username)
        showSection(username);
        hideLoading();
        
    }).catch(error => {
        alert('Usuário ou senha inválidos!');
        console.log('error', error)
        hideLoading();
    });
    console.log('depois')


    // Exibir animação de loading
    

    // Simulando o processo de login (verificação do usuário e senha)
    /*
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    setTimeout(function() {
        // Verifique se o usuário e senha correspondem a algum usuário registrado
        if (username === 'guievangelista' && password === '232427') {
            showSection('user1-section');
        } else if (username === 'salvaneto' && password === '343739') {
            showSection('user2-section');
        } else if (username === 'isacrolim' && password === '676863') {
            showSection('user3-section');
        } else if (username === 'italofreitas' && password === '787673') {
            showSection('user4-section');
        } else if (username === 'wesley2023' && password === '474449') {
            showSection('user5-section');
        } else if (username === 'gustavolima' && password === '909592') {
            showSection('user6-section');
        } else {
            alert('Usuário ou senha inválidos!');
        }

        // Ocultar animação de loading após o login
        loadingAnimation.style.display = 'none';
    }, 1000); // Apenas simulação, você pode remover esse setTimeout e adicionar sua lógica de login real.
    */
}

function showSection(sectionId) {
    // Oculte o formulário de login
    document.querySelector('.main-login').style.display = 'none';
    // Exibe a seção específica do usuário e aplica a classe user-section
    const userSection = document.getElementById(sectionId);
    userSection.style.display = 'flex'; // Muda para 'flex' para respeitar as propriedades de exibição definidas na classe CSS
    userSection.classList.add('user-section');
}

function voltarLogin() {
    const sections = document.querySelectorAll('.class-id');

    // Percorra a lista de elementos e oculte-os
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.querySelector('.main-login').style.display = 'flex'; // Exibe o formulário de login
    document.getElementById('password').value = ''
}

