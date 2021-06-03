const loadAll = () => { 
    
    //startLogin();

    //generates product table
    fetch('http://localhost:3000/news', {
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
                            <h4 class="card-title">${news[i].title}</h4>
                            <p class="card-text">${news[i].text}</p>
                            <p class="card-text"><small class="text-muted">Posted: ${news[i].date}</small></p>
                            <img class="card-img-bottom" src="../assets/img/${news[i].cover}" alt="Card image cap">
                            <div class="form-group">
                                <div class="col-md-12" id = "commentSection${i}">
                                <br>
                                    <textarea class="form-control" placeholder="Give us your oppinion on this matter" id="commentTxt${i}" rows="3" id = "commentTxt${i}" style = "background-color: #fbfbfa"></textarea>
                      
                                    <button class="btn btn-danger" style= "background-color:#f6963c"onclick="addComments(${news[i].id}, ${i})">Comment</button>
                                </div>
                            </div>    
                            <div id = "commentSection"></div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            `;
           
            newsSection.appendChild(myCard);
            
            loadComments(news[i].id);
        }
    });
}
const loadComments = (id) => {                            
    fetch('http://localhost:3000/comments', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((comments) => {
        
        for (let i = 0; i < comments.length; i++) {
            
            if(comments[i].news_id == id)
            {
                var commentSection = document.getElementById("commentSection"+(id-1));
                var myCard2 = document.createElement("div");
                myCard2.innerHTML =
                    `
                    <div class="card p-3 mt-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="user d-flex flex-row align-items-center"> <img src="https://i.imgur.com/ZSkeqnd.jpg" width="30" class="user-img rounded-circle mr-2">
                    <small class="font-weight-bold text-primary" style = "font-size: 120%">@${comments[i].user_id}:</small> <small class="font-weight-bold " style = "font-size: 100%">
                    ${comments[i].comment} </small></span> </div> <small>${comments[i].date}</small>
                </div>
                <div class="action d-flex justify-content-between mt-2 align-items-center">
                    <div class="reply px-4"> <small>Remove</small> <span class="dots"></span> <small>Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                    <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                </div>
            </div>
                `;
                commentSection.appendChild(myCard2);
            }
            
        }
    
    });
}

const addComments = (news_id, inputfieldId) => {   
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

    let comment = {
        
        "id": null,
        "user_id": 2,
        "news_id": news_id,
        "comment": document.getElementById("commentTxt"+inputfieldId).value,
        "date": today
    }
    fetch('http://localhost:3000/comments/', {
        method: 'POST',
        body: JSON.stringify(comment),
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