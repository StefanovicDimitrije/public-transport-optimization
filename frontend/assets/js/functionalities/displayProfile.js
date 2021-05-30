//const { response } = require("../../../../backend/javniPrevoz/app");
var user= JSON.parse(localStorage.getItem('user')) || {};

function displayProfile(data){
    
    document.title = `Profile: ${data.username}`

    document.getElementById("nameTitle").innerHTML = data.name + " " + data.surname;

    document.getElementById("name").innerHTML = data.name;
    document.getElementById("surname").innerHTML = data.surname;
    document.getElementById("username").innerHTML = data.username;

    document.getElementById("birthdate").innerHTML = data.birthdate;
    document.getElementById("email").innerHTML = data.mail;
    document.getElementById("city").innerHTML = data.city;

    document.getElementById("pfp").setAttribute("src",data.pfp);
}

function startPage(){

    bg = ["bg1.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg9.jpg"];

    rndbg = Math.floor((Math.random() * 5));

    document.getElementById("background").setAttribute("style",`background-image:url('../assets/img/${bg[rndbg]}');`);

    let user = JSON.parse(localStorage.getItem("user"));
	
    console.log(user);

    displayProfile(user);

    /*fetch('http://localhost:3000/login/',{
        method:'GET'
    }).then((response) =>{
        return response.json();
    }).then((data) => {
        displayProfile(data);
    })*/

}