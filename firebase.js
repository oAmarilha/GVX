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

function showLoading(loadingAnimation) {
  loadingAnimation.style.display = 'flex';
}

function hideLoading(loadingAnimation) {
  loadingAnimation.style.display = 'none';
}

function login() {
    var loadingAnimation = document.querySelector('.loading');
    showLoading(loadingAnimation);
    setTimeout(function() {
      auth.signInWithEmailAndPassword(document.getElementById('username').value, document.getElementById('password').value)
          .then(response => {
              window.location.href = 'dashboard.html'
              hideLoading(loadingAnimation);
          })
          .catch(error => {
              alert('Usuário e senha não correspondem');
              hideLoading(loadingAnimation);
          });  
  }, 100); // 
  
  
}


function logout(){
    auth.signOut().then(() =>{
        window.location.href = "login.html"
    }).catch(()=>{
        alert('Erro ao fazer logout')
        hideLoading();
    })
}

function username(allInfo = true){
const userNameHeader = document.querySelectorAll('.usernameHeader');
const usernameProfile = document.getElementById('profileUsername');
const usernameInfo = document.getElementById('usernameInfo');
const mailUser = document.getElementById('mailUser');
// Verificar o estado de autenticação do usuário
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userUid = user.uid;
    const userMail = user.email;
    // Referência ao documento específico com base no UID do usuário
    const docRef = firebase.firestore().collection('database').doc(userUid);
    // Obter o documento
    docRef.get()
      .then((doc) => {
        if (doc.exists) {
          const currentUser = doc.data().money.user;
          if (allInfo === true){
          userNameHeader.textContent = currentUser;
          usernameProfile.innerHTML = currentUser;
          usernameInfo.innerHTML += currentUser;
          mailUser.innerHTML += userMail;       
          }else{
          for (var i = 0; i < userNameHeader.length; i++) {
              userNameHeader[i].textContent = currentUser;
          }
          userNameHeader.textContent = currentUser;
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
}

function downloadInvoice(buttonId) {
  // Verifique se o usuário está autenticado
  auth.onAuthStateChanged(user => {
      if (user) {
          // Obtenha o UID do usuário atual
          const uid = user.uid;
          // Crie a referência do Firebase Storage com o UID do usuário
          const storageRef = storage.ref(`Invoice/${uid}/${buttonId}.pdf`);

          // Obtenha a URL de download
          storageRef
              .getDownloadURL()
              .then(url => {
                  // Abra a nova janela apenas se a URL estiver disponível
                  if (url) {
                      const downloadWindow = window.open(url);
                      if (!downloadWindow || downloadWindow.closed || typeof downloadWindow.closed === "undefined") {
                          alert("O navegador bloqueou o pop-up. Habilite as pop-ups nas configurações do navegador.");
                      }
                  } else {
                      // Se não houver URL, oculte o botão
                      document.getElementById(buttonId).style.display = 'none';
                  }
              })
              .catch(error => {
                  // Verifique se o erro é de objeto não encontrado
                  if (error.code === 'storage/object-not-found') {
                      // Se for, oculte o botão
                      alert('Este invoice ainda não está pronto, verifique em outro momento')
                  } else {
                      // Caso contrário, exiba o erro padrão
                      alert('Erro ao obter a URL do arquivo:' + error);
                  }
              });
      } else {
          // O usuário não está autenticado, faça o tratamento adequado aqui
          console.log('Usuário não autenticado.');
      }
  });
}

  function balance(){
    const valueElement = document.getElementById('value');
    const idNumber = document.getElementById('idNumber');
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userUid = user.uid;
        // Referência ao documento específico com base no UID do usuário
        const docRef = firestore.collection('database').doc(userUid);
        // Obter o documento
        docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const value = doc.data().money.value;
			        const currentCurrency = doc.data().money.currency;
              // Atualizar o conteúdo do <span> com o valor obtido
              idNumber.innerHTML += userUid;
             valueElement.textContent = currencyFormat(value, currentCurrency);
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
}

function addValueToScreen(){
const valueElement = document.getElementById('applicationsNumber');
const valueInvested = document.getElementById('investedNumber');	
const shipments = document.getElementById('shipments');
const profit = document.getElementById('profitNumber');
  // Verificar o estado de autenticação do usuário
  auth.onAuthStateChanged((user) => {
    if (user) {
      const userUid = user.uid;
      // Referência ao documento específico com base no UID do usuário
      const docRef = firestore.collection('database').doc(userUid);

      // Obter o documento
      docRef.get()
        .then((doc) => {
          if (doc.exists) {
            const value = doc.data().money.value;
      const currentCurrency = doc.data().money.currency;
      const invested = doc.data().money.invested;
      const profitValue = value - invested;
      const shipmentsValue = doc.data().money.shipments;
            // Atualizar o conteúdo do <span> com o valor obtido
           valueElement.textContent = currencyFormat(value, currentCurrency);
     valueInvested.textContent = currencyFormat(invested, currentCurrency);
     profit.textContent = currencyFormat(profitValue, currentCurrency);
     shipments.textContent = currencyFormat(shipmentsValue);
     //createChart({january:0,february:0,march:0,april:0,may:0,june: 0,july: 0,august: value});
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
}

function currencyFormat(valor, moeda) {
	if (moeda === "BRL") {
	  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	} else if (moeda === "USD") {
	  return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	} else {
	  // Se a moeda não for especificada, formate apenas com base nas casas decimais
	  return valor.toLocaleString('pt-BR');
	}
  }

  function buttonClick(botaoId){
    var botao = document.getElementById(botaoId);

    botao.classList.add('clicado');

    setTimeout(function() {
        botao.classList.remove('clicado');
    }, 10000);
}

function createGraphics(){
  var ctx = document.getElementById("chart-bars").getContext("2d");

  new Chart(ctx, {
	type: "bar",
	data: {
	  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb","Mar"],
	  datasets: [{
		label: "Valor",
		tension: 0.4,
		borderWidth: 0,
		borderRadius: 4,
		borderSkipped: false,
		backgroundColor: "#fff",
		data: [0, 0, 0, 0, 0, 0, 0],
		maxBarThickness: 6
	  }, ],
	},
	options: {
	  responsive: true,
	  maintainAspectRatio: false,
	  plugins: {
		legend: {
		  display: false,
		}
	  },
	  interaction: {
		intersect: false,
		mode: 'index',
	  },
	  scales: {
		y: {
		  grid: {
			drawBorder: false,
			display: false,
			drawOnChartArea: false,
			drawTicks: false,
		  },
		  ticks: {
			suggestedMin: 0,
			suggestedMax: 500,
			beginAtZero: true,
			padding: 15,
			font: {
			  size: 14,
			  family: "Open Sans",
			  style: 'normal',
			  lineHeight: 2
			},
			color: "#fff"
		  },
		},
		x: {
		  grid: {
			drawBorder: false,
			display: false,
			drawOnChartArea: false,
			drawTicks: false
		  },
		  ticks: {
			display: false
		  },
		},
	  },
	},
  });


  var ctx2 = document.getElementById("chart-line").getContext("2d");

  var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
  gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
  gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
  gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
  gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors

  new Chart(ctx2, {
	type: "line",
	data: {
	  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
	  datasets: [{
		  label: "Valor data",
		  tension: 0.4,
		  borderWidth: 0,
		  pointRadius: 0,
		  borderColor: "#cb0c9f",
		  borderWidth: 3,
		  backgroundColor: gradientStroke1,
		  fill: true,
		  data: [0, 0, 0, 0, 0, 0, 0],
		  maxBarThickness: 6

		},
	  ],
	},
	options: {
	  responsive: true,
	  maintainAspectRatio: false,
	  plugins: {
		legend: {
		  display: false,
		}
	  },
	  interaction: {
		intersect: false,
		mode: 'index',
	  },
	  scales: {
		y: {
		  grid: {
			drawBorder: false,
			display: true,
			drawOnChartArea: true,
			drawTicks: false,
			borderDash: [5, 5]
		  },
		  ticks: {
			display: true,
			padding: 10,
			color: '#b2b9bf',
			font: {
			  size: 11,
			  family: "Open Sans",
			  style: 'normal',
			  lineHeight: 2
			},
		  }
		},
		x: {
		  grid: {
			drawBorder: false,
			display: false,
			drawOnChartArea: false,
			drawTicks: false,
			borderDash: [5, 5]
		  },
		  ticks: {
			display: true,
			color: '#b2b9bf',
			padding: 20,
			font: {
			  size: 11,
			  family: "Open Sans",
			  style: 'normal',
			  lineHeight: 2
			},
		  }
		},
	  },
	},
  });
}