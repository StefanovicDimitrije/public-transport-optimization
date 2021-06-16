var user= JSON.parse(sessionStorage.getItem('user')) || {};

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
            if (responseJSON.status === "exists") { //If everything went fine

                alert.setAttribute("class","alert alert-success"); //Display 'correct!'
                alert.innerHTML = "Succesful log-in!"

                console.log(responseJSON);
                
                let userId = {
                    id:responseJSON.user.id,
                    admin: responseJSON.user.admin
                }

                //Just id save in session
                
                sessionStorage.setItem("user", JSON.stringify(userId)); //Set session storage for the user currently logged in

                setTimeout(function () {  //After a half of a second return the user to the index page
                    window.location.href="../pages/index.html"
                },500);
                
            }
            
            if(responseJSON.status != "exists"){ //If the login was unsuccessfull

                alert.setAttribute("class","alert alert-danger");
                alert.innerHTML = "You have entered incorrect log-in info"

            }
        })
    }

    else{   //If validation failed

        alert.setAttribute("class","alert alert-danger");
        alert.innerHTML = "Please enter your log-in info properly"
    }
}

function logout(){

    //sessionStorage.setItem("user", JSON.stringify({id:0, admin: 0}));
    sessionStorage.clear();

    window.location.href="../pages/index.html"

}

function startLogin(){
    
    document.getElementById("adminNews").setAttribute("class","nav-link d-none");
    document.getElementById("adminTicket").setAttribute("class","nav-link d-none");

    if ((user= JSON.parse(sessionStorage.getItem('user')) || {}).id == 0 || !(Object.keys(user).length)){
        notLogged()
    } else{
        logged();
    }

}

function notLogged(){

    document.getElementById("logoutNavLink").setAttribute("class","nav-link d-none disabled");
    
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
    favorites.setAttribute("href","viewFav.html");
    favorites.innerHTML ="View Favorites";

    let ticket = document.createElement("a");
    ticket.setAttribute("class","dropdown-item");
    ticket.setAttribute("href","extendTicket.html");
    ticket.innerHTML ="Extend Ticket";

    dropdownMenu.appendChild(divider);
    dropdownMenu.appendChild(header);
    dropdownMenu.appendChild(view);
    dropdownMenu.appendChild(favorites);
    dropdownMenu.appendChild(ticket);

    document.getElementById("loginNav").setAttribute("class","nav-link d-none disabled")
    document.getElementById("registerNav").setAttribute("class","nav-link d-none disabled")

    document.getElementById("logoutNavLink").setAttribute("class","nav-link")

    document.getElementById("invisibleNavList1").setAttribute("class","navbar-nav d-lg-none");

    if ((user= JSON.parse(sessionStorage.getItem('user'))).admin == 1){

        let navItem = document.createElement("li");
        navItem.className = 'nav-item';

        let navLink = document.createElement("a");
        navLink.className = 'nav-link';
        navLink.setAttribute('data-toggle','tab');
        navLink.innerHTML = 'Admin';

        navItem.appendChild(navLink);

        document.getElementById('visibleNavList').prepend(navItem);

        let divider1 = document.createElement("div");
        divider1.setAttribute("class","dropdown-divider");

        let header1 = document.createElement("div");
        header1.setAttribute("class","dropdown-header");
        header1.innerHTML ="Admin";

        let addNews = document.createElement("a");
        addNews.setAttribute("class","dropdown-item");
        addNews.setAttribute("href","addNews.html");
        addNews.innerHTML ="Add news";

        let ticket1 = document.createElement("a");
        ticket1.setAttribute("class","dropdown-item");
        ticket1.setAttribute("href","reviewTickets.html");
        ticket1.innerHTML ="Review tickets";

        dropdownMenu.appendChild(divider1);
        dropdownMenu.appendChild(header1);
        dropdownMenu.appendChild(addNews);
        dropdownMenu.appendChild(ticket1);

        document.getElementById("adminNews").setAttribute("class","nav-link d-lg-none");
        document.getElementById("adminTicket").setAttribute("class","nav-link d-lg-none");
        
    }

}