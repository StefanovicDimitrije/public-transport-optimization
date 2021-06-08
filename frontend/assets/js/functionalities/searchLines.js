const PridobiLinije = () => {
    fetch('http://localhost:3000/lines/', {
        method: "GET"
    }).then((odgovor) => {
        return odgovor.json();
    }).then((linije) => {
        let tabela = document.getElementById("tabelaLinije");
        tabela.innerHTML = `
       <thead class="thead-orange">
       <th >Line</th>
       <th >Add</th>
   </tr>
              </thead>`;
        console.log(linije)
        for (let i = 0; i < linije.length; i++) {
            let vrsta = tabela.insertRow();
            let celija = vrsta.insertCell(-1);
            celija.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(` + JSON.stringify(linije[i]) + `) '>` + linije[i].name + `</button> `;
            console.log(linije[i])
            let add = vrsta.insertCell();
            add.innerHTML = `<button class="btn btn-primary btn-icon btn-round fav" id="fav${linije[i].id}" onclick='addFavourites(` + JSON.stringify(linije[i].id) + `)'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
        }

    });
}

const PridobiStanice = () => {
    fetch('http://localhost:3000/stations/', {
        method: "GET"
    }).then((odgovor) => {
        return odgovor.json();
    }).then((linije) => {
        let tabela = document.getElementById("tabelaLinije");
        tabela.innerHTML = `
       <thead class="thead-orange">
       <th >Station</th>
       <th >Add</th>
   </tr>
              </thead>`;
        console.log(linije)
        for (let i = 0; i < linije.length; i++) {
            let vrsta = tabela.insertRow();
            let celija = vrsta.insertCell(-1);
            celija.innerHTML = `<button class="btn btn-primary btn-round">` + linije[i].name + `</button> `;

            let add = vrsta.insertCell();
            add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(linije[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
            console.log(linije[i])
        }

    });
}


const PretraziLinije = () => {

    event.preventDefault();
    let iskanje = {
        Linija1: document.forms[0].Linija.value,
        Postaja1: document.forms[0].Postaja.value,
    }

    fetch('http://localhost:3000/linije/', {
        method: 'POST',
        body: JSON.stringify(iskanje),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }).then((odgovor) => {

        return odgovor.json();
    }).then((odgovorJSON) => {
        console.log(odgovorJSON);
        if (odgovorJSON.status === "linija") {
            document.forms[0].reset();
            let tabela = document.getElementById("tabelaLinije");
            tabela.innerHTML = `
        <thead >
        <tr >
        <th >Line</th>
        <th >Station</th>
        <th >Time</th> 
        <th> Day</th>
        <th> Driver</th>
    </tr>
               </thead>`;
            linija = odgovorJSON.lp
            console.log(linija)
            /* for (let i = 0; i < linija.length; i++) {
                 let vrsta = tabela.insertRow();
                 for (const opis in linija[i]) {
                     let celija = vrsta.insertCell();
                     celija.innerHTML = linija[i][opis];
                     console.log(linija[i])
                 }
             }*/

            for (let i = 0; i < linija.length; i++) {
                for (let j = 0; j < linija[i].length; i++) {
                    l = linija[i];
                    let vrsta = tabela.insertRow(-1);
                    let naz = vrsta.insertCell(-1);
                    naz.innerHTML = `<button class="btn btn-primary btn-round" onclick="lineDescription(` + l[1] + `)">` + l[2].name + `</button> `;

                    let pos = vrsta.insertCell(-1);
                    pos.innerHTML = `<button class="btn btn-primary btn-round">` + l[1].name + `</button> `;

                    let cas = vrsta.insertCell(-1);
                    cas.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].time + `</button> `;
                    let dan = vrsta.insertCell(-1);
                    dan.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].day + `</button> `;

                    let dri = vrsta.insertCell(-1);
                    dri.innerHTML = `<button class="btn btn-primary btn-round">` + l[3].name + " " + l[3].surname + `</button> `;

                    let add = vrsta.insertCell();
                    add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(l[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                    console.log(l[i])
                }
            }

        } else if (odgovorJSON.status === "obstajata") {
            document.forms[0].reset();
            let tabela = document.getElementById("tabelaLinije");
            tabela.innerHTML = `
        <thead >
        <tr >
        <th >Line</th>
        <th >Station</th>
        <th >Time</th> 
        <th> Day</th>
        <th> Driver</th>
    </tr>
               </thead>`;
            linija = odgovorJSON.obj
            /*for (let i = 0; i < linija.length; i++) {
                let vrsta = tabela.insertRow();
                    let celija = vrsta.insertCell();
                    celija.innerHTML = `<button class="btn btn-primary btn-round">` + linija[i].Naziv + `</button> `;
                    console.log(linija[i])
                }*/
            for (let i = 0; i < linija.length; i++) {
                for (let j = 0; j < linija[i].length; i++) {
                    l = linija[i];
                    let vrsta = tabela.insertRow(-1);
                    let naz = vrsta.insertCell(-1);
                    naz.innerHTML = `<button class="btn btn-primary btn-round" onclick="lineDescription(` + l[1] + `)">` + l[2].name + `</button> `;

                    let pos = vrsta.insertCell(-1);
                    pos.innerHTML = `<button class="btn btn-primary btn-round">` + l[1].name + `</button> `;

                    let cas = vrsta.insertCell(-1);
                    cas.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].time + `</button> `;
                    let dan = vrsta.insertCell(-1);
                    dan.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].day + `</button> `;

                    let dri = vrsta.insertCell(-1);
                    dri.innerHTML = `<button class="btn btn-primary btn-round">` + l[3].name + " " + l[3].surname + `</button> `;

                    let add = vrsta.insertCell();
                    add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(l[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                    console.log(l[i])
                }
            }
            /*
                        for (let i = 0; i < linije.length; i++) {
                            let vrsta = tabela.insertRow();
                            let celija = vrsta.insertCell(-1);
                            celija.innerHTML = `<button class="btn btn-primary btn-round">` + linije[i].Naziv + `</button> `;
                
                            let add = vrsta.insertCell();
                            add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(linije[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                            console.log(linije[i])
                        }*/

        } else {
            if (odgovorJSON.status === "postaja") {
                let tabela = document.getElementById("tabelaLinije");
                document.forms[0].reset();
                tabela.innerHTML = `
            <thead >
            <tr >
        <th >Line</th>
        <th >Station</th>
        <th >Time</th> 
        <th> Day</th>
        <th> Driver</th>
    </tr>
                   </thead>`;
                /*let postaja = odgovorJSON.Linija_in_Postaja
                for (let i = 0; i < postaja.length; i++) {
                    let vrsta = tabela.insertRow();
                    for (const opis in postaja[i]) {
                        let celija = vrsta.insertCell();
                        celija.innerHTML = postaja[i][opis];
                        console.log(postaja[i])
                    }
                }
*/
                linija = odgovorJSON.lp
                console.log(linija)
                /* for (let i = 0; i < linija.length; i++) {
                    let vrsta = tabela.insertRow();
                    for (const opis in linija[i]) {
                        let celija = vrsta.insertCell();
                        celija.innerHTML = linija[i][opis];
                        console.log(linija[i])
                    }
                }*/
                for (let i = 0; i < linija.length; i++) {
                    for (let j = 0; j < linija[i].length; i++) {
                        l = linija[i];
                        let vrsta = tabela.insertRow(-1);
                        let naz = vrsta.insertCell(-1);
                        naz.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(` + l[1] + `)'>` + l[2].name + `</button> `;

                        let pos = vrsta.insertCell(-1);
                        pos.innerHTML = `<button class="btn btn-primary btn-round">` + l[1].name + `</button> `;

                        let cas = vrsta.insertCell(-1);
                        cas.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].time + `</button> `;
                        let dan = vrsta.insertCell(-1);
                        dan.innerHTML = `<button class="btn btn-primary btn-round">` + l[0].day + `</button> `;

                        let dri = vrsta.insertCell(-1);
                        dri.innerHTML = `<button class="btn btn-primary btn-round">` + l[3].name + " " + l[3].surname + `</button> `;

                        let add = vrsta.insertCell();
                        add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(l[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                        console.log(l[i])
                    }
                }

            } else {
                alert('Linija ali postaja ne obstaja');

            }
        }
    })
}
const addFavourites = (id) => {
    if (document.getElementById("fav" + id).innerHTML === `<i class="now-ui-icons ui-2_favourite-28"></i>`) {
        let favourite = {                                     ///create object with selected values
            id: null,
            tk_id_lines: id,
            tk_id_users: 2
        }
        fetch('http://localhost:3000/favourites/', {
            method: 'POST',
            body: JSON.stringify(favourite), // !!!!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((favouriteReply) => {
            return favouriteReply.json();
        }).then((favouriteReplyJSON) => {
            if (favouriteReplyJSON.status === "added") {
                document.getElementById("fav" + id).innerHTML = `<i class="material-icons style="background-color:white">favorite</i>`;

            }
            else {                                                      //unsuccessfull output
                console.log('error');
            };
        })
    } else
    {
        let user =2;
        let mybody = {
            tk_id_lines:id,
            tk_id_users:user
        };
        fetch('http://localhost:3000/favourites/'+id + '/' + user, {
            method: 'DELETE',
            body: JSON.stringify(mybody), // !!!!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((favouriteReply) => {
            return favouriteReply.json();
        }).then((favouriteReplyJSON) => {
            if (favouriteReplyJSON.status === "deleted") {
                document.getElementById("fav" + id).innerHTML = `<i class="now-ui-icons ui-2_favourite-28"></i>`;

            }
            else {                                                      //unsuccessfull output
                console.log('error');
            };
        })
    }
}


function loadFavourites(id) {

    fetch('http://localhost:3000/favourites/' + id, {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((favourites) => {
        for (let i = 0; i < favourites.length; i++) {
            document.getElementById("fav" + favourites[i].tk_id_lines).innerHTML = `<i class="material-icons style="background-color:white">favorite</i>`
        }
    });
}


const lineDescription = (lineDes) => {
    let line = {
        id: lineDes.id,
        name: lineDes.name
    }


    console.log(line)
    fetch('http://localhost:3000/description/', {
        method: 'POST',
        body: JSON.stringify(line),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {
        console.log(descriptionLine)
        return descriptionLine.json()
    }).then((descriptionLineJSON) => {
        localStorage.setItem("line", JSON.stringify(line))
        window.location.href = "linesDescription.html"
    })
}