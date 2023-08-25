document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
});

function checkPermission(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (window.location.href.includes('login.html')){
                window.location.href = "dash.html";
            }
        } 
        else{
            if (!window.location.href.includes('login.html')){
                window.location.href = "login.html";
            }
            else if (window.location.href.includes('dash.html')){
                window.location.href = "login.html";
            }
            return;
        }
    });
}
