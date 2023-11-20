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