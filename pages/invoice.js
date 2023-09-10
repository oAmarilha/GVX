function downloadInvoice() {
    // Verifique se o usuário está autenticado
firebase.auth().onAuthStateChanged(user => {
	if (user) {
	  // Obtenha o UID do usuário atual
	  const uid = user.uid;
      console.log(uid)  
	  // Crie a referência do Firebase Storage com o UID do usuário
	  const storage = firebase.storage();
	  const storageRef = storage.ref(`Invoice/${uid}/GVX01664.pdf`);
  
	  // Obtenha a URL de download e abra em uma nova janela
	  storageRef.getDownloadURL().then(url => {
		console.log('URL do arquivo:', url);
		window.open(url, '_blank');
	  }).catch(error => {
		console.error('Erro ao obter a URL do arquivo:', error);
	  });
	} else {
	  // O usuário não está autenticado, faça o tratamento adequado aqui
	  console.log('Usuário não autenticado.');
	}
  });
  
}