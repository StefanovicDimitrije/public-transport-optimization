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
  
    let selectStation = document.querySelector("div.selectDriverBus select")
   stationS = descriptionLineJSON.station
    for(let i = 0;i<stationS.length; i++){
        const option = new Option(stationS[i].name);
        option.value = stationS[i].id;
        console.log(option)
        selectStation.add(option,stationS[i].id)
        option.focus();
    }
    
    const div = document.querySelector("div.selectDriverBus select")
    //const op = new Option("--")
    /*
    for (let i = 0; i <descriptionLineJSON.bus.length; i++) {
        const option = new Option(descriptionLineJSON.bus[i].serialNo);
        option.value = descriptionLineJSON.bus[i].id;
        div.add(option, descriptionLineJSON.bus[i].id)
    
        option.focus();

    }*/
    /*let selectDriver = document.getElementById("selectDriverBus")
    for(let i = 0;i<descriptionLineJSON.driver.length; i++){
        const option = new Option(descriptionLineJSON.driver[i].name);
        option.value = descriptionLineJSON.driver[i].id;
        driver = document.createElement("option");
        driver.innerHTML = `<option value="${descriptionLineJSON.driver[i].id}">`+descriptionLineJSON.driver[i].name +`</option>`        
        selectDriver.appendChild(driver);
        console.log(option)
        option.focus();
    }*/
})

const editLineName = ()=>{}
}
const editStationName = ()=>{}

const edit=()=>{
    let description = JSON.parse(localStorage.getItem("lineEdit"))
    
    event.preventDefault();

    let edited = {
        id : description.id,
        tk_id_line: description.tk_id_line,
        tk_id_station : document.forms[0].selectStation.value,
        time:  document.forms[0].time.value,
        day:document.forms[0].selectDay.value,
        order: document.forms[0].selectOrder.value,
        tk_id_bus_driver: parseInt(document.forms[0].selectDriverBus.value)
       //time : document.forms[0].select.value
    }

    console.log(edited)
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
        alert("Done")
      
    })
}