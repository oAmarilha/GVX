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

// Function to format the currency input
function formatarValor(input) {
	// Remove non-numeric characters
	let rawValue = input.value.replace(/[^\d]/g, '');

	// Parse the numeric value
	let numericValue = parseFloat(rawValue);

	// Check if the numeric value is a valid number
	if (!isNaN(numericValue)) {
		// Format the value as currency
		let formattedValue = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(numericValue / 100); // Divida por 100 para lidar com os centavos

		// Update the input value
		input.value = formattedValue;
	} else {
		// If not a valid number, set the value to an empty string
		input.value = '';
	}
}

// Function to handle withdrawal button click (replace with your logic)
function handleWithdrawal() {
	// Retrieve values from the input fields
	let withdrawalAmount = document.getElementById('withdrawalAmount').value.replace(/[^\d]/g, ''); // Remova caracteres não numéricos
	let pixKey = document.getElementById('pixKey').value;

	// Converta o valor para centavos antes de enviar (remova o R$ e formate)
	let numericValue = parseFloat(withdrawalAmount) / 100;

	// Substitua isso pela sua lógica de saque
	// Por enquanto, registre os valores no console
	console.log('Valor do Saque:', numericValue);
	console.log('Chave Pix:', pixKey);
}