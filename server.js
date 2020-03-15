require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();


//connect to database
mongoose.connect(
    process.env.MONGO_URI,
    {
        useCreateIndex : true,
        useNewUrlParser : true,
        useUnifiedTopology : true
    },
    err=>{
        if(err) throw err;
        console.log("connected to the database")
    }
);


//helmet
app.use(helmet());


//body parser
app.use(express.json());
app.use(express.urlencoded({extended : false}));


//routes
app.use('/api/post' , require('./routes/api/posts'));
app.use('/api/user/register' , require('./routes/api/register'));
app.use('/api/user' , require('./routes/api/login'));

//deploy & set static file to build
if(process.env.NODE_ENV === 'production'){
    app.use('/' , express.static(path.join(__dirname , "client" , "build")));
    app.get('*' , (req , res)=>{
        res.sendFile(path.join(__dirname , "client" , "build" , "index.html"));
    });
};


//listen to port
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>console.log(`server running at port : ${PORT}`))