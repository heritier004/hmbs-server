const db = require("../database/db");
const getAllMovies =(req,res,next)=>{
    db.query("SELECT * FROM movie",(err,result)=>{
        if(err)
         console.log(err);
        else{
        console.log(result[0].title);
          res.send(result);
        }
    
    });
};


module.exports = {getAllMovies :getAllMovies};