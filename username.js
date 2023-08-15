const userMail = document.getElementById('usernameHeader')
console.log(userMail)
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // O usuário está logado
      const userEmail = capitalizeFirstLetter(user.email.split('@')[0]);
      userMail.textContent = "Olá " + userEmail
      console.log('Email do usuário logado:', userEmail);
    } else {
      // O usuário não está logado
      console.log('Nenhum usuário logado');
    }
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

