require('dotenv').config();
const jwt = require('jsonwebtoken');

const authmw = (req , res , next) =>{
    const token = req.header('x-auth-token');

    //check for token
    if(!token){
        res.status(401).json({error : "no token , actions denied"})
    }else{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        try{
            //add user from payload
            req.user = decoded;
            next();
        }catch(error){
            res.status(400).json({error : "token not valid"})
        }
    }
}

module.exports = authmw;