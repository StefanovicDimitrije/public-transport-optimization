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
const busess = bookshelf.Model.extend({
    tableName: 'buses',
    idAttribute: 'id'
})

router.get('/', async (req, res) => {
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});
router.post('/', async (req, res) => {

    let linija_postaja = req.body;

    linija = linija_postaja.Linija1;

    postaja = linija_postaja.Postaja1;


    const bus = await new busess().fetchAll()
    const driverBusB = await new driverBusB1().fetchAll();
    const driverB = await new driverB1().fetchAll();
    driverBus = driverBusB.toJSON();
    driver = driverB.toJSON();
    const LS = await new line_station().fetchAll();
    const lines = await new line().fetchAll();
    const stations = await new station().fetchAll();
   // const location = await new locations().fetchAll();
    LS_JOSN = LS.toJSON();
    linijaJSON = lines.toJSON();
    postajaJSON = stations.toJSON();
   // locationJSON = location.toJSON()
    busS = bus.toJSON();

    let linijaPostaja = JSON.stringify(LS_JOSN);
    JSON.stringify(linijaJSON);
    JSON.stringify(postajaJSON);
    JSON.stringify(driver);
    JSON.stringify(driverBus);
    JSON.stringify(busS);

    let objJSON = [];
    let objJSON1 = [];


    if (linija === "0" && postaja !== "0") {
        let lpObj = [];
        let lpObj1 = [];

        /* for(let i=0; i<  linijaPostaja; i++){
         for(const linija of linijaJSON  ){
             if(linija.id == linijaPostaja[i].tk_id_line){
            for(const postajaId of postajaJSON){
              if(postajaId.id == postaja){
                 if(postajaId.id == linijaPostaja[i].tk_id_station){
                 for(const driversBus of driverBus){
                     if(driversBus.id == linijaPostaja[i].tk_id_bus_driver){
                         for(const drivers of driver){
                             if(driversBus.tk_id_driver == drivers.id){
                                 for(const bus of busS){
                                     if(bus.id == driversBus.tk_id_bus){
                                         let response = {
                                             id: linijaPostaja[i].id,
                                             station: postajaId.name,
                                             time: linijaPostaja[i].time,
                                             bus: bus.serialNo,
                                             driver: drivers.name,
                                             dontWork: linijaPostaja[i].day
                                         } 
                                         lpObj.push(response)
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
          }
          return res.json({ status:"postaja",postaja: lpObj, });*/

         let lineStation0 = await new line_station().where('tk_id_station',postaja).fetchAll();
         let lineStation = lineStation0.toJSON();
         lpObj.push(lineStation[0])
         for(let i = 1; i<lineStation.length;i++){
          
         if(lineStation[0].tk_id_line != lineStation[i].tk_id_line){
            lpObj.push(lineStation[i])
         }
         }
       
       //
       /*  let br =0;
        for (let i = 0; i < LS_JOSN.length; i++) {
            for (let j = 1; j < LS_JOSN.length; j++) {
                if (LS_JOSN[i].tk_id_station !== LS_JOSN[j].tk_id_station) {
                    br++
                } else {
                    break;
                }
            }
            break;
        }*/
            for (let i = 0; i < lpObj.length; i++) {
          
                for (const linija of linijaJSON) {
                   
                    if (linija.id == lpObj[i].tk_id_line) {
                        for (const postajaId of postajaJSON) {
                    
                            if (postajaId.id == postaja) {
                                if (postajaId.id == lpObj[i].tk_id_station) {
                                    
                                    let response = {
                                        id: lpObj[i].tk_id_line,
                                        station: postajaId.name,
                                        line: linija.name
                                    }
                                    lpObj1.push(response)
                                }
                            }
                        }
                    }
                }
            }
            return res.json({
                status: "postaja",
                postaja: lpObj1,
            });

        /* for (const lp of LS_JOSN) {
             for (const postajaNaziv of postajaJSON) {
                 if (postaja == postajaNaziv.id) {
                     let postajaId = postajaNaziv.id;
                     PostajaNaziv = postajaNaziv.name;
                     if (lp.tk_id_station == postajaId) {
                         for (const LinijaNaziv of linijaJSON) {
                             if (lp.tk_id_line == LinijaNaziv.id) {
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


    } else if (linija !== "0" && postaja === "0") {
        let lpObj = [];
        let lpObj1 = [];
        let linijaNaziv;

        for (const linije of linijaJSON) {
            if (linije.id == linija) {
                return res.json({
                    status: "linija",
                    linija: linije
                });
            }
        }
        /* for (const lp of LS_JOSN) {
            for (const LinijaNaziv of linijaJSON) {
                if (linija == LinijaNaziv.id) {
                    let linijaId = LinijaNaziv.id;
                    linijaNaziv = LinijaNaziv.name;
                    if (lp.tk_id_line == linijaId) {
                        for (const PostajaNaziv of postajaJSON) {
                            if (lp.tk_id_station == PostajaNaziv.id) {

                                for (const driverBus1 of driverBus) {
                                    if (driverBus1.id == lp.tk_id_bus_driver) {
                                        for (const driverNaziv of driver) {

                                            if (driverNaziv.id == driverBus1.tk_id_driver) {
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
                if (linija == LinijaNaziv.id) {
                    let linijaId = LinijaNaziv.id;
                    let linijaNaziv = LinijaNaziv.name;
                    if (lp.tk_id_line == linijaId) {
                        for (const PostajaNaziv of postajaJSON) {
                            if (postaja == PostajaNaziv.id) {
                                let postajaID = PostajaNaziv.id;
                                for (const driverBus1 of driverBus) {
                                    if (driverBus1.id == lp.tk_id_bus_driver) {
                                        for (const driverNaziv of driver) {
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
        return res.json({
            status: "obstajata",
            obj: objJSON
        })
    }
    res.json({
        status: "nedefinirano"
    });
})


module.exports = router;