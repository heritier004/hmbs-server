const db = require("../database/db");
const bcrypt = require("bcrypt")
let hashedDb ;
 async function verifyUser(req,res,next){
    const pass =  req.body.password;
    const username= req.body.username;
    const dbPass = await querySelect(username);
    const decrypt2 = await decrypt(pass,dbPass[0].password);
    res.send({bool:decrypt2, obj: dbPass});
}

const querySelect = (user) =>{
    return new Promise ((resolve, reject)=>{
db.query(`select * from user where username = '${user}'`,(err,result)=>{
        if(err)
               return reject(err);
         else{
                return resolve(result);
            };  
        }
)
    })};

function decrypt(pass,hashedDb){
        return new Promise((resolve,reject)=>{
            resolve(bcrypt.compare(pass,hashedDb));
        })
    }

async function encryptPassword(password){
            const saltRound =  await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, saltRound)
            return hashedPass;
    }    
    
async function signupUser(req, res, next){
        let hashedPass = await encryptPassword(req.body.password);
        db.query(
            `INSERT INTO wapmovie.user (username, password, firstname, lastname) VALUES ('${req.body.username}', '${hashedPass}', '${req.body.name}', '${req.body.lastname}')`,
            (err, result)=>{
                if(err){
                    res.send({a:false})
                }else {
                    res.send({a:true})
                };
                }
        )

     }
    
module.exports ={verifyUser :verifyUser, signupUser:signupUser}
module.exports ={verifyUser :verifyUser, signupUser:signupUser}
