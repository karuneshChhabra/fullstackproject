const express= require('express');

const app =express();
const port= 8000;

app.get("/",(req,res)=>{
  res.send("Home page")

});

app.get("/logging",(req,res) => {
    res.send("You are visting logging route")
  
});

app.listen(port,()=>{
    
  console.log("server is up and running");
})

