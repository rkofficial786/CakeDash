const  mongoose = require("mongoose")

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category"
    },
    quantity:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    ratings: [
        {
          star: Number,
          comment: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
          createdAt: { type: Date, default: Date.now }
        },
      ],

    totalrating:{
        type:String, 
        default: 0
    }
   

},{timestamps:true})

module.exports = mongoose.model("Products", productSchema);
