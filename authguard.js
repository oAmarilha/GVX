document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
});

function checkPermission(){
    firebase.auth().onAuthStateChanged(user => {
        const username = user.email.split('@')[0];
            // User is signed in, redirect to the appropriate page
            console.log(username);
            const currentPage = window.location.pathname;
            const allowedPage = "/pages/" + username + ".html";
        if (user) {
            console.log(currentPage)
            console.log(allowedPage)
            if (!allowedPage.includes(currentPage)){
                window.location.href = allowedPage;
            }
        } 
        else{
            window.location.href = "login.html"
            return;
        }
    });
}
