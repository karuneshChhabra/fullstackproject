const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app =express();
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routers/auth');
const port = process.env.PORT || 8000;
const authRouters= require('./routers/auth');






//DB Connect
mongoose.connect(process.env.DATABASE,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
   console.log("DB connected")
});

//middleware
app.use(bodyParser.json({ type: 'application/json' }))

app.use(cookieParser())
app.use(cors())


//custom middleware

app.use("/api",authRouters);


app.listen(port,()=>{
  console.log(`server is up and running ${port}`)
})

  

