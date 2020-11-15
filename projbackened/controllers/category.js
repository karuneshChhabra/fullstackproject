const Category =require("../models/category")




exports.getCategoryById=(req, res, next, categoryId)=>{
    Category.findOne({_id:categoryId}).exec((err,category)=>{
      if(err || !category){
          return res.status(400).json({error:"Category not found"})
      }
      req.category=category;
      next();

    });
}

var errorCase=(errorMessage)=>{
    return res.status(400).json({error:errorMessage})
}

exports.createCategory=(req,res)=>{
    var category= new Category(req.body);
    category.save((err, category)=>{
        if(err || !category){
         return errorCase("Category not saved in db.")
        }
        return res.json(category);

        
    })

}

exports.updateCategory=(req,res)=>{
    const category = req.category;
    category.name= req.body.name;

    category.save((err, updatedCategory) => {
        if(err || !updatedCategory ){
            return errorCase("Category not updated  in db.");
        }
        updatedCategory.createdAt=undefined;
        updatedCategory.updatedAt=undefined;
        
        return res.json(updatedCategory);
        
    });
   

}

exports.deleteCategory=(req,res)=>{
    var category = req.category;
    category.remove((err,category)=>{
      if(err || !category){
          return errorCase("Category not be deleted in db.");
      }
      return res.json(category);

    })
}



exports.getAllCategories=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err || !categories){
            return res.status(400).json({error:"Category not found"})
        }
        return res.json(categories);
    });
}