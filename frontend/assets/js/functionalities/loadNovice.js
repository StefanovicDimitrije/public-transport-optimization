function loadAll() {

    startLogin();

    //generates product table
    fetch('http://localhost:3000/news', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((news) => {
        let newsSection = document.getElementById("container");
        newsSection.innerHTML = "";

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
                            <p class="card-text"><small class="text-muted">Posted: ${fixDate(news[i].date)}</small></p>
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

function loadComments(id) {
    fetch('http://localhost:3000/comments', {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((reply) => {
        for (let i = 0; i < reply.length; i++) {
            fetch('http://localhost:3000/comments/getUser/' + reply[i].user_id, {
                method: 'GET'
            }).then((myReply) => {
                return myReply.json();
            }).then((comments2) => {
                if (reply[i].news_id == id) {
                    var commentSection = document.getElementById("commentSection" + (id - 1));
                    var myCard2 = document.createElement("div");
                    myCard2.innerHTML =
                        `
                        <div class="card p-3 mt-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user d-flex flex-row align-items-center"> <img src="data:image/jpg;base64,${comments2.pfp}" width="30" class="user-img rounded-circle mr-2">
                        <small class="font-weight-bold text-primary" style = "font-size: 120%">${comments2.username}:</small> <small class="font-weight-bold " style = "font-size: 100%">
                        ${reply[i].comment} </small></span> </div> <small>${fixDate(reply[i].date)}</small>
                    </div>
                    <div class="action d-flex justify-content-between mt-2 align-items-center">
                        <div class="reply px-4"> <small id = "removeBtn${reply[i].id}" onclick = "removeComment(${reply[i].id})">Remove</small> <span class="dots"></span> <small id = "replyBtn${reply[i].id}">Reply</small> <span class="dots"></span> <small>Translate</small> </div>
                        <div class="icons align-items-center"> <i class="fa fa-check-circle-o check-icon text-primary"></i> </div>
                    </div>
                </div>
                    `;
                    commentSection.appendChild(myCard2);
                }
                adminBtns();
            });


        }

    });
}

const addComments = (news_id, inputfieldId) => {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;

    let comment = {

        "id": null,
        "user_id": JSON.parse(sessionStorage.getItem('user')).id,
        "news_id": news_id,
        "comment": document.getElementById("commentTxt" + inputfieldId).value,
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
        loadAll();
    })
}
const removeComment = (index) => {
    fetch('http://localhost:3000/comments/' + index, {
        method: 'DELETE'
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {
        if (responseJSON.status === "deleted") {

            loadAll();
        }
    })
}