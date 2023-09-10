// Função para atualizar o número em um elemento HTML
addValueToScreen();

function addValueToScreen(){
    const valueElement = document.getElementById('applicationsNumber');
	const valueInvested = document.getElementById('investedNumber');	
	const shipments = document.getElementById('shipments');
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
			  const invested = doc.data().money.invested;
			  const profitValue = value - invested;
			  const shipmentsValue = doc.data().money.shipments
			  console.log(typeof(profitValue))
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

function downloadInvoice() {
    const storage = firebase.storage();
    const storageRef = storage.ref('Invoice/tTgIbATjpNVVfi5QV7HEocaIZRa2/GVX01664.pdf');

    storageRef.getDownloadURL().then(url => {
        console.log('URL do arquivo:', url);
        window.open(url, '_blank');
    }).catch(error => {
        console.error('Erro ao obter a URL do arquivo:', error);
    });
}

  var ctx = document.getElementById("chart-bars").getContext("2d");

  new Chart(ctx, {
	type: "bar",
	data: {
	  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	  datasets: [{
		label: "Sales",
		tension: 0.4,
		borderWidth: 0,
		borderRadius: 4,
		borderSkipped: false,
		backgroundColor: "#fff",
		data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
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
	  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	  datasets: [{
		  label: "Mobile apps",
		  tension: 0.4,
		  borderWidth: 0,
		  pointRadius: 0,
		  borderColor: "#cb0c9f",
		  borderWidth: 3,
		  backgroundColor: gradientStroke1,
		  fill: true,
		  data: [50, 40, 5, 220, 500, 250, 400, 230, 500],
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
