// Função para atualizar o número em um elemento HTML
addValueToScreen();

function addValueToScreen(){
    const valueElement = document.getElementById('applicationsNumber');
    // Verificar o estado de autenticação do usuário
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userUid = user.uid;

        // Referência ao documento específico com base no UID do usuário
        const docRef = firebase.firestore().collection('database').doc(userUid);

        // Obter o documento
        docRef.get()
          .then((doc) => {
            if (doc.exists) {
              const value = doc.data().money.value;
			  const currentCurrency = doc.data().money.currency;

              // Atualizar o conteúdo do <span> com o valor obtido
             valueElement.textContent = currentCurrency + " " + value;
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


function updateNumber(elementId, number) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = number;
    }
}

// Exemplo de uso para atualizar os números (substitua os números de exemplo pelos números desejados)
//updateNumber('applicationsNumber', "R$"+2.8 + "M"); // Atualiza "Applications" para 3000
//updateNumber('statusSelect', "COMPLETO"); // Atualiza "Shortlisted" para 6000
updateNumber('peopleNumber', "+R$"+ 1.5 + "M"); // Atualiza "People" para 4500


var chart    = document.getElementById('chart').getContext('2d'),
    gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, 'rgba(0, 199, 214, 0.32)');
gradient.addColorStop(0.3, 'rgba(0, 199, 214, 0.1)');
gradient.addColorStop(1, 'rgba(0, 199, 214, 0)');


var data  = {
    labels: [ 'Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho','Agosto','Setembro','Outubro', 'Novembro','Deezembro' ],
    datasets: [{
			label: 'Applications',
			backgroundColor: gradient,
			pointBackgroundColor: '#00c7d6',
			borderWidth: 1,
			borderColor: '#0e1a2f',
			data: [5000, 6000, 8000, 10000, 9500, 13000,14600,16400,13000,17000,18500,20500]
    }]
};

var options = {
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		easing: 'easeInOutQuad',
		duration: 520
	},
	scales: {
		yAxes: [{
      ticks: {
        fontColor: '#5e6a81'
      },
			gridLines: {
				color: 'rgba(200, 200, 200, 0.08)',
				lineWidth: 1
			}
		}],
    xAxes:[{
      ticks: {
        fontColor: '#5e6a81'
      }
    }]
	},
	elements: {
		line: {
			tension: 0.4
		}
	},
	legend: {
		display: false
	},
	point: {
		backgroundColor: '#00c7d6'
	},
	tooltips: {
		titleFontFamily: 'Poppins',
		backgroundColor: 'rgba(0,0,0,0.4)',
		titleFontColor: 'white',
		caretSize: 5,
		cornerRadius: 2,
		xPadding: 10,
		yPadding: 10
	}
};

var chartInstance = new Chart(chart, {
    type: 'line',
    data: data,
		options: options
});

// document.querySelector('.open-right-area').addEventListener('click', function () {
//     document.querySelector('.app-right').classList.add('show');
// });

// document.querySelector('.close-right').addEventListener('click', function () {
//     document.querySelector('.app-right').classList.remove('show');
// });

// document.querySelector('.menu-button').addEventListener('click', function () {
//     document.querySelector('.app-left').classList.add('show');
// });

// document.querySelector('.close-menu').addEventListener('click', function () {
//     document.querySelector('.app-left').classList.remove('show');
// });


// status

function updateStatus(selectedStatus) {
	const statusSelect = document.getElementById("statusSelect");
	const statusDiv = document.getElementById("status");
	//const selectedStatus = "Em processamento";
	statusSelect.textContent = selectedStatus;

	statusDiv.style.backgroundColor = getStatusColor(selectedStatus);
  }

  function getStatusColor(status) {

	if (status == "Em processamento") {
		return "red";
	} else if (status == "a caminho") {
		return "yellow";
	} else if (status == "entregue") {
		return "green";
	} else {
		return "gray";
	}
	// switch (status) {
	//   case "Em processamento":
	// 	return "red";
	//   case "a caminho":
	// 	return "yellow";
	//   case "entregue":
	// 	return "green";
	//   default:
	// 	return "gray";
	// }
  }

  // Inicializar o status ao carregar a página
  updateStatus();

  