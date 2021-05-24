const loadQuestion = (id) => {                            
    fetch('http://localhost:3000/questions', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((questions) => {
        
        for (let i = 0; i < questions.length; i++) {
            
            if(questions[i].idNovic == id)
            {
                var questionSection = document.getElementById("questionSection"+(id-1));
                console.log(questions[i].idNovic);
                var myCard2 = document.createElement("div");
                myCard2.innerHTML =
                    `
                    <div class="card p-3 mt-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/ZSkeqnd.jpg" width="30" class="user-img rounded-circle mr-2">
                    <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].idUporabnik}:</small> <small class="font-weight-bold " style = "font-size: 100%">
                    ${questions[i].vprasanje} </small></span> </div> <small>${questions[i].datum}</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
            </div>
            
                   
                `;
                questionSection.appendChild(myCard2);
            }
            
        }
    
    });
}


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

    let question = {

    "id": null,
    "firstName": document.getElementById("firstName").value,
    "emailAddress": document.getElementById("emailAddress").value,
    "question": document.getElementById("questionText").value,
    "date": today
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
    if (respondJSON.status != "added") {
        alert("Your message has been successfully sent!");
        
    };
    })
}

const loadQuestions = () => {                            
    fetch('http://localhost:3000/questions', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((questions) => {
        let questionsSection = document.getElementById("questionSection");

        for (let i = 0; i < questions.length; i++) {
            let myCard = document.createElement("div");
            myCard.innerHTML =
                `
                <div class="card p-3 mt-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="../assets/img/default-avatar.png" width="30" class="user-img rounded-circle mr-2">
                    <small class="font-weight-bold text-primary" style = "font-size: 120%">@${questions[i].firstName}:</small> <small class="font-weight-bold " style = "font-size: 100%">
                    ${questions[i].question} </small></span> </div> <small>${questions[i].date}</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
            </div>
            `;
           
            questionsSection.appendChild(myCard);
        }
    });
}