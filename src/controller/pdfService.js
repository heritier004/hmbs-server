PDFDocument = require('pdfKit');
const userid = require("./reservationController");
const db = require("../database/db");
const { use } = require('../routes/reservationRoute');
const imagePath = require("../assets/netflix.png")

const printPdf = (req,res,next)=>{
    userId = req.params.id
    scheduleId = req.params.schedId;
    resrvId = req.params.resId;
    const stream = res.writeHead(200,{
        'Content-Type':'application/pdf',
        'Content-Disposition':'attachment ;filename = invoice.pdf'});


    buildPdf(
    (chunk)=>stream.write(chunk),
    ()=> stream.end()
);
};
function dbQuery1(){
    return new Promise((resolve,reject)=>{
        db.query(`select * from user where id = ${userId}`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
function dbQuery2(){
    return new Promise((resolve,reject)=>{
        db.query(`select * from schedule where id = ${scheduleId}`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
function dbQuery3(){
    return new Promise((resolve,reject)=>{
        db.query(`select * from reservation where id = ${resrvId}`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

async function buildPdf(dataCallback,endCallback){
    const user = await dbQuery1();
    const schedule = await dbQuery2();
    const reservation = await dbQuery3();
    // console.log("myresult",user[0].id)
    const doc =  new PDFDocument();
    doc.on('data',dataCallback);
    doc.on('end',endCallback);
    doc.image(imagePath, {
        fit: [150, 200]
      });
    doc.font('Courier').fontSize(20).text('HMBS Reservation confirmation ticket',{
        align: 'right',
        marginBottom : '3px'
      });
    doc.text("************************************************************")
    doc.text(`Full Name : ${user[0].firstname} ${user[0].lastname}`);
    doc.text(`Reservation Id: ${reservation[0].id}`);
    doc.text(`Schedule Time: ${new Date(schedule[0].startTime).toString().split("GMT")[0]}`);
    doc.text("************************************************************")
    doc.text("Thank You For Your Visit",{
        align: 'center'
      }
      );
    doc.end(); 
}

module.exports = {buildPdf:buildPdf , printPdf:printPdf};