require('dotenv').config();
const express = require('express');
const User = require('../../mongodb/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authmw = require('../../middleware/authmw');

const router = express.Router();

//login to /api/user/login
router.post('/login' , (req , res)=>{
    const { email , password } = req.body;
    if(!email || !password){
        res.status(400).json({error : "Please fill in all the fields"});
    };

    //check if user is already registered
    User.findOne({email}).then(x=>{
        if(!x){
            res.status(400).json({error : "User does not exist"});
        }else{
            bcrypt.compare(password , x.password , (err , result)=>{
                if(err) throw err;

                if(!result){
                    res.status(400).json({error : "Wrong Password"});
                }else{
                    jwt.sign({id : x._id} , process.env.JWT_SECRET , { expiresIn : 3600 } , (err , token)=>{
                        if(err)throw err;

                        res.status(200).json({
                            user:{
                                id : x._id,
                                username : x.username,
                                email : x.email
                            },
                            token
                        })
                    })
                }
            })
        }
    }).catch(err=>console.log(err));
});

//get a logged in user data at /api/user
router.get('/' , authmw , (req , res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(x=>res.status(200).json(x))
        .catch(err=>console.log(err))
});

module.exports = router;