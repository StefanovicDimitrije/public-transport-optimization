//const { response } = require("../../../../backend/javniPrevoz/app");
//var user= JSON.parse(sessionStorage.getItem('user')) || {};

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

    var user= JSON.parse(sessionStorage.getItem('user')) || {};

    console.log(user);

    bg = ["bg1.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg9.jpg"];

    rndbg = Math.floor((Math.random() * 5));

    document.getElementById("background").setAttribute("style",`background-image:url('../assets/img/${bg[rndbg]}');`);

    displayProfile(user);

}

function startEdit(){

    var user= JSON.parse(sessionStorage.getItem('user')) || {};

    console.log(user);    

    document.title = `Edit: ${user.username}`

    document.getElementById("nameTitle").innerHTML = user.username;

    document.getElementById("name").setAttribute("value",user.name);
    document.getElementById("surname").setAttribute("value",user.surname);
    document.getElementById("username").setAttribute("value",user.username);
    document.getElementById("city").setAttribute("value",user.city);

    let date = user.birthdate;
    
    let month = date.substring(8, 10);
    let day = date.substring(5, 7);
    let year = date.substring(0, 4); 
    
    let myDate = day + "/" + month + "/" + year;

    document.getElementById("birthdate").setAttribute("value",myDate);
    
}

