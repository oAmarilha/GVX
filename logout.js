function logout(){
    firebase.auth().signOut().then(() =>{
        showLoading();
        window.location.href = "login.html"
    }).catch(()=>{
        alert('Erro ao fazer logout')
        hideLoading();
    })
}