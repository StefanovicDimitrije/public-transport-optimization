/*const printInfo2 = () =>{
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
      
        selectStation.add(option,stationS[i].id)
        option.focus();
    }
    
    const stationEdit = document.querySelector("div.station select")
    for(let i = 0;i<stationS.length; i++){
        const option = new Option(stationS[i].name);
        option.value = stationS[i].id;
      
        stationEdit.add(option,stationS[i].id)
        option.focus();
    }
    let busdriversObject=[]
  
    for(let i =0; i<descriptionLineJSON.busDriverAll.length; i++){
        for(const busNumber of descriptionLineJSON.bus ){
        for(const driverName of descriptionLineJSON.driver){
                if(busNumber.id == descriptionLineJSON.busDriverAll[i].tk_id_bus){
                    if(driverName.id == descriptionLineJSON.busDriverAll[i].tk_id_driver){
                let obj= {
                    id: descriptionLineJSON.busDriverAll[i].id,
                    busName: busNumber.serialNo,
                    DriverName:driverName.name ,
                    tk_id_bus: busNumber.id,
                    tk_id_driver: driverName.id,
                }
                busdriversObject.push(obj)
            }

            }
            }
        }
    }
    console.log(busdriversObject)
    const bsd = document.querySelector("div.busD select")
    for(let i = 0;i<busdriversObject.length; i++){
      
        const option = new Option(busdriversObject[i].DriverName +"-"+ busdriversObject[i].busName);
        option.value = busdriversObject[i].id;
        console.log(option)
        bsd.add(option,busdriversObject[i].id)
        option.focus();
      
    }

    lineE = descriptionLineJSON.allLines 
    console.log(lineE)
    const lineEdit = document.querySelector("div.line select")
    for(let i = 0;i<lineE.length; i++){
        const option = new Option(lineE[i].name);
        option.value = lineE[i].id;
        
        lineEdit.add(option,lineE[i].id)
        option.focus();
    }


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
    
})


}*/
const editLineName = ()=>{
    
    event.preventDefault();
    let userId = sessionStorage.getItem('user')
    let lineEdit = {
        id: parseInt(document.forms['line'].selectLineEdit.value),
        name: document.forms['line'].line.value
    }
    console.log(lineEdit)
    fetch('http://localhost:3000/lineEdit/line/'+lineEdit.id,{
       method: 'PUT',
       body: JSON.stringify(lineEdit),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((editLineed) =>{
      
       return editLineed.json()
   }).then((editLineedJson) =>{
       if(editLineedJson.status =='ok'){
           alert('Success')
       }else{
           alert(editLineedJson.status)
       }  
   })

   let change = {
       
   }

   fetch('http://localhost:3000/changesDB/line/',{
       method: 'POST',
       body: JSON.stringify(),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((change) =>{
      
       return change.json()
   }).then((changeJSON) =>{
       if(changeJSON.status =='ok'){
           console.log('working')
       }else{
        console.log('error')
       }  
   })

}
const editStationName = ()=>{
    event.preventDefault();
    event.preventDefault();
    let stationEdit = {
        id: parseInt(document.forms['station'].selectStationEdit.value),
        name: document.forms['station'].station.value
    }
    console.log(stationEdit)
    fetch('http://localhost:3000/lineEdit/station/'+stationEdit.id,{
       method: 'PUT',
       body: JSON.stringify(stationEdit),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((editLineed) =>{
      
       return editLineed.json()
   }).then((editLineedJson) =>{
       if(editLineedJson.status =='ok'){
           alert('Success')
       }else{
           alert(editLineedJson.status)
       }  
   })



   fetch('http://localhost:3000/changesDB/station/',{
       method: 'POST',
       body: JSON.stringify(),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((change) =>{
      
       return change.json()
   }).then((changeJSON) =>{
       if(changeJSON.status =='ok'){
           console.log('working')
       }else{
        console.log('error')
       }  
   })



}

const edit=()=>{
    let description = JSON.parse(localStorage.getItem("lineEdit"))
    let userId = sessionStorage.getItem('user')
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



    fetch('http://localhost:3000/changesDB/lineStation/',{
       method: 'POST',
       body: JSON.stringify(),
       Headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
       }
   }).then((change) =>{
      
       return change.json()
   }).then((changeJSON) =>{
       if(changeJSON.status =='ok'){
           console.log('working')
       }else{
        console.log('error')
       }  
   })

}


const lineEidtName = () =>{
    fetch('http://localhost:3000/lineEdit/lineAndStation',{
        method: 'get',
        
    }).then((response) =>{
        console.log(response)
        return response.json()
    }).then((responeJSON)=>{
        console.log(responeJSON)
    const lineEdit = document.querySelector("div.line select")
    for(let i = 0;i<responeJSON.lines.length; i++){
        const option = new Option(responeJSON.lines[i].name);
        option.value = responeJSON.lines[i].id;
        
        lineEdit.add(option,responeJSON.lines[i].id)
        option.focus();
    }

    const stationEdit = document.querySelector("div.station select")
    for(let i = 0;i<responeJSON.station.length; i++){
        const option = new Option(responeJSON.station[i].name);
        option.value = responeJSON.station[i].id;
      
        stationEdit.add(option,responeJSON.station[i].id)
        option.focus();
    }
    })

    
}