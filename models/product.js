const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({


    name:{
        type:String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description:{
        type:String,
        required: true,
        maxlength: 2000
    },
    price:{
        type:Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category:{
        type:ObjectId,
        ref: 'Category',
        required:true
    },
    quantity: {
        type:Number
    },
    isSmall: {
        type: Boolean,
        default:true
    },
    isLarge: {
        type: Boolean,
        default:true
    },
    isMedium: {
        type: Boolean,
        default:true
    },
    collections:{
        type:ObjectId,
        ref: 'Collection'
    },
    sold: {
        type:Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
},
{timestamps : true}

)


module.exports = mongoose.model("Product",productSchema);