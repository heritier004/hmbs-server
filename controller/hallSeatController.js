const db = require("../database/db")
const getHallSeat = (req,res,next)=>{
    db.query("select * from hallseat",(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    })
}
module.exports = {getHallSeat :getHallSeat}
