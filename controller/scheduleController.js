const db = require("../database/db");
const movieController = require("./movieController");
const getSchedule = (req,res,next)=>{
    req.params.id

 db.query(`select * from schedule where movieid ='${req.params.id}'`,(err,result)=>{
     if(err)
       console.log(err);
     else{
          res.send(result);
     }
        

 })};

 const getMovie =(req,res,next)=>{
  console.log(req.params)
  db.query(`select movie.title from schedule inner join movie on schedule.movieid = movie.id where schedule.id = ${req.params.scheduleId}`,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      console.log(result);
    res.send(result);
    }
  })
 }

 module.exports ={getSchedule :getSchedule,getMovie:getMovie}