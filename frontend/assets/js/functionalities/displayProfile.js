function displayProfile(data){
    
    document.title = `Profile: ${data.username}`

    document.getElementById("nameTitle").innerHTML = data.name + " " + data.surname;

    document.getElementById("name").innerHTML = data.name;
    document.getElementById("surname").innerHTML = data.surname;
    document.getElementById("username").innerHTML = data.username;

    let date = data.birthdate;
                    
    let month = date.substring(8, 10);
    let day = date.substring(5, 7);
    let year = date.substring(0, 4); 
                    
    let myDate = day + "/" + month + "/" + year;

    document.getElementById("birthdate").innerHTML = myDate;

    document.getElementById("email").innerHTML = data.mail;
    document.getElementById("city").innerHTML = data.city;

    document.getElementById("pfp").setAttribute("src",data.pfp);
}

function startPage(){

    var userId = JSON.parse(sessionStorage.getItem('user')) || {};

    bg = ["bg1.jpg","bg3.jpg","bg4.jpg","bg6.jpg","bg9.jpg"];

    rndbg = Math.floor((Math.random() * 5));

    document.getElementById("background").setAttribute("style",`background-image:url('../assets/img/${bg[rndbg]}');`);

    fetch('http://localhost:3000/account/'+ userId.id, {
            method:'GET'
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            
            if(responseJSON.status == "returned")
                {
                    displayProfile(responseJSON.user);

                }
            else{
                console.log(responseJSON.error);
                return;
            } 
        })

}

function startEdit(){

    var userId= JSON.parse(sessionStorage.getItem('user')) || {};
  
    fetch('http://localhost:3000/account/' + userId.id, {
            method:'GET'
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            
            if(responseJSON.status == "returned")
                {
                    document.title = `Edit: ${responseJSON.user.username}`

                    document.getElementById("nameTitle").innerHTML = responseJSON.user.username;

                    document.getElementById("name").setAttribute("value",responseJSON.user.name);
                    document.getElementById("surname").setAttribute("value",responseJSON.user.surname);
                    document.getElementById("username").setAttribute("value",responseJSON.user.username);
                    document.getElementById("city").setAttribute("value",responseJSON.user.city);
                    document.getElementById("mail").setAttribute("value",responseJSON.user.mail);

                    let date = responseJSON.user.birthdate;
                    
                    let month = date.substring(8, 10);
                    let day = date.substring(5, 7);
                    let year = date.substring(0, 4); 
                    
                    let myDate = day + "/" + month + "/" + year;

                    document.getElementById("birthdate").setAttribute("value",myDate);
                }
            else{
                console.log(responseJSON.error);
                return;
            } 
        })
    
}