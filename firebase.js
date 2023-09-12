const firebaseConfig = {
    apiKey: "AIzaSyB3ew6jNivndgi23Qt-J82SI6JdctQAzKE",
    authDomain: "react-auth-22e3e.firebaseapp.com",
    projectId: "react-auth-22e3e",
    storageBucket: "react-auth-22e3e.appspot.com",
    messagingSenderId: "1033348236004",
    appId: "1:1033348236004:web:61f06539b25ac94248a2f1"
};

// Inicialize o Firebase
firebase.initializeApp(firebaseConfig);
// Inicialize o Firebase Authentication
const auth = firebase.auth();
// Inicialize o Firebase Storage
const storage = firebase.storage();
// Inicialize o Firebase Firestore
const firestore = firebase.firestore();

document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
});

function checkPermission(){
    auth.onAuthStateChanged(user => {
        if (user) {
            if (window.location.href.includes('login.html')){
                window.location.href = "dashboard.html";
            }
        } 
        else{
            if (!window.location.href.includes('login.html')){
                window.location.href = "login.html";
            }
        }
        window.onload = checkPermission;
    });
}

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
        window.location.href = 'dashboard.html'
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

function logout(){
    auth.signOut().then(() =>{
        window.location.href = "login.html"
    }).catch(()=>{
        alert('Erro ao fazer logout')
        hideLoading();
    })
}

const userNameHeader = document.getElementById('usernameHeader')
const valueElement = document.getElementById('applicationsNumber');
const usernameProfile = document.getElementById('profileUsername');
const usernameInfo = document.getElementById('usernameInfo');
const mailUser = document.getElementById('mailUser');
// Verificar o estado de autenticação do usuário
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userUid = user.uid;
    const userMail = user.email;
    console.log(userMail);
    console.log(userUid)
    // Referência ao documento específico com base no UID do usuário
    const docRef = firebase.firestore().collection('database').doc(userUid);
    // Obter o documento
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const currentUser = doc.data().money.user;
          const currentStatus = doc.data().money.status;
          console.log(currentStatus)
          console.log(currentUser);
          // Atualizar o conteúdo do <span> com o valor obtido
          try{
            userNameHeader.textContent = "Bem vindo, " + currentUser + "!!!";
          }catch{
            usernameProfile.innerHTML = currentUser;
            usernameInfo.innerHTML += currentUser;
            mailUser.innerHTML += userMail;
            
          }
         
        } else {
          console.log('O documento não foi encontrado.');
        }
      })
      .catch((error) => {
        console.log('Erro ao obter o documento:', error);
      });
  } else {
    console.log('Nenhum usuário autenticado.');
  }
});

function downloadInvoice() {
	// Verifique se o usuário está autenticado
	auth.onAuthStateChanged(user => {
	  if (user) {
		// Obtenha o UID do usuário atual
		const uid = user.uid;
		console.log(uid);
		// Crie a referência do Firebase Storage com o UID do usuário
		const storageRef = storage.ref(`Invoice/${uid}/GVX01664.pdf`);
  
		// Obtenha a URL de download e abra em uma nova janela
		storageRef
		  .getDownloadURL()
		  .then(url => {
			console.log('URL do arquivo:', url);
			window.open(url, '_blank');
		  })
		  .catch(error => {
			console.error('Erro ao obter a URL do arquivo:', error);
		  });
	  } else {
		// O usuário não está autenticado, faça o tratamento adequado aqui
		console.log('Usuário não autenticado.');
	  }
	});
  }