// Função para verificar se a solicitação de saque está ativa
function checkWithdrawalStatus() {
    const userUid = firebase.auth().currentUser.uid;

    // Referência ao documento específico com base no UID do usuário
    const docRef = firestore.collection('database').doc(userUid);

    // Obter o documento do usuário
    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                const withdrawalRequestActive = doc.data().money.withdrawalRequest;

                // Verificar se a solicitação de saque está ativa
                if (withdrawalRequestActive) {
                    // Se estiver ativa, vá diretamente para a mensagem de auditoria
                    document.getElementById('auditMessage').style.display = 'block';

                    // Esconda a seção do formulário de saque
                    document.getElementById('withdrawalSection').style.display = 'none';
                } else {
                    // Se não estiver ativa, verifique o valor de money.status
                    const withdrawalStatus = doc.data().money.status;

                    // Se o status for falso, mostre a seção de saque
                    if (!withdrawalStatus) {
                        document.getElementById('withdrawalSection').style.display = 'block';
                    } else {
                        // Se o status for verdadeiro, abra o formulário de saque
                        createSection('saque');
                    }
                }
            } else {
                console.log('O documento do usuário não foi encontrado.');
            }
        })
        .catch((error) => {
            console.log('Erro ao obter o documento do usuário:', error);
        });
}

// Modifique a função createSection para chamar a função de verificação apenas quando necessário
function createSection(section) {
    // Verifica se a seção já está carregada
    const currentHTML = document.getElementById('html').innerHTML;

    fetch(section + '.html')
        .then(response => response.text())
        .then(menuHTML => {
            // Adiciona uma verificação para evitar atualizações desnecessárias
            if (menuHTML !== currentHTML) {
                document.getElementById('html').innerHTML = menuHTML;

                if (section === 'main') {
                    addValueToScreen();
                    createGraphics();
                    username(false);
                } else if (section === 'invoice') {
                    balance();
                } else if (section === 'profile') {
                    username();
                }

                pageName(section);
                activeButton(section);

                // Seção específica para verificar o status de saque
                if (section === 'saque') {
                    checkWithdrawalStatus();
                }
            }
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
			// Format the value as currency with fixed two cents
			let formattedValue = new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}).format(numericValue / 100); // Divida por 100 para lidar com os centavos
	
			// Update the input value
			input.value = formattedValue;
		} else {
			// If not a valid number, set the value to an empty string
			input.value = '';
		}
	}

	function handleWithdrawal() {
		// Retrieve values from the input fields
		let withdrawalAmount = document.getElementById('withdrawalAmount').value.replace(/[^\d]/g, ''); // Remova caracteres não numéricos
		let pixKey = document.getElementById('pixKey').value;
	
		// Verifique se ambas as informações são fornecidas
		if (!withdrawalAmount || !pixKey) {
			// Mostre uma mensagem de alerta
			alert('Por favor, preencha todos os campos obrigatórios.');
			return; // Não prossiga se as informações estiverem ausentes
		}
	
		// Mostrar a animação de loading
		const loadingAnimation = document.querySelector('.loading');
		showLoading(loadingAnimation);
	
		// Converta o valor para centavos antes de enviar (remova o R$ e formate)
		let numericValue = parseFloat(withdrawalAmount) / 100;
	
		// Arredonde o valor para o inteiro mais próximo
		numericValue = Math.round(numericValue);
	
		// UID do usuário logado
		const userUid = firebase.auth().currentUser.uid;
	
		// Referência ao documento específico com base no UID do usuário
		const docRef = firestore.collection('database').doc(userUid);
	
		// Adicione uma entrada no documento do usuário indicando a solicitação de saque
		docRef.update({
			'money.withdrawalRequest': true,
		})
		.then(() => {
			// Dados a serem enviados para o FormsPree
			const formData = {
				'Valor do Saque': numericValue,
				'Chave Pix': pixKey,
				'UID do Usuário': userUid,
			};
	
			// Envia os dados para o FormsPree
			return fetch('https://formspree.io/f/xeqbbovw', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
		})
		.then(response => response.json())
		.then(data => {
			// Faça algo com a resposta do FormsPree, se necessário
			console.log('Resposta do FormsPree:', data);
		})
		.catch(error => {
			// Lida com erros
			console.error('Erro ao enviar dados para o FormsPree:', error);
		})
		.finally(() => {
			// Esconder a animação de loading após 2 segundos
			setTimeout(() => {
				hideLoading(loadingAnimation);
				// Exiba a mensagem de auditoria após o carregamento
				document.getElementById('auditMessage').style.display = 'block';
			}, 500);
		});
		document.getElementById('withdrawalSection').style.display = 'none';
	}

function returnToIndex() {
    // Redirecione para a página inicial ou realize qualquer outra ação desejada
    createSection('main')
}