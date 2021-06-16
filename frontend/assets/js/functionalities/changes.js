function writeChanges(data) {

    container = document.getElementById("containerChanges");

    for (var i = 0; i < data.length; i++) {

        let row = document.createElement("div");
        row.setAttribute("class", "row");

        for (var j = 0; j < 2; j++) {

            if (i + j < data.length) i = i + j;
            else break;

            let card = makeCard(data[i]);

            row.appendChild(card);
        }

        container.appendChild(row);
    }
}

function makeCard(data) {

    //Column, contains the card div
    let col6 = document.createElement("div");
    col6.setAttribute("class", "col-md-6 text-center");

    //The card div (Contains link and cardBody)
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    //The link to the object which was changed (Contains cardHeader for the text)
    let link = document.createElement("a");
    link.setAttribute("href", data.site);

    //Text for the link
    //let cardHeader = document.createElement("div");
    //cardHeader.setAttribute("class", "card-header mt-2");
    //cardHeader.innerHTML = data.name;

    //link.appendChild(cardHeader);

    //Card body (Holding: title, more, time0)
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    //Card title
    let title = document.createElement("h4");
    title.setAttribute("class", "card-title");
    title.innerHTML = data.changeTitle;


    //More text about the change
    let more = document.createElement("p");
    more.setAttribute("class", "card-text");
    more.innerHTML = data.more;

    //Time container (Contains the content of the time posted)
    let time0 = document.createElement("p");
    time0.setAttribute("class", "card-text");

    //Time content
    let time1 = document.createElement("small");
    time1.setAttribute("class", "text-muted");
    time1.innerHTML = fixDate(data.time);

    time0.appendChild(time1);

    cardBody.appendChild(title);
    cardBody.appendChild(more);
    cardBody.appendChild(time0);

    card.appendChild(link);
    card.appendChild(cardBody);

    col6.appendChild(card);

    return col6;
}

function startPage() {

    startLogin();

    fetch('http://localhost:3000/changes/', {
        method: 'GET'
    }
    ).then((response) => {
        return response.json();
    })
        .then((data) => {
            writeChanges(data);
        })
}