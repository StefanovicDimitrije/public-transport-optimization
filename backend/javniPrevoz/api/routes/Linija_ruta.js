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
router.get('/', async(req,res)=>{
    const ls = await new line_station().fetchAll()
    res.json(ls.toJSON())
});
router.post('/', async(req,res)=>{

    let linija_postaja =  req.body;
    console.log(linija_postaja)
    linija = linija_postaja.Linija1;
    postaja = linija_postaja.Postaja1;


    const LS = await new line_station().fetchAll();
    const lines = await new line().fetchAll();
    const stations = await new station().fetchAll();
    LS_JOSN = LS.toJSON();
    linijaJSON = lines.toJSON();    
    postajaJSON = stations.toJSON();
    JSON.stringify(linijaJSON);
    JSON.stringify(postajaJSON)

    if(linija !== "" && postaja !== ""){
        for(const lp of LS_JOSN){
            for(const LinijaNaziv of linijaJSON){
            if(linija == LinijaNaziv.Naziv){
                    let linijaId = LinijaNaziv.id;
                    if(lp.Linija == linijaId){
                        for(const PostajaNaziv of postajaJSON){
                            if(postaja == PostajaNaziv.Naziv){
                                let postajaID = PostajaNaziv.id;
                                if(lp.Postaja == postajaID ){
                                    return res.json({status:"obstajata",Linija_in_Postaja:lp,PostajaNaziv:PostajaNaziv,LinijaNaziv:LinijaNaziv})
                                }else{
                                    return res.json({status:"Ne obstaja"})
                                }
                               
                            }
                                return res.json({status:"Ne obstaja"})
                            
                        }
                    }else{
                        return res.json({status:"Ne obstaja"})
                    }
                }
           
                return res.json({status:"Ne obstaja"})
            
        }
        }

    }
    else if(linija !== "" && postaja ==="" ){
        let lpObj = [];
        let linijaNaziv ;
        for(const lp of LS_JOSN){
            for(const LinijaNaziv of linijaJSON){
                console.log(LinijaNaziv.Naziv)
                            if(linija == LinijaNaziv.Naziv){
                                linijaNaziv = LinijaNaziv.Naziv;
                                let linijaID = LinijaNaziv.id;
                                if(lp.tk_id_line == linijaID ){
                                    lpObj.push(lp);
                                }  
                            }
                        }
                     }
                    
                    return res.json({status:"linija",Linija_in_Postaja: lpObj,LinijaNaziv:linijaNaziv});

    }else if (linija === "" &&  postaja !== ""){
        let lpObj = [];
        let postajaNaziv;
        for(const lp of LS_JOSN){
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
                    return res.json({status:"postaja",Linija_in_Postaja: lpObj,PostajaNaziv:postajaNaziv});
    }
     res.json({status:"nedefinirano"});
})


module.exports = router;
