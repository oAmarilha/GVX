const userNameHeader = document.getElementById('usernameHeader')
const valueElement = document.getElementById('applicationsNumber');
const usernameProfile = document.getElementById('profileUsername');
const usernameInfo = document.getElementById('usernameInfo');
const mailUser = document.getElementById('mailUser');
// Verificar o estado de autenticação do usuário
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const userUid = user.uid;
    const userMail = user.email;
    console.log(userMail);
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
          // Atualizar o conteúdo do <span> com o valor obtido
          try{
            userNameHeader.textContent = "Bem vindo, " + currentUser + "!!!";
          }catch{
            usernameProfile.innerHTML = currentUser;
            usernameInfo.innerHTML += currentUser;
            mailUser.innerHTML += userMail;
            
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

