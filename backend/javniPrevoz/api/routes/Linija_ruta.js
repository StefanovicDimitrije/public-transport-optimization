var express = require('express');
//let linijaPostaja = require('../../data/Linija-Postaja');
//let Linija= require('../../data/Linije');
//let Postaja = require('../../data/Postaje');
var router = express.Router();
const knexfile = require('../../knexfile').development;
const knex = require('knex')(knexfile);
const bookshelf = require('bookshelf')(knex);

const  line_station = bookshelf.Model.extend({
    tableName: 'Lines_Stations',
    idAttribute:'id'
})
const  line = bookshelf.Model.extend({
    tableName: 'Lines',
    idAttribute:'id'
})
const  station = bookshelf.Model.extend({
    tableName: 'Stations',
    idAttribute:'id'
})
const driverB1 = bookshelf.Model.extend({
    tableName: 'Driver',
    idAttribute: 'id'
})
const driverBusB1 = bookshelf.Model.extend({
    tableName: 'Driver_Bus',
    idAttribute: 'id'
})
router.get('/', async(req,res)=>{
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});
router.post('/', async(req,res)=>{

    let linija_postaja =  req.body;
    
    linija = linija_postaja.Linija1;
  
    postaja = linija_postaja.Postaja1;
 
    

    const driverBusB = await new driverBusB1().fetchAll();
    const driverB = await new driverB1().fetchAll();
    driverBus = driverBusB.toJSON();
    driver = driverB.toJSON();
    const LS = await new line_station().fetchAll();
    const lines = await new line().fetchAll();
    const stations = await new station().fetchAll();
    LS_JOSN = LS.toJSON();
    linijaJSON = lines.toJSON();    
    postajaJSON = stations.toJSON();

    JSON.stringify(linijaJSON);
    JSON.stringify(postajaJSON);
    JSON.stringify(driver);
    JSON.stringify(driverBus);
  

    let objJSON = [];
    let objJSON1 = [];

    if(linija !== "" && postaja !== ""){
        for(const lp of LS_JOSN){
            for(const LinijaNaziv of linijaJSON){
            if(linija == LinijaNaziv.Naziv){
                    let linijaId = LinijaNaziv.id;
                    let linijaNaziv = LinijaNaziv.Naziv;
                    if(lp.tk_id_line == linijaId){
                        for(const PostajaNaziv of postajaJSON){
                            if(postaja == PostajaNaziv.Naziv){
                                let postajaID = PostajaNaziv.id;
                                for (const driverBus1 of driverBus){
                                    if(driverBus1.id == lp.tk_id_bus_driver){
                                        for(const driverNaziv of driver){
                                            if(driverNaziv.id == driverBus1.tk_id_Driver){
                                                if(lp.tk_id_station == postajaID ){
                                                    objJSON1.push(lp,PostajaNaziv,LinijaNaziv,driverNaziv)
                                                    objJSON.push(objJSON1)
                                                   // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                                }else{
                                                  //  return res.json({status:"Ne obstaja"})
                                                }
                                            }
                                            
                                        }
                                        
                                    }
                                    
                                }
                                
                               
                            }
                               // return res.json({status:"Ne obstaja"})
                            
                        }
                    }else{
                        //return res.json({status:"Ne obstaja"})
                    }
                }
           
                //return res.json({status:"Ne obstaja"})
            
        }
        }
        return res.json({status:"obstajata",obj:objJSON})
    }
    else if(linija !== "" && postaja ==="" ){
        let lpObj = []; 
        let lpObj1 = [];
        let linijaNaziv ;
        
        for(const lp of LS_JOSN){
            for(const LinijaNaziv of linijaJSON){
                if(linija == LinijaNaziv.Naziv){
                    let linijaId = LinijaNaziv.id;
                     linijaNaziv = LinijaNaziv.Naziv;
                    if(lp.tk_id_line == linijaId){
                        for(const PostajaNaziv of postajaJSON){
                            if(lp.tk_id_station == PostajaNaziv.id){
                                console.log(PostajaNaziv)
                                for (const driverBus1 of driverBus){ 
                                    if(driverBus1.id == lp.tk_id_bus_driver){
                                        for(const driverNaziv of driver){
                                           
                                            if(driverNaziv.id == driverBus1.tk_id_Driver){
                                                    lpObj1.push(lp,PostajaNaziv,LinijaNaziv,driverNaziv);
                                                    lpObj.push(lpObj1);
                                                   // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                                }else{
                                                  //  return res.json({status:"Ne obstaja"})
                                                }
                                                
                                            }
                                            
                                        }
                                       
                                        
                                    }
                                    
                                }
                                break;
                               
                            }
                               // return res.json({status:"Ne obstaja"})
                            
                        
                    }else{
                        //return res.json({status:"Ne obstaja"})
                    }
                    
                    }
                }
            }
         
            return res.json({status:"linija",lp:lpObj});

    }else if (linija === "" &&  postaja !== ""){
        let lpObj = [];
        let lpObj1= [];
       /* for(const lp of LS_JOSN){
            for(const PostajaNaziv of postajaJSON){
                            if(postaja == PostajaNaziv.Naziv){
                                postajaNaziv =  PostajaNaziv.Naziv;
                                let postajaID = PostajaNaziv.id;
                                if(lp.Postaja == postajaID ){
                                   
                                    lpObj.push(lp);
                                }  
                            }
                        }
                    }
                    return res.json({status:"postaja",Linija_in_Postaja: lpObj,PostajaNaziv:postajaNaziv});*/
                    for(const lp of LS_JOSN){
                        for(const postajaNaziv of postajaJSON){
                            if(postaja == postajaNaziv.Naziv){
                                let postajaId = postajaNaziv.id;
                                 PostajaNaziv = postajaNaziv.Naziv;
                                if(lp.tk_id_station == postajaId){
                                    for(const LinijaNaziv of linijaJSON){
                                        if(lp.tk_id_line == LinijaNaziv.id){
                                            console.log(PostajaNaziv)
                                            for (const driverBus1 of driverBus){ 
                                                if(driverBus1.id == lp.tk_id_bus_driver){
                                                    for(const driverNaziv of driver){
                                                       
                                                        if(driverNaziv.id == driverBus1.tk_id_Driver){
                                                                lpObj1.push(lp,postajaNaziv,LinijaNaziv,driverNaziv);
                                                                lpObj.push(lpObj1);
                                                               // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                                            }else{
                                                              //  return res.json({status:"Ne obstaja"})
                                                            }
                                                            
                                                        }
                                                        
                                                    }
                                                   
                                                    
                                                }
                                                
                                            }
                                            break;
                                           
                                        }
                                           // return res.json({status:"Ne obstaja"})
                                        
                                    
                                }else{
                                    //return res.json({status:"Ne obstaja"})
                                }
                                
                                }
                            }
                        }
                     
                        return res.json({status:"postaja",lp:lpObj});
    }
     res.json({status:"nedefinirano"});
})


module.exports = router;
