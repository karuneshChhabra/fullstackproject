const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app =express();
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;

// My routers
const authRouters= require('./routers/auth');
const userRouters= require('./routers/user');
const categoryRouters= require('./routers/category');
const productRouters= require('./routers/product');
const orderRouters = require('./routers/order');
const stripeRouters = require("./routers/stripePayment")


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
app.use("/api",userRouters);
app.use("/api",categoryRouters);
app.use("/api",productRouters);
app.use("/api",orderRouters);
app.use("/api",stripeRouters);

app.listen(port,()=>{
  console.log(`server is up and running ${port}`)
})

  

