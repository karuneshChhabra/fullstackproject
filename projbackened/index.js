const express = require('express');
const mongoose = require('mongoose');
const result=require('dotenv').config();
const app =express();
const port = process.env.PORT || 8000;






mongoose.connect(process.env.DATABASE,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
   console.log("DB connected")
});

app.listen(port,()=>{
  console.log(`server is up and running ${port}`)
})

  

