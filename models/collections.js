const mongoose = require('mongoose')


const collectionsSchema = new mongoose.Schema({


    name:{
        type:String,
        
        required: true,
        maxlength: 200,
        unique: true
    }
    
},
{timestamps : true}

);

// Virtual Field



module.exports = mongoose.model("Collection",collectionsSchema);