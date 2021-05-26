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
            celija.innerHTML = `<button class="btn btn-primary btn-round">` + linije[i].Naziv + `</button> `;

            let add = vrsta.insertCell();
            add.innerHTML = `<button onclick='dodajLiniju(` + JSON.stringify(linije[i]) + `)' class="btn btn-primary btn-icon btn-round"'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
            console.log(linije[i])
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
       <th >Postaja</th>
       <th >Dodaj</th>
   </tr>
              </thead>`;
        for (let i = 0; i < linije.length; i++) {
            let vrsta = tabela.insertRow();
            let celija = vrsta.insertCell(-1);
            celija.innerHTML = `<button class="btn btn-primary btn-round">` + linije[i].Naziv + `</button> `;

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
    console.log(iskanje)
    fetch('http://localhost:3000/linije/', {
        method: 'POST',
        body: JSON.stringify(iskanje),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }).then((odgovor) => {
        console.log(odgovor);
        return odgovor.json();
    }).then((odgovorJSON) => {
        console.log(odgovorJSON);
        if (odgovorJSON.status === "linija") {
            document.forms[0].reset();
            let tabela = document.getElementById("tabelaLinije");
            tabela.innerHTML = `
        <thead class="thead-dark">
        <tr >
        <th >Id</th>
        <th >Linija</th>
        <th >Postaja</th>
        <th >Cas</th>
    </tr>
               </thead>`;
            let linija = odgovorJSON.Linija_in_Postaja
            for (let i = 0; i < linija.length; i++) {
                let vrsta = tabela.insertRow();
                for (const opis in linija[i]) {
                    let celija = vrsta.insertCell();
                    celija.innerHTML = linija[i][opis];
                    console.log(linija[i])
                }
            }

        } else if (odgovorJSON.status === "obstajata") {
            document.forms[0].reset();
            let tabela = document.getElementById("tabelaLinije");
            tabela.innerHTML = `
        <thead class="thead-dark">
        <tr >
        <th >Id</th>
        <th >Linija</th>
        <th >Postaja</th>
        <th >Cas</th>
    </tr>
               </thead>`;
            let linija = odgovorJSON.Linija_in_Postaja
            for (let i = 0; i < linija.length; i++) {
                let vrsta = tabela.insertRow();
                for (const opis in linija[i]) {
                    let celija = vrsta.insertCell();
                    celija.innerHTML = linija[i][opis];
                    console.log(linija[i])
                }
            }

        } else {
            if (odgovorJSON.status === "postaja") {
                let tabela = document.getElementById("tabelaLinije");
                document.forms[0].reset();
                tabela.innerHTML = `
            <thead class="thead-dark">
            <tr >
            <th >Id</th>
            <th >Linija</th>
            <th >Postaja</th>
            <th >Cas</th>
        </tr>
                   </thead>`;
                let postaja = odgovorJSON.Linija_in_Postaja
                for (let i = 0; i < postaja.length; i++) {
                    let vrsta = tabela.insertRow();
                    for (const opis in postaja[i]) {
                        let celija = vrsta.insertCell();
                        celija.innerHTML = postaja[i][opis];
                        console.log(postaja[i])
                    }
                }


            } else {
                alert('Linija ali postaja ne obstaja');

            }
        }
    })
}