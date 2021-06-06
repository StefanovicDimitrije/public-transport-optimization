const printInfo = () =>{
     let description = JSON.parse(localStorage.getItem("line"))
  
    fetch('http://localhost:3000/description/',{
        method: 'POST',
        body: JSON.stringify(description),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) =>{
       
        return descriptionLine.json()
    }).then((descriptionLineJSON) =>{
     



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
       
      
    
    console.log(descriptionLineJSON.lineStation) 
       for (let i = 0; i < descriptionLineJSON.lineStation.length; i++) {
        if(descriptionLineJSON.lineStation[i].day =="Work days"){
        for(const line of descriptionLineJSON.lines){ 
            
            if(line.id == descriptionLineJSON.lineStation[i].tk_id_line){ 
        for(const stationName of descriptionLineJSON.station){ 
            if(stationName.id == descriptionLineJSON.lineStation[i].tk_id_station){
                for(const busD of descriptionLineJSON.busDriver){
                if(busD.id == descriptionLineJSON.lineStation[i].tk_id_bus_driver){
                for(const drivers of descriptionLineJSON.driver ){
                if(drivers.id == busD.tk_id_driver ){
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
           let table2 = document.getElementById("tableLineDesWeekend");
           table2.innerHTML = `
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
            
           
         
         console.log(descriptionLineJSON.lineStation) 
            for (let i = 0; i < descriptionLineJSON.lineStation.length; i++) {
             if(descriptionLineJSON.lineStation[i].day =="Weekend"){
             for(const line of descriptionLineJSON.lines){ 
                 
                 if(line.id == descriptionLineJSON.lineStation[i].tk_id_line){ 
             for(const stationName of descriptionLineJSON.station){ 
                 if(stationName.id == descriptionLineJSON.lineStation[i].tk_id_station){
                     for(const busD of descriptionLineJSON.busDriver){
                     if(busD.id == descriptionLineJSON.lineStation[i].tk_id_bus_driver){
                     for(const drivers of descriptionLineJSON.driver ){
                     if(drivers.id == busD.tk_id_driver ){
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
        console.log(linije)
        for (let i = 0; i < linije.length; i++) {
           
            document.getElementById("tableLine").innerHTML += `<div class="text-center"><button class="btn btn-primary btn-round" onclick='lineDescription(`+ JSON.stringify(linije[i]) +`) '>` + linije[i].name + `</button> </div>`;
            
       }

    });
}

const lineDescription = (lineDes) =>{
    let line  = {
        id: lineDes.id,
        name: lineDes.name
    }
    
   
    console.log(line)
    fetch('http://localhost:3000/description/',{
        method: 'POST',
        body: JSON.stringify(line),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) =>{
        console.log(descriptionLine)
        return descriptionLine.json()
    }).then((descriptionLineJSON) =>{
        console.log(descriptionLineJSON)
        localStorage.setItem('des',JSON.stringify(descriptionLineJSON));
       window.location.href="linesDescription.html" 
    })
}