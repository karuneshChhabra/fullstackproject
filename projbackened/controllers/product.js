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
    req.product.photo=undefined;
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

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
       res.set("Content-Type",req.product.photo.contentType) 
       return res.send(req.product.photo.data);
    }
    next();
}

exports.getAllProducts = (req,res) =>{
    let limit= req.query.limit?parseInt(req.query.limit):8;
    let sortBy=req.query.sortBy?req.query.sortBy:"_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err,products)=>{
    if(err || !products){
       return res.status(400).json({
           error:"No product found"
       })
    }
   return res.json(products);
 });

}

var errorMessageHandler=(errorMessage,res)=>{
    return res.status(400).json({
        error:errorMessage
    })
}

exports.updateProduct =(req,res) =>{
 var formidable = new formidable.IncomingForm();
 formidable.keepExtensions=true;

 formidable.parse(req, (err,fields,file)=>{
     if(err){
        return errorMessageHandler("error occur in the image");
     }

     const product= req.product;
     product= _.extend(product,fields);

     if(file.photo){
         if(file.photo.size>3000000){

            return errorMessageHandler("Photo size is too big!");

         }
         product.photo.data=fs.readFileSync(file.photo.path);
         product.photo.contentType=file.photo.type;
     }
     product.save((err,product)=>{
         if(err){
             return errorMessageHandler("value not saved in db")
         }
         else{
             return res.json(product);
         }
     })

 })

}


exports.deleteProduct = (req,res) =>{
    let product= req,product;
    product.remove((err,product)=>{
        if(err){
            return errorMessageHandler("Product not be deleted")
        }
        return res.json({message:"Product is deleted Successfully",product});
    })
}


exports.getAllCategories= (req,res) =>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return errorMessageHandler("No category found");
        }
        return res.json(categories);

    });
}

exports.updateStock=(req,res,next)=>{
 
    let operations=req.body.order.products.map(product=>{
         return {
             updateOne:{
                 filter:{_id:product.id},
                 update:{$inc:{sold:+product.count,stock:-product.count}
             }
         }
        }


    });

    Product.bulkWrite(operations,{},(err,products)=>{
          if(err){
              errorMessageHandler("stock not updated");
          }
         
          next();
    })

}