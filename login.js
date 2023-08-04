function handleKeyDown(event) {
    if (event.key === 'Enter') {
        login();
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Exibir animação de loading
    const loadingAnimation = document.querySelector('.loading');
    loadingAnimation.style.display = 'flex';

    // Simulando o processo de login (verificação do usuário e senha)
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
    document.querySelector('.main-login').style.display = 'flex'; // Exibe o formulário de login
    document.getElementById('user1-section').style.display = 'none'; // Oculta seção do usuário 1
    document.getElementById('user2-section').style.display = 'none'; // Oculta seção do usuário 2
    document.getElementById('user3-section').style.display = 'none'; // Oculta seção do usuário 1
    document.getElementById('user4-section').style.display = 'none'; // Oculta seção do usuário 2
    document.getElementById('user5-section').style.display = 'none'; // Oculta seção do usuário 1
    document.getElementById('user6-section').style.display = 'none'; // Oculta seção do usuário 2
    document.getElementById('password').value = ''
}


