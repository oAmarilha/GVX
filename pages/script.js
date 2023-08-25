// Função para atualizar o número em um elemento HTML
addValueToScreen();

function addValueToScreen(){
    const valueElement = document.getElementById('applicationsNumber');
	const valueInvested = document.getElementById('investedNumber');
	const profit = document.getElementById('profitNumber');
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
			  const invested = doc.data().money.invested
              // Atualizar o conteúdo do <span> com o valor obtido
             valueElement.textContent = currentCurrency + " " + value;
			 valueInvested.textContent = currentCurrency + " " + invested;
			 profit.textContent = currentCurrency + " " + (value - invested);
			 createChart({july: 0,august: value});
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

function createChart(config){
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
				data: [config.january, config.february, config.march, config.april, config.may, config.june, config.july, config.august, config.september, config.octuber, config.november, config.december]
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
}


function setStatusColor(id) {
	const statusElement = document.getElementById("status");
	const resultadoElement = document.getElementById("resultado-status");
	switch (id) {
	  case "entregue":
		statusElement.style.background = "green";
		resultadoElement.textContent = "Entregue";
		resultadoElement.style.color = "white";        
		break;
	  case "em_analise":
		statusElement.style.background = "yellow";
		resultadoElement.textContent = "Em Análise";
		resultadoElement.style.color = "white";    

		break;
	  case "processamento":
		statusElement.style.background = "red";
		resultadoElement.textContent = "Processamento";
		resultadoElement.style.color = "white";    

	
		break;
	  default:
		statusElement.style.background = "gray";
		resultadoElement.textContent = "Desconhecido";
		resultadoElement.style.color = "white";    

	}
  }


  