document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
});

function checkPermission(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            if (window.location.href.includes('login.html')){
                window.location.href = "dashboard.html";
            }
        } 
        else{
            if (!window.location.href.includes('login.html')){
                window.location.href = "login.html";
            }
        }
        window.onload = checkPermission;
    });
}
