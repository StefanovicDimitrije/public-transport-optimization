const addQuestion = () => {
    var today = getTodaysDate();
    let result = document.getElementById("result");
    result.innerHTML = ``;
    let myResult = document.createElement("div");
    if (!emailIsValid(document.getElementById("emailAddress").value)) {

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
    } else if (!nameIsValid(document.getElementById("firstName"))) {
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
    } else if (textIsValid(document.getElementById("questionText")) == 2) {
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
    } else if (textIsValid(document.getElementById("questionText")) == 3) {
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
        "name": document.getElementById("firstName").value,
        "mail": document.getElementById("emailAddress").value,
        "question": document.getElementById("questionText").value,
        "date": today,
        "likes": 0
    }
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

    document.getElementById("questionSection").innerHTML = "";
    fetch('http://localhost:3000/questions', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((questions) => {
        let questionsSection = document.getElementById("questionSection");
        if (questions.length == 0) {
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

        let questionLimit = 5;
        if (questions.length <= questionLimit || isMore) {
            let myCard = document.createElement("div");
            for (let i = 0; i < questions.length; i++) {

                //

                myCard.innerHTML +=
                    `
                  <div class="card p-3 mt-2">
                  <div class="d-flex justify-content-between align-items-center">
                      <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                      <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].name}:</small> <small class="font-weight-bold " style = "font-size: 100%">${questions[i].question} </small></span> </div> <small>${fixDate(questions[i].date)}</small>
                  </div>
                  <div class="action d-flex justify-content-between mt-2 align-items-center">
                      <div class="reply px-4"> <small id="removeBtn${questions[i].id}" onclick = removeQuestion(${questions[i].id})>Remove</small> <span class="dots"></span> <small id="replyBtn${questions[i].id}" onclick="reply(${questions[i].id})">Reply</small> <span class="dots"></span> <small id="likeBtn${questions[i].id}" onclick = "like(${questions[i].id}, ${questions[i].likes})">${questions[i].likes}` + " " + `  <i class="now-ui-icons ui-2_like"></i></small> </div>
                      <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                  </div>
                  <div id="replySectionArea${questions[i].id}"></div>
                <div id="replySection${questions[i].id}"></div>
              </div>
              `;

                loadReplies(questions[i].id);
            }
            questionsSection.appendChild(myCard);
            if (isMore) {
                myCard.innerHTML += `
            <div type="submit" class="send-button">
              <a onclick="loadQuestions(false)" class="btn btn-primary btn-block btn-lg" style = "color:white">See less</a>
            </div>
            `;

            }

        } else {
            let myCard = document.createElement("div");
            for (let i = 0; i < questionLimit; i++) {

                myCard.innerHTML +=
                    `
                <div class="card p-3 mt-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                    <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].name}:</small> <small class="font-weight-bold " style = "font-size: 100%">${questions[i].question} </small></span> </div> <small>${fixDate(questions[i].date)}</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <small id="removeBtn${questions[i].id}" onclick = "removeQuestion(${questions[i].id})" >Remove</small> <span class="dots"></span> <small onclick="reply(${questions[i].id})" id = 'replyBtn${questions[i].id}'>Reply</small> <span class="dots"></span> <small onclick = "like(${questions[i].id}, ${questions[i].likes})">${questions[i].likes}` + " " + `<i class="now-ui-icons ui-2_like" id = 'likeBtn${questions[i].id}'></i></small> </div>
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
                <div id="replySectionArea${questions[i].id}"></div>
                <div id="replySection${questions[i].id}"></div>
            </div>
            `;


                loadReplies(questions[i].id);

            }
            myCard.innerHTML += `
          <div type="submit" class="send-button">
            <a onclick="loadQuestions(true)" class="btn btn-primary btn-block btn-lg" style = "color:white">See ${questions.length-questionLimit} more</a>
          </div>
          `;

            questionsSection.appendChild(myCard);

        }
    }).then(() => adminBtns());

}

function adminBtns() {

    //For the remove buttons, their id all starts with 'removeBtn'
    if ((user = JSON.parse(sessionStorage.getItem('user')) || {}).admin != 1 || !(Object.keys(user).length)) {

        $("[class^='dots']").hide();

        $("[id^='removeBtn']").hide();
        $("[id^='removeBtn']").attr('onclick', '');

        $("[id^='replyBtn']").hide();
        $("[id^='replyBtn']").attr('onclick', '');

        //$( "[id^='likeBtn']" ).hide();
        $("[id^='likeBtn']").attr('onclick', '');

    }
}

function loadReplies(id) {
    fetch('http://localhost:3000/questionsReply/' + id, {
        method: 'GET',
    }).then((myReply) => {
        return myReply.json();
    }).then((reply) => {
        fetch('http://localhost:3000/account/admins/', {
            method: 'GET',
        }).then((myReply) => {
            return myReply.json();
        }).then((usernameReply) => {
            let replySection = document.getElementById("replySection" + id);
            for (var i = 0; i < reply.length; i++) {
                let myCard = document.createElement("div");
                myCard.innerHTML =
                    `
                    <div class="card p-3 mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                        <small class="font-weight-bold text-primary" style = "font-size: 100%">${usernameReply[reply[i].tk_id_user].user.username}:</small> <small class="font-weight-bold " style = "font-size: 80%">${reply[i].reply} </small></span> </div> <small>${fixDate(reply[i].date)}</small>
                    </div>
                    <div class="action d-flex justify-content-between mt-2 align-items-center" style = "font-size: 90%">
                        <div class="reply px-4"> <small id="removeBtn${reply[i].id}" onclick = removeQuestionReply(${reply[i].id})>Remove</small> <span class="dots"></span> </span> <small onclick = "like(${reply[i].id}, ${reply[i].likes})">${reply[i].likes}` + " " + `<i class="now-ui-icons ui-2_like"></i></small> </div>
                        <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                    </div>
                    <div id="question${reply[i].id}">
                </div>
                `;
                replySection.appendChild(myCard);
            }
        });


    }).then(() => adminBtns());

}




const removeQuestion = (index) => {
    fetch(`http://localhost:3000/questionsReply/${index}`, {
        method: 'GET'
    }).then((response1) => {
        return response1.json();
    }).then((responseJSON1) => {
        if (responseJSON1[0] != undefined) {
            console.log(responseJSON1[0].id);
            removeQuestionReply(responseJSON1[0].id);
        }
        fetch(`http://localhost:3000/questions/${index}`, {
            method: 'DELETE'
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            if (responseJSON.status === "deleted") {
                loadQuestions();
            }
        })
    })

}
const removeQuestionReply = (index) => {
    fetch(`http://localhost:3000/questionsReply/${index}`, {
        method: 'DELETE'
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {
        if (responseJSON.status === "deleted") {
            loadQuestions();
        }
    })
}

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function nameIsValid(inputtx) {

    if (inputtx.value.length == 0) {
        return false;
    }
    return true;
}

function textIsValid(inputtx) {
    if (inputtx.value.length < 20) {
        return 2;
    } else if (inputtx.value.length > 10000)
        return 3;
    else
        return 1;
}
/*
function like(id) {
    fetch('http://localhost:3000/questions/' + id, {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((questions) => {
      let likes = questions.likes;

        fetch(`http://localhost:3000/questionsReply/${index}`, {
            method: 'DELETE'
        }).then((response) => {
            return response.json();
        }).then((responseJSON) => {
            if (responseJSON.status === "deleted") {

            }
        })
    });
}
*/

function reply(id) {
    let replySection = document.getElementById("replySectionArea" + id);
    replySection.id = "reply" + id;

    var myCard = document.createElement("div");
    myCard.innerHTML =
        `
        <div class="form-group">
        <div class="col-md-12" id = "">
        <br>
            <textarea class="form-control" placeholder="Reply to a question" id="replyText${id}" rows="3" style = "background-color: #fbfbfa"></textarea>

            <button id="replyBtn${id}" class="btn btn-danger" style= "background-color:#f6963c"onclick="addReply(${id})">Reply</button>
        </div>
    </div>   
          `;
    replySection.appendChild(myCard);

    //adminBtns();

}

function addReply(id) {

    let reply = {

        "id": null,
        "tk_id_question": id,
        "tk_id_user": JSON.parse(sessionStorage.getItem('user')).id,
        "reply": document.getElementById("replyText" + id).value,
        "date": getTodaysDate(),
        "likes": 0
    }
    fetch('http://localhost:3000/questionsReply/', {
        method: 'POST',
        body: JSON.stringify(reply),
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

function getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}