const PridobiLinije = () => {
    event.preventDefault();
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

        for (let i = 0; i < linije.ln.length; i++) {
            let vrsta = tabela.insertRow();
            let celija = vrsta.insertCell(-1);
            celija.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(` + JSON.stringify(linije.ln[i]) + `) '>` + linije.ln[i].name + `</button> `
            //console.log(JSON.stringify(linije.ln[i]) )
            let add = vrsta.insertCell(-1);
            add.innerHTML = `<button class="btn btn-primary btn-icon btn-round fav" id="fav${linije.ln[i].id}" onclick='addFavourites(` + JSON.stringify(linije.ln[i].id) + `)'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
        }
        const div = document.querySelector("div.line select")
       
        
        for (let i = 0; i < linije.ln.length; i++) {
            const option = new Option(linije.ln[i].name);
            option.value = linije.ln[i].id;
            div.add(option, linije.ln[i].id)
           

            option.focus();

        }
        const st = document.querySelector("div.station select")
        //const op = new Option("--")
        
        for (let i = 0; i < linije.st.length; i++) {
            const option = new Option(linije.st[i].name);
            option.value = linije.st[i].id;
            st.add(option, linije.st[i].id)
        
            option.focus();

        }
        
        /*
        const div2 = document.querySelector("select")

        for(let i = 0;i<linije.length; i++){
            const option = new Option(linije[i].name);
            option.value = linije[i].id;
            div2.add(option,linije[i].id) 
            console.log(option)
            
            option.focus();
            
        }*/

    }).then(()=>loadFavourites());
  
}


/*
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
*/

const PretraziLinije = () => {

    event.preventDefault();
    let iskanje = {
        Linija1: document.forms[0].selectLine.value,
        Postaja1: document.forms[0].selectStation.value,
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
        //console.log(odgovorJSON)
        if (odgovorJSON.status === "linija") {
            document.forms[0].reset();
            let tabela = document.getElementById("tabelaLinije");
            tabela.innerHTML = `
        <thead >
        <tr >
        <th >Line</th>
        
        <th> ADD</th>
    </tr>
               </thead>`;
            

            /* for (let i = 0; i < linija.length; i++) {
                 let vrsta = tabela.insertRow();
                 for (const opis in linija[i]) {
                     let celija = vrsta.insertCell();
                     celija.innerHTML = linija[i][opis];
                     console.log(linija[i])
                 }
             }*/
            // lineDescription( JSON.stringify( odgovorJSON.linija ) )
           
                    let vrsta = tabela.insertRow(-1);
                    let naz = vrsta.insertCell(-1);
                    naz.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(` + JSON.stringify( odgovorJSON.linija ) + `) '>` + odgovorJSON.linija.name + `</button> `
                   //console.log(odgovorJSON.linija)
                    
                    let add = vrsta.insertCell();
                    add.innerHTML = `<button onclick='addFavourites(` + JSON.stringify(odgovorJSON.linija.id) + `)' id="fav${JSON.stringify(odgovorJSON.linija.id)}" class="btn btn-primary btn-icon btn-round fav"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                 
            

        } else if (odgovorJSON.status === "obstajata") {
            
            if(odgovorJSON.obj[0] === undefined){
                alert("No matches")
            }else{ 
                let prvi = odgovorJSON.obj[1]
                //console.log(prvi[0].tk_id_line)
                lineDesBig(prvi[0].tk_id_line)
            }
            
           

        } else {
            if (odgovorJSON.status === "postaja") {
                let tabela = document.getElementById("tabelaLinije");
                document.forms[0].reset();
                tabela.innerHTML = `
            <thead >
            <tr >
        <th> Line nuber</th>
        <th >Station name</th>
        
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
              //  linija = odgovorJSON.lp

                /* for (let i = 0; i < linija.length; i++) {
                    let vrsta = tabela.insertRow();
                    for (const opis in linija[i]) {
                        let celija = vrsta.insertCell();
                        celija.innerHTML = linija[i][opis];
                        console.log(linija[i])
                    }
                }*/
                //console.log(odgovorJSON)
                for (let i = 0; i < odgovorJSON.postaja.length; i++) {
                    let obj = {
                        id: odgovorJSON.postaja[i].id,
                        name: odgovorJSON.postaja[i].line
                    }
                        let vrsta = tabela.insertRow(-1);
                        let naz = vrsta.insertCell(-1);
                        naz.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(`+ JSON.stringify(obj) +`)') >` + odgovorJSON.postaja[i].line + `</button> `;
                        
                        let pos = vrsta.insertCell(-1);
                        pos.innerHTML = `<button class="btn btn-primary btn-round">` + odgovorJSON.postaja[i].station + `</button> `;
                }
                     /*   let add = vrsta.insertCell();
                        add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(l[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
*/
               

            } else {
                alert("No matches")

            }
        }
    }).then(()=>{loadSpecificFavourites(iskanje.Linija1)});
}




