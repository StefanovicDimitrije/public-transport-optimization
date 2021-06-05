//const { response } = require("../../../../backend/javniPrevoz/app");
var user= JSON.parse(localStorage.getItem('user')) || {};

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function login(){

    event.preventDefault();

    const alert = document.getElementById("alert");

    alert.innerHTML = "";

    let user = {
        mail: document.getElementById("loginmail").value,
        pass: document.getElementById("loginpass").value
    }

    if (emailIsValid(user.mail) && (user.pass != "") ){

    fetch('http://localhost:3000/account/login/', {
        method:'POST',
        body: JSON.stringify(user)
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {
        if (responseJSON.status === "exists") {

            alert.setAttribute("class","alert alert-success");
            alert.innerHTML = "Succesful log-in!"

            localStorage.setItem("user", JSON.stringify(responseJSON.user));

            /*fetch('http://localhost:3000/login',{
                method: 'POST',
                body: JSON.stringify(responseJSON.user)
            })*/

            setTimeout(function () {
                window.location.href="../pages/index.html"
            },500);
            
        }
        
        if(responseJSON.status != "exists"){

            alert.setAttribute("class","alert alert-danger");
            alert.innerHTML = "You have entered incorrect data"

        }
    })
    }
}

function logout(){

    localStorage.setItem("user", JSON.stringify({}));

    window.location.href="../pages/index.html"

}

function startLogin(){

    let user = JSON.parse(localStorage.getItem("user")) || {};
    //console.log(user);
    
    if (Object.keys(user).length){
        logged();
    } else{
        notLogged()
    }

}

function notLogged(){

    document.getElementById("logoutNavLink").setAttribute("class","nav-link d-none");
    
    document.getElementById("logoutNavLink").innerHTML = "Logout1";

    document.getElementById("loginNav").setAttribute("class","nav-link");
    document.getElementById("registerNav").setAttribute("class","nav-link");
    
    document.getElementById("invisibleNavList1").setAttribute("class","navbar-nav d-none");

}

function logged(){

    let dropdownMenu = document.getElementById("mainNavDrop");

    let divider = document.createElement("div");
    divider.setAttribute("class","dropdown-divider");

    let header = document.createElement("div");
    header.setAttribute("class","dropdown-header");
    header.innerHTML ="Profile";

    let view = document.createElement("a");
    view.setAttribute("class","dropdown-item");
    view.setAttribute("href","profilePage.html");
    view.innerHTML ="View And Edit Profile";

    let favorites = document.createElement("a");
    favorites.setAttribute("class","dropdown-item");
    favorites.setAttribute("href","#");
    favorites.innerHTML ="View Favorites";

    let ticket = document.createElement("a");
    ticket.setAttribute("class","dropdown-item");
    ticket.setAttribute("href","#");
    ticket.innerHTML ="Extend Ticket";

    dropdownMenu.appendChild(divider);
    dropdownMenu.appendChild(header);
    dropdownMenu.appendChild(view);
    dropdownMenu.appendChild(favorites);
    dropdownMenu.appendChild(ticket);

    document.getElementById("loginNav").setAttribute("class","nav-link d-none")
    document.getElementById("registerNav").setAttribute("class","nav-link d-none")

    document.getElementById("logoutNavLink").setAttribute("class","nav-link")

    document.getElementById("invisibleNavList1").setAttribute("class","navbar-nav d-lg-none")

}

/**
 * 
 * 
 */