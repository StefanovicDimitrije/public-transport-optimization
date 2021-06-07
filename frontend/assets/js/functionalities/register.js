const register = () => {
    let date =document.getElementById("birthdate").value;
    console.log(date);
    let month = date.substring(0, 2);
    let day = date.substring(3, 5);
    let year = date.substring(6, 10); //10/28/2002
    let myDate = year + "-" + month + "-" + day;
    console.log(myDate);
    let pfpPath = document.getElementById("pfp").value;
    let pfpPicture = pfpPath.replace('C:\\fakepath\\', '');
    let user = {                                     ///create object with selected values
        id: null,
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        username: document.getElementById("username").value,
        mail: document.getElementById("mail").value,
        birthdate: myDate,
        pfp: pfpPicture,
        password: document.getElementById("password").value,
        city: document.getElementById("city").value
    }
    console.log(user);
    validation = validateForm();
    if (validation == false)
    {
        document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oh snap!</strong> Change a few things up and try submitting again.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
            return -1;
    }
    fetch('http://localhost:3000/account//register/', {
        method: 'POST',
        body: JSON.stringify(user), // !!!!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((userReply) => {
        return userReply.json();
    }).then((userReplyJSON) => {
        if (userReplyJSON.status === "added") {                     //successfull output
            document.getElementById("notification").innerHTML = `
            <div class="alert alert-success" role="alert">
                        <div class="container">
                            <div class="alert-icon">
                                <i class="now-ui-icons ui-2_like"></i>
                            </div>
                            <strong>Well done!</strong> You successfully created your profile!
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">
                                    <i class="now-ui-icons ui-1_simple-remove"></i>
                                </span>
                            </button>
                        </div>
                    </div>
            `;

        }
        else if (userReplyJSON.status === "existing email") {                                                      //unsuccessfull output
            document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oopsie!</strong> Looks like an account with that email already exists!.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
        }else if (userReplyJSON.status === "existing username") {                                                      //unsuccessfull output
            document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oopsie!</strong> Looks like an account with that usernme already exists!.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
        }else {                                                      //unsuccessfull output
            document.getElementById("notification").innerHTML =
            `<div class="alert alert-danger" role="alert">
            <div class="container">
              <div class="alert-icon">
                <i class="now-ui-icons objects_support-17"></i>
              </div>
              <strong>Oh snap!</strong> Backend doesnt work!.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                  <i class="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </div>
          </div>
            `;
        };
    })
}

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

function validateForm() {                               //simple form validation
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const username = document.getElementById("username").value;
    const mail = document.getElementById("mail").value;
    const city = document.getElementById("city").value;
    const password = document.getElementById("password").value;
    if (name == "") {
        alert("Name field must not be empty!");
        return false;
    } else if (surname == "") {
        alert("Surname field must not be empty!");
        return false;
    } else if (username == "") {
        alert("Username field must not be empty!");
        return false;
    }else if (mail == "") {
        alert("mail field must not be empty!");
        return false;
    }else if (city == "") {
        alert("City field must not be empty!");
        return false;
    }else if (password == "") {
        alert("Password field must not be empty!");
        return false;
    } else if(!emailIsValid(mail))
    {
        alert("Invlid email address!");
        return false;
    }
     else {
        return true;
    }
}

function editProfile(){

    const alert = document.getElementById("alert");

    alert.innerHTML = "";

    let date =document.getElementById("birthdate").value;

    let month = date.substring(0, 2);
    let day = date.substring(3, 5);
    let year = date.substring(6, 10); //10/28/2002
    let myDate = year + "-" + month + "-" + day;

    let pfpPath = document.getElementById("pfp").value;
    let pfpPicture = pfpPath.replace('C:\\fakepath\\', '');

    let user = {                                     ///create object with selected values
        id: null,
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        username: document.getElementById("username").value,
        mail: document.getElementById("mail").value,
        birthdate: myDate,
        pfp: pfpPicture,
        password: document.getElementById("password").value,
        city: document.getElementById("city").value
    }
    console.log(user);
   
    if (validateEditForm()){

        fetch('http://localhost:3000/account/editProfile/', {
            method: 'PUT',
            body: JSON.stringify(user), // !!!!
            headers: {
                'Content-Type': 'application/json'
                }
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {

            if (responseJSON.status === "edited") {

                alert.setAttribute("class","alert alert-success"); //Display 'correct!'
                alert.innerHTML = "Profile edited successfuly!"

                sessionStorage.setItem("user",JSON.stringify(responseJSON.user))

                setTimeout(function () {  //After a half of a second return the user to the index page
                    window.location.href="../pages/index.html"
                },500);

            }

            if (responseJSON.status === "wrong") {

                alert.setAttribute("class","alert alert-danger");
                alert.innerHTML = responseJSON.message;

            }

            if (responseJSON.status === "error") {
                alert.setAttribute("class","alert alert-danger");
                alert.innerHTML = "Server error, please try again!"
            }

        })

    }

    else{

        alert.setAttribute("class","alert alert-danger");
        alert.innerHTML = "Please review your data input"

    }

}

function validateEditForm() {                               //simple form validation
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const username = document.getElementById("username").value;
    const city = document.getElementById("city").value;

    if (name == "") {
        alert("Name field must not be empty!");
        return false;
    } else if (surname == "") {
        alert("Surname field must not be empty!");
        return false;
    } else if (username == "") {
        alert("Username field must not be empty!");
        return false;
    }else if (city == "") {
        alert("City field must not be empty!");
        return false;
    } 
     else {
        return true;
    }
}