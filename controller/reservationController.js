const db = require("../database/db");
const nodemailer = require('nodemailer');
var subjectLine = "Confirmed: Your Sucssesfuly reserver movie";
var plainText = " Dear ....";
var username,firstname,title, startTime, endTime, gener;


const makeReservation = (req,res,next) =>{    
    db.query(`Insert INTO reservation (scheduleid,userid) VALUES ('${req.body.selectedSched}','${req.body.userid}')`,(err,result)=>{
        
        if(err){
            res.send(err);
        }else{
            res.send({code:result.insertId});
        }
    })

    db.query(`select * from user where id = '${req.body.userid}'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("username: ", result[0].username);
            console.log("firstname: ", result[0].firstname);  
            username = result[0].username;
            firstname = result[0].firstname;
        }
    });

    db.query(`select * from schedule inner join movie on schedule.movieid = movie.id where schedule.id = ${req.body.selectedSched}`,(err,result)=>{

        if(err){

        }else{
            console.log("title: ", result[0].title);
            console.log("startTime: ", result[0].startTime);
            console.log("endTime ", result[0].endTime);
            console.log("gener: ", result[0].gener);
            title = result[0].title;
            startTime = result[0].startTime;
            endTime = result[0].endTime;
            gener = result[0].gener;
            sendEmail();
          
        }
    });


}
    

const sendEmail= async function(){
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: 'cinemahallmiu@outlook.com',
            pass: 'Cinema@miu123'
        }
    });

    const mailOptions = {
        from: 'cinemahallmiu@outlook.com', // sender address
        to: `${username}`, // list of receivers
        subject: `${subjectLine}`, // Subject line
        text: `${plainText}`, // plain text body
    }
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
        console.log('Message Sent' + info.response);
        transporter.close();
     });
}

const getUserReservations = (req,res,next)=>{
    //console.log(req.params.userID);
   db.query(`select schedule.starttime,movie.title,user.firstname,user.lastname from reservation join schedule on reservation.scheduleid = schedule.id join movie on schedule.movieid = movie.id join user on reservation.userid=user.id where reservation.userid=${req.params.userID}`,(err,result)=>{
    if(err){
        res.send(err)
    }else{
        res.send(result);
    }
   });
}


module.exports= {makeReservation:makeReservation,getUserReservations:getUserReservations}
