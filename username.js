const userNameHeader = document.getElementById('usernameHeader')
const valueElement = document.getElementById('applicationsNumber');
// Verificar o estado de autenticação do usuário
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userUid = user.uid;
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
          updateStatus(currentStatus)
          // Atualizar o conteúdo do <span> com o valor obtido
         userNameHeader.textContent = "Olá " + currentUser;
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

