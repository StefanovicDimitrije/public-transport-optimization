var express = require('express');
var router = express.Router();


//DATABASE CONNECTIONS
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'javniprevoz'
    }
});

const bookshelf = require('bookshelf')(knex);

const line_station = bookshelf.Model.extend({
    tableName: 'lines_stations',
    idAttribute: 'id'
})
const line = bookshelf.Model.extend({
    tableName: 'lines',
    idAttribute: 'id'
})
const station = bookshelf.Model.extend({
    tableName: 'stations',
    idAttribute: 'id'
})
const driverB1 = bookshelf.Model.extend({
    tableName: 'drivers',
    idAttribute: 'id'
})
const driverBusB1 = bookshelf.Model.extend({
    tableName: 'drivers_buses',
    idAttribute: 'id'
})
const locations = bookshelf.Model.extend({
    tableName: 'locations',
    idAttribute: 'id'
})

router.get('/', async(req, res) => {
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});
router.post('/', async(req, res) => {

    let linija_postaja = req.body;
   
    linija = linija_postaja.Linija1;

    postaja = linija_postaja.Postaja1;

    

    const driverBusB = await new driverBusB1().fetchAll();
    const driverB = await new driverB1().fetchAll();
    driverBus = driverBusB.toJSON();
    driver = driverB.toJSON();
    const LS = await new line_station().fetchAll();
    const lines = await new line().fetchAll();
    const stations = await new station().fetchAll();
    const location = await new locations().fetchAll();
    LS_JOSN = LS.toJSON();
    linijaJSON = lines.toJSON();
    postajaJSON = stations.toJSON();
    locationJSON = location.toJSON()

    JSON.stringify(linijaJSON);
    JSON.stringify(postajaJSON);
    JSON.stringify(driver);
    JSON.stringify(driverBus);
    JSON.stringify(locationJSON);
    
    let objJSON = [];
    let objJSON1 = [];
   

    if (linija === "0" && postaja !== "0") {
        let lpObj = [];
        let lpObj1 = [];
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
                
                     for(const postajaId of postajaJSON){
                         if(postajaId.id == postaja){
                             for(const location1 of locationJSON){
                           //      console.log(location1)
                                 if(location1.id == postajaId.tk_id_location){
                                    return res.json({ status:"postaja",postaja: postajaId,street:location1 });
                                 }
                             }
                           
                         }
                     }
       /* for (const lp of LS_JOSN) {
            for (const postajaNaziv of postajaJSON) {
                if (postaja == postajaNaziv.id) {
                    let postajaId = postajaNaziv.id;
                    PostajaNaziv = postajaNaziv.name;
                    if (lp.tk_id_station == postajaId) {
                        for (const LinijaNaziv of linijaJSON) {
                            if (lp.tk_id_line == LinijaNaziv.id) {
                                      console.log(PostajaNaziv)
                                for (const driverBus1 of driverBus) {
                                    if (driverBus1.id == lp.tk_id_bus_driver) {
                                        for (const driverNaziv of driver) {

                                            if (driverNaziv.id == driverBus1.tk_id_driver) {
                                                lpObj1.push(lp, postajaNaziv, LinijaNaziv, driverNaziv);
                                                lpObj.push(lpObj1);
                                                // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                            } else {
                                                //  return res.json({status:"Ne obstaja"})
                                            }

                                        }

                                    }


                                }

                            }
                            break;

                        }
                        // return res.json({status:"Ne obstaja"})


                    } else {
                        //return res.json({status:"Ne obstaja"})
                    }

                }
            }
        }*/

       
    }else if (linija !== "0" && postaja === "0") {
        let lpObj = [];
        let lpObj1 = [];
        let linijaNaziv;
        
        for(const linije of linijaJSON){
            if(linije.id == linija){
                return res.json({ status: "linija", linija: linije });
            }
        }
       /* for (const lp of LS_JOSN) {
            //console.log(LS_JOSN)
            for (const LinijaNaziv of linijaJSON) {
                if (linija == LinijaNaziv.id) {
                    //    console.log(LinijaNaziv.name)
                    let linijaId = LinijaNaziv.id;
                    linijaNaziv = LinijaNaziv.name;
                    if (lp.tk_id_line == linijaId) {
                        for (const PostajaNaziv of postajaJSON) {
                            if (lp.tk_id_station == PostajaNaziv.id) {

                                for (const driverBus1 of driverBus) {
                                    if (driverBus1.id == lp.tk_id_bus_driver) {
                                        for (const driverNaziv of driver) {

                                            if (driverNaziv.id == driverBus1.tk_id_driver) {
                                                console.log(lp, PostajaNaziv, LinijaNaziv, driverNaziv)
                                                lpObj1.push(lp, PostajaNaziv, LinijaNaziv, driverNaziv);
                                                lpObj.push(lpObj1);
                                                // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                            } else {
                                                //  return res.json({status:"Ne obstaja"})
                                            }

                                        }

                                    }


                                }

                            }
                            break;

                        }
                        // return res.json({status:"Ne obstaja"})


                    } else {
                        //return res.json({status:"Ne obstaja"})
                    }

                }
            }
        }
     */
        // return res.json({ status: "linija", lp: lpObj });

    } else if (linija !== "0" && postaja !== "0") {
        for (const lp of LS_JOSN) {
            for (const LinijaNaziv of linijaJSON) {
                // console.log(1)
                if (linija == LinijaNaziv.id) {
                    let linijaId = LinijaNaziv.id;
                    let linijaNaziv = LinijaNaziv.name;
                    //console.log(2)
                    if (lp.tk_id_line == linijaId) {
                        //console.log(3)
                        for (const PostajaNaziv of postajaJSON) {
                          //  console.log(4)
                            if (postaja == PostajaNaziv.id) {
                             //   console.log(5)
                                let postajaID = PostajaNaziv.id;
                                for (const driverBus1 of driverBus) {
                                //    console.log(6)
                                    if (driverBus1.id == lp.tk_id_bus_driver) {
                                        console.log(7)
                                        for (const driverNaziv of driver) {
                                            console.log(8)
                                            if (driverNaziv.id == driverBus1.tk_id_driver) {
                                                
                                                if (lp.tk_id_station == postajaID) {
                                                    objJSON1.push(lp, PostajaNaziv, LinijaNaziv, driverNaziv)
                                                    objJSON.push(objJSON1)
                                                        // return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv,DriverNaziv:driverNaziv})
                                                } else {
                                                    //  return res.json({status:"Ne obstaja"})
                                                }
                                            }

                                        }

                                    }

                                }


                            }
                            // return res.json({status:"Ne obstaja"})

                        }
                    } else {
                        //return res.json({status:"Ne obstaja"})
                    }
                }

                //return res.json({status:"Ne obstaja"})

            }
        }
        return res.json({ status: "obstajata", obj: objJSON })
    } 
    res.json({ status: "nedefinirano" });
})


module.exports = router;