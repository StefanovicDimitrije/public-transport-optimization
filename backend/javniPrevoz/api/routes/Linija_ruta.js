const e = require('express');
var express = require('express');
let linijaPostaja = require('../data/Linija-Postaja');
let Linija= require('../data/Linije');
let Postaja = require('../data/Postaje');
var router = express.Router();


router.get('/',(req,res)=>{
    res.json(linijaPostaja)
});
router.post('/',(req,res)=>{

    let linija_postaja =  req.body;
    console.log(linija_postaja)
    linija = linija_postaja.Linija1;
    postaja = linija_postaja.Postaja1;
    console.log(linija);
    console.log(linija_postaja)


    if(linija !== "" && postaja !== ""){
        for(const lp of linijaPostaja){
            for(const LinijaNaziv of Linija){
            if(linija == LinijaNaziv.Naziv){
                    let linijaId = LinijaNaziv.id;
                    if(lp.Linija == linijaId){
                        for(const PostajaNaziv of Postaja){
                            if(postaja == PostajaNaziv.Naziv){
                                let postajaID = PostajaNaziv.id;
                                if(lp.Postaja == postajaID ){
                                    return res.json({status:"obstajata",Linija_in_Postaja:lp})
                                }else{
                                    return res.json({status:"Ne obstaja"})
                                }
                               
                            }else{
                                return res.json({status:"Ne obstaja"})
                            }
                        }
                    }else{
                        return res.json({status:"Ne obstaja"})
                    }
                }
            else{
                return res.json({status:"Ne obstaja"})
            }
        }
        }

    }
    else if(linija !== "" && postaja ==="" ){
        let lpObj = [];
        for(const lp of linijaPostaja){
            for(const LinijaNaziv of Linija){
                            if(linija == LinijaNaziv.Naziv){
                                let linijaID = LinijaNaziv.id;
                                if(lp.Linija == linijaID ){
                                    lpObj.push(lp);
                                }  
                            }
                        }
                    }
                    
                    return res.json({status:"linija",Linija_in_Postaja: lpObj});

    }else if (linija === "" &&  postaja !== ""){
        let lpObj = [];
        for(const lp of linijaPostaja){
            for(const PostajaNaziv of Postaja){
                            if(postaja == PostajaNaziv.Naziv){
                                let postajaID = PostajaNaziv.id;
                                if(lp.Postaja == postajaID ){
                                   
                                    lpObj.push(lp);
                                }  
                            }
                        }
                    }
                    return res.json({status:"postaja",Linija_in_Postaja: lpObj});
    }
     res.json({status:"nedefinirano"});
})


module.exports = router;
