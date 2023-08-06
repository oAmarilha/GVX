document.addEventListener("DOMContentLoaded", function() {
    checkAuthState();
});

function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is signed in, redirect to the appropriate page
            var username = user.email.split('@')[0];
            showSection(username);
        } else {
            // User is not signed in, show the login form
            if (!window.location.href.includes('login.html')) {
                // This code will only run if the current page is NOT login.html
                window.location.href = "pages/login.html"; // Replace 'yourFunction()' with the function you want to execute
            }
            
        }
    });
}