const addFavourites = (id) => {
    if (document.getElementById("fav" + id).innerHTML === `<i class="now-ui-icons ui-2_favourite-28"></i>`) {
        let favourite = { ///create object with selected values
            id: null,
            tk_id_lines: id,
            tk_id_users: JSON.parse(sessionStorage.getItem('user')).id
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

            } else { //unsuccessfull output
                //console.log('error');
            };
        })
    } else {
        let user = JSON.parse(sessionStorage.getItem('user')).id;
        let mybody = {
            tk_id_lines: id,
            tk_id_users: user
        };
        fetch('http://localhost:3000/favourites/' + id + '/' + user, {
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

            } else { //unsuccessfull output
                //console.log('error');
            };
        })
    }
}

const lineDesBig = (line) => {

    fetch('http://localhost:3000/description/' + line, {
        method: 'GET',

    }).then((res) => {

        return res.json();
    }).then((resJSOn) => {

        localStorage.setItem('desBig', JSON.stringify(resJSOn));
        window.location.href = "linesDescriptionBig.html"

    })
}

function loadFavourites() {

    if (JSON.parse(sessionStorage.getItem('user')) == null)
    {
        return;
    } else {
        let user = JSON.parse(sessionStorage.getItem('user')).id;

    fetch('http://localhost:3000/favourites/' + user, {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((favourites) => {
        for (let i = 0; i < favourites.length; i++) {
            document.getElementById("fav" + favourites[i].tk_id_lines).innerHTML = `<i class="material-icons style="background-color:white">favorite</i>`
        }
    });
    }
}

const lineDescription2 = (lineDes) => {
    let line = {
        id: lineDes.id,
        name: lineDes.name
    }


    //console.log(line)
    fetch('http://localhost:3000/description/', {
        method: 'POST',
        body: JSON.stringify(line),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {
        //console.log(descriptionLine)
        return descriptionLine.json()
    }).then((descriptionLineJSON) => {
        localStorage.setItem("line", JSON.stringify(line))
        window.location.href = "linesDescription.html"
    })
}
const lineDescription = (lineDes) => {
    //console.log(lineDes)
    let line = {
        id: lineDes.id,
        name: lineDes.name
    }


    //console.log(line)
    fetch('http://localhost:3000/description/', {
        method: 'POST',
        body: JSON.stringify(line),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {
        //console.log(descriptionLine)
        return descriptionLine.json()
    }).then((descriptionLineJSON) => {
        localStorage.setItem("line", JSON.stringify(line))
        window.location.href = "linesDescription.html"
    })
}

function loadSpecificFavourites(id) {
    if (JSON.parse(sessionStorage.getItem('user')) == null)
    {
        return
    } else {
        let user = JSON.parse(sessionStorage.getItem('user')).id;
    fetch('http://localhost:3000/favourites/' + user + '/' + id, {
        method: 'GET'
    }).then((favouriteReply) => {
        return favouriteReply.json();
    }).then((favouriteReplyJSON) => {
        if (favouriteReplyJSON.status === "found")
        {
        document.getElementById("fav" + favouriteReplyJSON.favourites.tk_id_lines).innerHTML = `<i class="material-icons style="background-color:white">favorite</i>`;
        } else if (favouriteReplyJSON.status === "not found") {
        } else  if (favouriteReplyJSON.status === "error") {
        } else {
            //console.log('nekaj nevem');
        }
    });
    }
}

function viewFavourites(){

    let user = JSON.parse(sessionStorage.getItem('user')).id;
    fetch('http://localhost:3000/favourites/' + user, {
        method: 'GET'
    }).then((myReply) => {
        return myReply.json();
    }).then((favourites) => {
        
        fetch('http://localhost:3000/lines/', {
        method: "GET"
            }).then((odgovor) => {
                return odgovor.json();
            }).then((linije0) => {
                return linije0.ln;
            }).then((linije)=> {

                let tabela = document.getElementById("tabelaLinije");
                tabela.innerHTML = `
                    <thead class="thead-orange">
                        <th >Line</th>
                        <th >Add</th>
                    </tr>
                    </thead>`;
                //console.log(linije)
                for (let i = 0; i < favourites.length; i++) {

                    let j = linije.findIndex(x => x.id === favourites[i].tk_id_lines);

                    let vrsta = tabela.insertRow();
                    let celija = vrsta.insertCell(-1);
                    celija.innerHTML = `<button class="btn btn-primary btn-round" onclick='lineDescription(` + JSON.stringify(linije[j]) + `) '>` + linije[j].name + `</button> `;
                    
                    let add = vrsta.insertCell();
                    add.innerHTML = `<button class="btn btn-primary btn-icon btn-round fav" id="fav${linije[j].id}" onclick='addFavourites(` + JSON.stringify(linije[j].id) + `)'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                
                }

            }).then(()=>loadFavourites());

    });

}
