const Product = require("../models/product")
const _ = require("lodash");
const formidable= require("formidable");
const fs = require("fs");

exports.getProductById=(req,res, next, productId)=>{
   
    Product.findOne({_id:productId}).populate("category").exec((err,product)=>{
       if(err || !product){
           res.status(400).json({
               error:"Product not found"
           })
       }
       req.product=product;
       next();

    });
    
}

exports.getProduct=(req,res)=>{
    req.product.photo.data=undefined;
    return res.json(req.product);
}

exports.createProduct=(req, res) =>{
    var form=  new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>{
     if(err){
         return res.status(400).json({
             error: "Product not store in the db"});

     }

   
    const {title,description,price,category,stock}= fields;



     if(!title || !description || !price || !category || !stock || !file.photo ){
         return res.status(400).json({
             error:"Required Fields are missing:- title, description,price,category,stock,photo"
         })
     }

    
     let product= new Product(fields);
    

     if(file.photo){
         if(file.photo.size <3000000){
           // product.photo=file.photo 
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;


 
         }else{
            return res.status(400).json({
                error:"Photo size should be less than 3MB."
            }) 
         }

         console.log(product);
         


         product.save((err,product)=>{
             console.log(err);
             if(err || !product){
                 return res.status(400).json({
                     error:"Value not stored in db"
                 })
             }
             return res.json(product);
         })
     }



    });


}