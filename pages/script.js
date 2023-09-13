function createSection(section){
	fetch(section + '.html')
		.then(response => response.text())
		.then(menuHTML => {
			document.getElementById('html').innerHTML = menuHTML;
			if (section === 'main'){
			addValueToScreen();
			createGraphics();
			username(false);
			} else if (section === 'invoice'){
				balance();
			}else if (section === 'profile'){
				username();
			}
			pageName(section);
			activeButton(section);
		});
	}

	function pageName(name){
		var currentPage = document.getElementById('pageName');
		const namePage = name[0].toUpperCase() + name.substring(1);
		currentPage.innerHTML = namePage;
	  }

function activeButton(button){
	var botao = document.getElementById(button);
	var todosBotoes = document.querySelectorAll("button");
	for (var i = 0; i < todosBotoes.length; i++) {
		todosBotoes[i].classList.remove("active");
	}
	// Adiciona a palavra à classe do botão
	botao.classList.add("active");
}

function createGraphics(){
  var ctx = document.getElementById("chart-bars").getContext("2d");

  new Chart(ctx, {
	type: "bar",
	data: {
	  labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
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