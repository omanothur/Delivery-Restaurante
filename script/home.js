
function verification_login(){
  const token = localStorage.getItem("token")
    
    if(!token){
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
