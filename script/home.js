
function verification_login(){
    if('token' in localStorage){
        let status = true
    }else{
        let status = false
        window.location.href = "./login.html"
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "../index.html";
}

const userData = JSON.parse(localStorage.getItem("userData"));
const usernameDisplay = document.getElementById("username-display");
usernameDisplay.textContent = `Olá, ${userData.name}!`;
