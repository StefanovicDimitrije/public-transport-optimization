const addQuestion = () => {   
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    let result = document.getElementById("result");
    result.innerHTML = ``;
    let myResult = document.createElement("div");
    if(!emailIsValid(document.getElementById("emailAddress").value))
    {
        
        myResult.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <div class="container">
            <div class="alert-icon">
              <i class="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Oh no!</strong> Your e-mail address is not valid! Please, try again! 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">
                <i class="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </div>
        `
        result.appendChild(myResult);
        return -1;
    }
    else if(!nameIsValid(document.getElementById("firstName")))
    {
        myResult.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <div class="container">
            <div class="alert-icon">
              <i class="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Oops!</strong> You forgot to input your name.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">
                <i class="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </div>
        `
        result.appendChild(myResult);
        return -1;
    }
    else if(textIsValid(document.getElementById("questionText")) == 2)
    {
        myResult.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <div class="container">
            <div class="alert-icon">
              <i class="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Yikes!</strong> It looks like the question you are trying to ask us is simply too short :(
                Please try again!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">
                <i class="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </div>
        `
        result.appendChild(myResult);
        return -1;
    }
    else if(textIsValid(document.getElementById("questionText")) == 3)
    {
        myResult.innerHTML = `
        <div class="alert alert-danger" role="alert">
          <div class="container">
            <div class="alert-icon">
              <i class="now-ui-icons objects_support-17"></i>
            </div>
            <strong>Oh no!</strong> It looks like the question you are trying to ask us is veeery large :(
                Please try to make it shorter
                and try again!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">
                <i class="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </div>
        `
        result.appendChild(myResult);
        return -1;
    }
   
    myResult.innerHTML = `
    <div class="alert alert-success" role="alert">
          <div class="container">
            <div class="alert-icon">
              <i class="now-ui-icons ui-2_like"></i>
            </div>
            <strong>Well done!</strong> You have successfully added a question
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">
                <i class="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </div>
        </div>
    `
    result.appendChild(myResult);

    let question = {

    "id": null,
    "firstName": document.getElementById("firstName").value,
    "emailAddress": document.getElementById("emailAddress").value,
    "question": document.getElementById("questionText").value,
    "date": today,
    "likes": 0
    }
    console.log(question);
    fetch('http://localhost:3000/questions/', {
    method: 'POST',
    body: JSON.stringify(question),
    headers: {
        'Content-Type': 'application/json'
    }
    }).then((respond) => {
    return respond.json();
    }).then((respondJSON) => {
    if (respondJSON.status == "added") {
        loadQuestions();
        
    };
    })
}



function loadQuestions(isMore) { 
    document.getElementById("questionSection").innerHTML="";                           
    fetch('http://localhost:3000/questions', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((questions) => {
        let questionsSection = document.getElementById("questionSection");
        if(questions.length == 0)
        {
            let myCard2 = document.createElement("div");
            myCard2.innerHTML =
            `
            <div class="col-md-12 text-center">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Currently there are no questions :(</h4>
                    <p class="card-text">Feel free to add some questions here!</p>
                </div>
            </div>
        </div>
        `;
        questionsSection.appendChild(myCard2);
        }
        
        let myForum = document.createElement("div");
        let questionLimit = 5;
        if(questions.length <= questionLimit || isMore)
        {
          let myCard = document.createElement("div");
          for (let i = 0; i < questions.length; i++) {
              
              myCard.innerHTML +=
                  `
                  <div class="card p-3 mt-2">
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                      <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].firstName}:</small> <small class="font-weight-bold " style = "font-size: 100%">${questions[i].question} </small></span> </div> <small>${questions[i].date}</small>
                  </div>
                  <div class="action d-flex justify-content-between mt-2 align-items-center">
                      <div class="reply px-4"> <small onclick = removeQuestion(${questions[i].id})>Remove</small> <span class="dots"></span> <small >Reply</small> <span class="dots"></span> <small onclick = "like(${questions[i].id}, ${questions[i].likes})">${questions[i].likes}`+ " " + `  <i class="now-ui-icons ui-2_like"></i></small> </div>
                      <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                  </div>
              </div>
              `;
            
          }
          if(isMore)
          {
            myCard.innerHTML += `
            <div type="submit" class="send-button">
              <a onclick="loadQuestions(false)" class="btn btn-primary btn-block btn-lg" style = "color:white">See less</a>
            </div>
            `;
            
          }
          questionsSection.appendChild(myCard);
        }
        else
        {
          let myCard = document.createElement("div");
          for (let i = 0; i < questionLimit; i++) {
            
            myCard.innerHTML +=
                `
                <div class="card p-3 mt-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                    <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].firstName}:</small> <small class="font-weight-bold " style = "font-size: 100%">${questions[i].question} </small></span> </div> <small>${questions[i].date}</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <small onclick = removeQuestion(${questions[i].id})>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small onclick = "like(${questions[i].id}, ${questions[i].likes})">${questions[i].likes}`+ " " + `<i class="now-ui-icons ui-2_like"></i></small> </div>
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
            </div>
            `;
          questionsSection.appendChild(myCard);
            
        }
        myCard.innerHTML += `
          <div type="submit" class="send-button">
            <a onclick="loadQuestions(true)" class="btn btn-primary btn-block btn-lg" style = "color:white">See ${questions.length-questionLimit} more</a>
          </div>
          `;
          
          
        }
    });
}

const removeQuestion = (index) => {
    fetch('http://localhost:3000/questions/' + index, {
        method: 'DELETE'
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {
        if (responseJSON.status === "deleted") {
            
            loadQuestions();
        }
    })
}

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
function nameIsValid(inputtx) 
  {
      
    if (inputtx.value.length == 0)
     {  	
        return false; 
     }  	
     return true; 
   } 
function textIsValid(inputtx) 
   {
    console.log(inputtx.value.length);
     if (inputtx.value.length < 20)
      {  	
         return 2; 
      }  	
      else if (inputtx.value.length > 10000)
        return 3; 
      else
        return 1;
    }   

  function like(id, likes)
  {
    fetch('http://localhost:3000/questions/' + id, {
      method: 'PUT'
  }).then((myReply) => {
      return myReply.json();
  }).then((questions) => {
    console.log(questions.id);
  });
}