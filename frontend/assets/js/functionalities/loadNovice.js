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
                            <button class="btn btn-outline-danger" onclick="getSelected(${news[i].id},'${news[i].title}','${news[i].text}', ,'${news[i].date}')">Read more</button>
                        </div>
                        <img class="card-img-bottom" src="../assets/img/${news[i].Cover}" alt="Card image cap">
                    </div>
                </div>
            </div>
            `;
            newsSection.appendChild(myCard);
            console.log(news[i].Cover);
        }
    });
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