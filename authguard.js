document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
});

function checkPermission(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const username = user.email.split('@')[0];
            // User is signed in, redirect to the appropriate page
            console.log(username);
            const currentPage = window.location.pathname;
            const allowedPage = "/pages/" + username + ".html";
            console.log(currentPage)
            console.log(allowedPage)
            if (!allowedPage.includes(currentPage)){
                window.location.href = allowedPage;
            }
        } 
        else{
            if (!window.location.href.includes('login.html')){
                window.location.href = "login.html";
            }
            return;
        }
    });
}
