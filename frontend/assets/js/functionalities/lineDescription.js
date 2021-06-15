const printInfo = () => {
    let description = JSON.parse(localStorage.getItem("line"))

    fetch('http://localhost:3000/description/', {
        method: 'POST',
        body: JSON.stringify(description),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {

        return descriptionLine.json()
    }).then((descriptionLineJSON) => {
        localStorage.setItem('lineDes', JSON.stringify(descriptionLineJSON))
        let tabela = document.getElementById("tableLineDes");


        var stations = [];
       


        var br = 1;
        for (let i = 0; i < descriptionLineJSON.lineStation.length; i++) {
            for (let j = 1; j < descriptionLineJSON.lineStation.length; j++) {
                if (descriptionLineJSON.lineStation[i].tk_id_station !== descriptionLineJSON.lineStation[j].tk_id_station) {
                    br++
                } else {
                    break;
                }
            }
            break;
        }
        let head = tabela.insertRow();
        head.innerHTML = `<tr>
        <th>Station</th>`;
        for (let i = 1; i < br; i++) {
            head.innerHTML += `<th>Route ${i}</th>`;
        }
        head.innerHTML += `<th>Order</th>
            </tr>`


        for (let i = 0; i < br; i++) {
            for (const stationName of descriptionLineJSON.station) {
                if (stationName.id == descriptionLineJSON.lineStation[i].tk_id_station) {

                    let vrsta = tabela.insertRow();
                    let stationNames = vrsta.insertCell(-1);

                    stations[i] = stationName.name;
                    stationNames.innerHTML = `<div class = "clickable"><p onclick=(lineDesBig(${descriptionLineJSON.lineStation[i].tk_id_station})) '>` + stationName.name + `</p> </div>`;
              
                    for (let x = 0; x < descriptionLineJSON.lineStation.length; x++) {
                        if (descriptionLineJSON.lineStation[x].tk_id_station == descriptionLineJSON.lineStation[i].tk_id_station) {
                            let time = vrsta.insertCell(-1)
                            time.innerHTML = `<p>` + descriptionLineJSON.lineStation[x].time + `</p> `;
                        }

                    }
                    let order = vrsta.insertCell(-1);
                    order.innerHTML = `<p>` + descriptionLineJSON.lineStation[i].order + `</p> `;
                    


                }


            }


        }

        findBusStops(stations);
    })
}

const lineDesBig = (line) => {

    fetch('http://localhost:3000/description/' + line, {
        method: 'GET',

    }).then((res) => {

        return res.json()
    }).then((resJSOn) => {

        localStorage.setItem('desBig', JSON.stringify(resJSOn));
        window.location.href = "linesDescriptionBig.html"

    })
}

const lineEdit = (lineStation) => {
    let lineStationEdit = {
        id: lineStation.id,
        tk_id_line: lineStation.tk_id_line,
        tk_id_station: lineStation.tk_id_station,
        tk_id_bus_driver: lineStation.tk_id_bus_driver,
        day: lineStation.day,
        order: lineStation.order,
        time: lineStation.time
    }
    
    fetch('http://localhost:3000/lineEdit/', {
        method: 'POST',
        body: JSON.stringify(lineStationEdit),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((lineEdit) => {
     
        return lineEdit.json()
    }).then((lineEditJSON) => {
       
        localStorage.setItem('lineEdit', JSON.stringify(lineStationEdit));
        window.location.href = "lineEdit.html"
    })
}




const PridobiLinije = () => {
    fetch('http://localhost:3000/lines/', {
        method: "GET"
    }).then((odgovor) => {
        return odgovor.json();
    }).then((linije) => {
        /* let tabela = document.getElementById("tableLine");
        tabela.innerHTML = `
       <thead class="thead-orange">
     
   </tr>
              </thead>`;*/
       
        for (let i = 0; i < linije.length; i++) {

            document.getElementById("tableLine").innerHTML += `<div class="text-center"><button class="btn btn-primary btn-round" onclick='lineDescription(` + JSON.stringify(linije[i]) + `) '>` + linije[i].name + `</button> </div>`;

        }

    });
}

const lineDescription = (lineDes) => {
    let line = {
        id: lineDes.id,
        name: lineDes.name
    }


    fetch('http://localhost:3000/description/', {
        method: 'POST',
        body: JSON.stringify(line),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {
   
        return descriptionLine.json()
    }).then((descriptionLineJSON) => {
   
        localStorage.setItem('des', JSON.stringify(descriptionLineJSON));
        window.location.href = "linesDescription.html"
    })
}














const printInfo2 = () => {
    let description = JSON.parse(localStorage.getItem("lineEdit"))

    window.localStorage.clear()

    fetch('http://localhost:3000/lineEdit/', {
        method: 'POST',
        body: JSON.stringify(description),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) => {

        return descriptionLine.json()
    }).then((descriptionLineJSON) => {

        let tabela = document.getElementById("tableLineDes");
        tabela.innerHTML = `
     <thead class="thead-orange">
     <th >Line</th>
     <th >Station</th>
     <th>Day</th>
     <th >Time</th>
     <th >Order</th>
     <th>Driver</th>
     <th >Add</th>
  </tr>
            </thead>`;



        for (let i = 0; i < descriptionLineJSON.lineStation.length; i++) {
            if (descriptionLineJSON.lineStation[i].day == "Work days") {
                for (const line of descriptionLineJSON.lines) {

                    if (line.id == descriptionLineJSON.lineStation[i].tk_id_line) {
                        for (const stationName of descriptionLineJSON.station) {
                            if (stationName.id == descriptionLineJSON.lineStation[i].tk_id_station) {
                                for (const busD of descriptionLineJSON.busDriver) {
                                    if (busD.id == descriptionLineJSON.lineStation[i].tk_id_bus_driver) {
                                        for (const drivers of descriptionLineJSON.driver) {
                                            if (drivers.id == busD.tk_id_driver) {

                                                let vrsta = tabela.insertRow();
                                                let lineName = vrsta.insertCell(-1);
                                                lineName.innerHTML = `<button class="btn btn-primary btn-round" '>` + line.name + `</button> `;
                                                
                                                let stationNames = vrsta.insertCell(-1);
                                                stationNames.innerHTML = `<button class="btn btn-primary btn-round" '>` + stationName.name + `</button> `;
                                                let day = vrsta.insertCell(-1);
                                                day.innerHTML = `<button class="btn btn-primary btn-round" '>` + descriptionLineJSON.lineStation[i].day + `</button> `;
                                                let time = vrsta.insertCell(-1);
                                                time.innerHTML = `<button class="btn btn-primary btn-round" '>` + descriptionLineJSON.lineStation[i].time + `</button> `;
                                                let order = vrsta.insertCell(-1);
                                                order.innerHTML = `<button class="btn btn-primary btn-round" '>` + descriptionLineJSON.lineStation[i].order + `</button> `;
                                                let driverName = vrsta.insertCell(-1);
                                                driverName.innerHTML = `<button class="btn btn-primary btn-round" '>` + drivers.name + `</button> `;
                                                let add = vrsta.insertCell(-1);
                                                add.innerHTML = `<button class="btn btn-primary btn-icon btn-round fav" id="fav${line.id}" onclick='addFavourites(` + JSON.stringify(line.id) + `)'><i class="now-ui-icons ui-2_favourite-28"></i></button>`;
                                                //if admin 

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }

    })



}



const setValue = () => {
    const selectedValue = document.forms[0].select.value
}

const printBigInfo = () => {
    let description = JSON.parse(localStorage.getItem('desBig'))
    let lineStorage = JSON.parse(localStorage.getItem('line'))
    let tabela = document.getElementById("tableLineDesBig");
    var stations = [];
    console.log(lineStorage)
    /*  tabela.innerHTML = `
     `;
     */
    console.log(description.lineStation)
    for (let i = 0; i < description.lineStation.length; i++) {
        //  if(lineStorage.line.id == description.lineStation[i].tk_id_line){
            if(lineStorage.id == description.lineStation[i].tk_id_line){ 
        for (const station of description.station) {
            if (station.id === description.lineStation[i].tk_id_station) {
                for (const driverBus of description.busDriver) {
                    if (driverBus.tk_id_bus == description.lineStation[i].tk_id_bus_driver) {
                        for (const bus of description.bus) {
                            if (bus.id == driverBus.tk_id_bus) {
                                for (const driver of description.driver) {
                                    if (driver.id == driverBus.tk_id_driver) {
                                        stations[0] = station.name
                                            //   if( this.selectedValue === description.lineStation[i].day ) {
                                        let vrsta = tabela.insertRow();
                                        let stationNames = vrsta.insertCell(-1);
                                        stationNames.innerHTML = `<p>` + station.name + `</p> `;
                                        let time = vrsta.insertCell(-1);
                                        time.innerHTML = `<p>` + description.lineStation[i].time + `</p> `;
                                        let driverName = vrsta.insertCell(-1);
                                        driverName.innerHTML = `<p>` + driver.name + `</p> `;
                                        let busNo = vrsta.insertCell(-1);
                                        busNo.innerHTML = `<p>` + bus.serialNo + `</p> `;
                                        let day = vrsta.insertCell(-1);

                                        day.innerHTML = `<p>` + description.lineStation[i].day + `</p> `;
                                        let user = JSON.parse(sessionStorage.getItem('user'))
                                        if(user !== null){
                                        if(user.admin === 1){
                                        let edit = vrsta.insertCell(-1);
                                        edit.innerHTML = `<button class="btn btn-primary btn-link"  onclick='lineEdit(` + JSON.stringify(description.lineStation[i]) + `)' >Edit</button>`;
                                      
                                        }else
                                        continue
                                     }else
                                     continue
                                            //  }
                                    }
                                }
                            }
                            }

                        }
                    }
                }
            }

        }

    }

    findBusStops(stations);
}