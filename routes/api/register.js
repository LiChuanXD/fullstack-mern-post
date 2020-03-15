const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../../mongodb/userModel');

//register user to /api/user/register
router.post('/' , (req , res)=>{
    const { username , email , password } = req.body;

    //check input fields
    if(!username || !email || !password){
        res.status(400).json({error : "Please fill in all the fields"});
    }

    //check if the user already exist or not
    User.findOne({email}).then(x=>{
        if(x){
            res.status(400).json({error : "User already exist"});
        }else{
            //create new user
            const newUser = new User({
                username,
                email,
                password
            });

            //hash password
            bcrypt.genSalt(13 , (err , salt)=>{
                if(err) throw err;
                bcrypt.hash(newUser.password , salt , (err , hash)=>{
                    if(err) throw err;
                    newUser.password = hash;

                    newUser.save().then(x=>{
                        res.status(200).json({
                            id : x._id
                        })
                    }).catch(err=>console.log(err));
                })
            })
        }
    }).catch(err=>console.log(err));
});

module.exports = router;