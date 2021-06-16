
function showUserTickets() { //Get Ticket info and info on the user that submitted

    fetch('http://localhost:3000/tickets', {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((tickets) => {
        let cardSection = document.getElementById('mysection');
        if (tickets.status == "empty")
        {
            let myCard2 = document.createElement("div");
                myCard2.innerHTML =
                `
                    <div class="col-7 mr-auto ml-auto text-center">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Currently there are no tickets to be approved  :(</h4>
                                
                            </div>
                        </div>
                    </div>
                `;
            cardSection.appendChild(myCard2);
        } else if (tickets.status == "not empty")
        {
            for (var i = 0; i < tickets.tickets.length; i++) {
                let ticket = tickets.tickets[i];
    
                fetch('http://localhost:3000/account/' + tickets.tickets[i].tk_id_users, {
                    method: 'GET'
                }).then((response) => {
                    return response.json();
                }).then((responseJSON) => {
                    let user = responseJSON.user;
    
                    displayUserTicket(ticket, user);
                })
            }
        }

    })

}

function displayUserTicket(ticket, user) { //Make a card of the ticket submitted
    let myCard = document.createElement("div");
    myCard.innerHTML =
        `<div class="card" style="width: 20rem;">
        <img class="card-img-top" src="data:image/jpg;base64,${ticket.ticket}" alt="Ticket" id>
        <div class="card-body">
            <h4 class="card-title">${user.name} ${user.surname}</h4>
            <a class="btn btn-primary" onclick="approve(${ticket.id},${user.id})">Approve</a>
        </div>
    </div>`;
    myCard.setAttribute('class', 'col-4 ml-auto mr-auto');
    document.getElementById('container').appendChild(myCard);

}

function approve(ticketId, userId) {

    data = {
        ticketId: ticketId,
        userId: userId
    };

    fetch('http://localhost:3000/tickets/approve', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((respond) => {
        return respond.json();
    }).then((respondJSON) => {
        if (respondJSON.status == "approved") {
            document.getElementById("container").innerHTML = '';
            showUserTickets();

        };
    })

}

function uploadTicket() { //Function for the user to upload tickets
    console.log('1');
    let pic = document.getElementById("ticketPhoto").files[0];

    let fd = new FormData();
    fd.append('ticket', pic);
    fd.set('tk_id_users', JSON.parse(sessionStorage.getItem('user')).id);
    fd.set('id', null);

    console.log(pic);
    console.log(JSON.parse(sessionStorage.getItem('user')).id);

    fetch('http://localhost:3000/tickets/userPost', {
        method: 'POST',
        body: fd
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {

        const alert = document.getElementById("alert"); //Getting the div for alerts

        if (responseJSON.status == 'uploaded') {

            alert.setAttribute("class", "alert alert-success"); //Display 'correct!'
            alert.innerHTML = "Ticket submitted successfuly!"

            setTimeout(function () {  //After a half of a second return the user to the index page
                window.location.href = "../pages/index.html"
            }, 500);

        } else {
            alert.setAttribute("class", "alert alert-danger");
            alert.innerHTML = "Server error, please try again!"
            console.log(responseJSON.error);
        }

    });


}

function isExtended() { //What to display to the user when he opens extend ticket (confirmTicket is currently boolean)

    var userId = JSON.parse(sessionStorage.getItem('user')) || {};

    fetch('http://localhost:3000/account/' + userId.id, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((responseJSON) => {

        let confirmTicket = responseJSON.user.confirmTicket;

        if (confirmTicket == 0) {

            document.getElementById('container').innerHTML = `
                <form id="uploadTicketForm" class="form" action="http://localhost:3000/tickets/userPost" method="POST" enctype="multipart/form-data"></form>
        <div class="col-md-8 ml-auto mr-auto">
            <div class="card card-login card-plain">
                <div class="card-body">
                    <p class="category">Please confirm your physical ticket ownership: </p>
                
                    <input type="file" id="ticketPhoto" name="filename"><br/>
                
                    <button class="btn btn-primary btn-lg" onclick="uploadTicket()">Upload</button>
                </form>
                <div class="alert" role="alert" id="alert"></div>
                </div>    
            </div>
        </div>
        `;

        } else {

            document.getElementById('container').innerHTML = `
            <div class="card card-plain">
                    <div class="card-body">
                    <div class="row">
                        <div class="col-10 ml-auto mr-auto">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <div class="row">
                                        <h6 class="text-center">Payment Details</h6>
                                        <img class="img-responsive cc-img rounded" height="100" src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png">
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <form role="form">
                                        <div class="row">
                                            <div class="col-4 ml-auto mr-auto">
                                                <div class="form-group">
                                                    <label>CARD NUMBER</label>
                                                    <div class="input-group">
                                                        <input type="tel" class="form-control" placeholder="Valid Card Number" />
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5 ml-auto mr-auto">
                                                <div class="form-group">
                                                    <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>
                                                    <input type="tel" class="form-control" placeholder="MM / YY" />
                                                </div>
                                            </div>
                                            <div class="col-3 pull-right ml-auto mr-auto">
                                                <div class="form-group">
                                                    <label>CV CODE</label>
                                                    <input type="tel" class="form-control" placeholder="CVC" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ml-auto mr-auto">
                                                <div class="form-group">
                                                    <label>CARD OWNER</label>
                                                    <input type="text" class="form-control" placeholder="Card Owner Names" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="panel-footer">
                                    <div class="row">
                                        <div class="col-12 ml-auto mr-auto">
                                            <button class="btn btn-warning btn-lg btn-block">Process payment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            `;

        }

    })

}