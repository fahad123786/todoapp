const Product = require("../models/product.model")
const mongoose = require('mongoose');

exports.store=async(req,res)=>{
    try{
        const product = await Product.create(req.body);
        res.json({status: 200, message:"Product Created Successfully", product})
    }
    catch(err){
        console.log(err);
    }
}

exports.index=async(req,res)=>{
    try{
        const product = await Product.find({});
        res.json({status: 200, message:"Product Fetched Successfully", product})
    }
    catch(err){
        console.log(err);
    }
}

// exports.index=async(req,res)=>{
//     try{
//         const category= req.query;
//         const query = {};
//         if(category){
//             query.category=category;
//         }
//         const product = await Product.find(query);
//         res.json({status: 200, message:"Product Fetched Successfully", product})
//     }
//     catch(err){
//         console.log(err);
//     }
// }

exports.get=async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findOne({_id:id});
        if(!product){
            return res.json({status:404, message:"Couldn't find product"});
        }
        res.json({status: 200, message:"Product Fetched Successfully", product})
    }

    catch(err){
        console.log(err);
    }
}

exports.destroy=async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findOneAndDelete({_id:id});
        if(!product){
            return res.json({status:404, message:"Couldn't find product"});
        }
        res.json({status: 200, message:"Product Deleted Successfully"})
    }

    catch(err){
        console.log(err);
    }
}

exports.update = async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await Product.findOneAndUpdate({_id:id},req.body,{new:true});
    if(!product){
        return res.json({status:404, message:"Couldn't find product"});
    }
    res.json({status:200, message:"Product Updated Successfully",product});
    }
    catch(err){
        console.log(err);
    }
}

exports.getting = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Validate userId to ensure it's a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ status: 400, message: "Invalid user ID" });
      }
  
      // Fetch products for the given user ID
      const products = await Product.find({ userId: userId }); // Use `userId` instead of `user`
  
      // Handle case where no products are found
      if (products.length === 0) {
        return res.status(404).json({ status: 404, message: "No products found for this user" });
      }
  
      // Return the products if found
      res.status(200).json({ status: 200, message: "Products fetched successfully", products });
    } catch (err) {
      console.error("Error in getting products:", err);
      res.status(500).json({ status: 500, message: "Server Error", error: err.message });
    }
  };



exports.storing = async (req, res) => {
    try {
        const { title, time, description, task_status, userId } = req.body;

      
        const product = await Product.create({
            title,
            time,
            description,
            task_status,
            user: new mongoose.Types.ObjectId(userId) // Convert userId to ObjectId
        });

        res.json({ status: 200, message: "Product Created Successfully", product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};
