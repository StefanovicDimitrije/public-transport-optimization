const printInfo2 = () =>{
    let description = JSON.parse(localStorage.getItem("lineEdit"))
    console.log(description)
    console.log('')
   fetch('http://localhost:3000/lineEdit/',{
       method: 'POST',
       body: JSON.stringify(description),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((descriptionLine) =>{
      
       return descriptionLine.json()
   }).then((descriptionLineJSON) =>{
    console.log(descriptionLineJSON)
    lineName = descriptionLineJSON.lines[0]
    let proba = document.getElementById("idLinijaPostaja");
    proba.innerHTML = `<span  class="btn btn-primary btn-round" '>  ${lineName.name}  </span > `
  
    let selectStation = document.getElementById("selectStation")
   stationS = descriptionLineJSON.station
    for(let i = 0;i<stationS.length; i++){
        const option = new Option(stationS[i].name);
        option.value = stationS[i].id;
        console.log(option)
        //selectStation.add(option,stationS[i].id)
        station = document.createElement("option");
        station.innerHTML = `<option value="${stationS[i].id}">`+stationS[i].name +`</option>`        
        selectStation.appendChild(station); 
        
        option.focus();
    }
   
    let selectDriver = document.getElementById("selectDriverBus")
    for(let i = 0;i<descriptionLineJSON.driver.length; i++){
        const option = new Option(descriptionLineJSON.driver[i].name);
        option.value = descriptionLineJSON.driver[i].id;
        driver = document.createElement("option");
        driver.innerHTML = `<option value="${descriptionLineJSON.driver[i].id}">`+descriptionLineJSON.driver[i].name +`</option>`        
        selectDriver.appendChild(driver);
        console.log(option)
        option.focus();
    }
})
}

const edit=()=>{
    let description = JSON.parse(localStorage.getItem("lineEdit"))
    
    event.preventDefault();

    let edited = {
        id : description.id,
        tk_id_line: description.tk_id_line,
        tk_id_station : document.forms[0].selectStation.value,
        time: document.forms[0].selectTime.value,
        day:document.forms[0].selectDay.value,
        tk_id_bus_driver:1,
        order: document.forms[0].selectOrder.value
       
        
      
       // tk_id_bus_driver: document.forms[0].select.value,
       //time : document.forms[0].select.value
    }
    console.log(edited.tk_id_station,edited.time)
    fetch('http://localhost:3000/lineEdit/',{
        method: 'PUT',
        body: JSON.stringify(edited),
        Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((descriptionLine) =>{
        return descriptionLine.json()
    }).then((descriptionLineJSON) =>{
        if(descriptionLineJSON.status == "ok")
        alert("radi")
      
    })
}