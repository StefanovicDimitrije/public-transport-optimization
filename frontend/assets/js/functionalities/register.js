const register = () => {
  let date = document.getElementById("birthdate").value;
  let month = date.substring(0, 2);
  let day = date.substring(3, 5);
  let year = date.substring(6, 10); //10/28/2002
  let myDate = year + "-" + month + "-" + day;
  let pic = document.getElementById("pfp").files[0];

  let fd = new FormData();
  fd.append("pfp", pic);
  fd.set("id", null);
  fd.set("name", document.getElementById("name").value);
  fd.set("surname", document.getElementById("surname").value,);
  fd.set("username", document.getElementById("username").value);
  fd.set("mail", document.getElementById("mail").value);
  fd.set("birthdate", myDate);
  fd.set("password", document.getElementById("password").value);
  fd.set("city", document.getElementById("city").value);
  fd.set("admin", 0);
  fd.set('confirmTicket',0);

  validation = validateForm();
  if (validation == false) {
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
    body: fd // !!!!
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

      setTimeout(function () {  //After a half of a second return the user to the index page
        window.location.href = "../pages/login.html"
      }, 500);

    }
    else if (userReplyJSON.status === "Existing email") {                                                      //unsuccessfull output
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
    } else if (userReplyJSON.status === "Existing username") {                                                      //unsuccessfull output
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
    } else {                                                      //unsuccessfull output
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

function emailIsValid(email) {
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
  } else if (mail == "") {
    alert("mail field must not be empty!");
    return false;
  } else if (city == "") {
    alert("City field must not be empty!");
    return false;
  } else if (password == "") {
    alert("Password field must not be empty!");
    return false;
  } else if (!emailIsValid(mail)) {
    alert("Invlid email address!");
    return false;
  }
  else {
    return true;
  }
}

function editProfile() {

  const alert = document.getElementById("alert"); //Getting the div for alerts

  alert.innerHTML = "";

  var fd = new FormData(); //Declaring fd
  fd.set("id", JSON.parse(sessionStorage.getItem('user')).id);

  let date = document.getElementById("birthdate").value; // Setting the date part

  let month = date.substring(0, 2);
  let day = date.substring(3, 5);
  let year = date.substring(6, 10); //10/28/2002
  let myDate = year + "-" + month + "-" + day;
  
  if (document.getElementById("pfp").files.length != 0){ //If there is a picture uploaded then add it
  let pic = document.getElementById("pfp").files[0];
  fd.append("pfp", pic);
  } else{
    //console.log('There is no picture');
  }

  fd.set("name", document.getElementById("name").value);
  fd.set("surname", document.getElementById("surname").value,);
  fd.set("username", document.getElementById("username").value);
  fd.set("mail", document.getElementById("mail").value);
  fd.set("birthdate", myDate);
  fd.set("newPassword", document.getElementById("newPassword").value);
  fd.set("city", document.getElementById("city").value);
  fd.set("admin", JSON.parse(sessionStorage.getItem('user')).admin);

  fd.set("oldPassword", document.getElementById("oldPassword").value);

  for(var pair of fd.entries()) {
    //console.log(pair[0]+', '+pair[1]);
  }

  if (validateEditForm() && (document.getElementById("pfp").files.length != 0)) {

    fetch('http://localhost:3000/account/editProfile/', {
      method: 'PUT',
      body: fd, // !!!!
    }).then((response) => {
      return response.json();
    }).then((responseJSON) => {

      switch (responseJSON.status) {
        case "edited":

          alert.setAttribute("class", "alert alert-success"); //Display 'correct!'
          alert.innerHTML = "Profile edited successfuly!"

          setTimeout(function () {  //After a half of a second return the user to the index page
            window.location.href = "../pages/index.html"
          }, 500);

          break;
        case "Wrong password":

          alert.setAttribute("class", "alert alert-danger");
          alert.innerHTML = responseJSON.message;

          break;
        case "Existing username":

          alert.setAttribute("class", "alert alert-danger");
          alert.innerHTML = responseJSON.message;

          break;
        case "Existing email":

          alert.setAttribute("class", "alert alert-danger");
          alert.innerHTML = responseJSON.message;

          break;
        case "error":

          alert.setAttribute("class", "alert alert-danger");
          alert.innerHTML = "Server error, please try again!"
          console.log(responseJSON.error);

          break;
      }

    })

  }

  else {

    alert.setAttribute("class", "alert alert-danger");
    alert.innerHTML = "Please review your data input"

  }

}

function validateEditForm() {                               //simple form validation
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const username = document.getElementById("username").value;
  const mail = document.getElementById("mail").value;
  const city = document.getElementById("city").value;
  const password = document.getElementById("oldPassword").value;
  if (name == "") {
    alert("Name field must not be empty!");
    return false;
  } else if (surname == "") {
    alert("Surname field must not be empty!");
    return false;
  } else if (username == "") {
    alert("Username field must not be empty!");
    return false;
  } else if (mail == "") {
    alert("mail field must not be empty!");
    return false;
  } else if (city == "") {
    alert("City field must not be empty!");
    return false;
  } else if (password == "") {
    alert("Please enter your old password!");
    return false;
  } else if (!emailIsValid(mail)) {
    alert("Email adress is not in the profer format!");
    return false;
  }
  else {
    return true;
  }
}