const loadAll = () => {                             //generates product table
    fetch('http://localhost:3000/novice', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((news) => {
        let newsSection = document.getElementById("container");

        for (let i = 0; i < news.length; i++) {
            //newsSection.appendChild(myCard);
            let myCard = document.createElement("div");
            myCard.innerHTML =
                `
            <div class="row">
            <div class="col-md-12 text-center">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">${news[i].Title}</h4>
                            <p class="card-text">${news[i].Text}</p>
                            <p class="card-text"><small class="text-muted">Posted: ${news[i].Date}</small></p>
                            <img class="card-img-bottom" src="../assets/img/${news[i].Cover}" alt="Card image cap">
                            <div class="form-group">
                                <div class="col-md-12" id = "questionSection${i}">
                                <br>
                                    <textarea class="form-control" placeholder="Give us your oppinion on this matter" id="questionTxt${i}" rows="3" id = "questionTxt${i}" style = "background-color: #fbfbfa"></textarea>
                      
                                    <button class="btn btn-danger" style= "background-color:#f6963c"onclick="addQuestion(${news[i].id}, ${i})">Comment</button>
                                </div>
                            </div>    
                            <div id = "commentSection"></div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            `;
           
            newsSection.appendChild(myCard);
            
            console.log(news[i].Cover);
            loadComment(news[i].id);
        }
    });
}
const loadComment = (id) => {                            
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

const addQuestion = (idNovic, inputfieldId) => {   
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
        "idUporabnik": 2,
        "idNovic": idNovic,
        "vprasanje": document.getElementById("questionTxt"+inputfieldId).value,
        "datum": today
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
            loadAll();
        };
    })
}


/*<div class="col-md-6 text-center">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Station was changed</h4>
                                <a href="#">
                                <div class="card-header mt-2">
                                    Read more
                                </div>
                            </a>
                            </div>

                        </div>
                    </div>*/