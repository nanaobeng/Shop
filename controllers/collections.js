const Collections = require("../models/collections")
const {errorHandler} = require('../helpers/dbErrorHandler')





exports.collectionById = (req,res,next,id)=> {
    Collection.findById(id).exec((err,collection) => {
        if (err || !collection) {
            return res.status(400).json({
                error: 'Collection does not exist'
            })
        }
        req.collection = collection
        next();
    })
}
exports.create = (req,res) => {
    const collection = new Collections(req.body)
    collection.save((err,data) => {
        if(err) {
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({ data})
    })
}

exports.read = (req, res) => {
    return res.json(req.collection);
}

exports.update = (req,res) => {
    const collection = req.collection
    collection.name = req.body.name
    collection.save((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })

}

exports.remove = (req,res) => {
    const collection = req.collection
  
    collection.remove((err,data) => {
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({
            message : 'Collection deleted'
        })
    })

}

exports.list = (req,res) => {

    Collections.find().exec((err,data) => {
        if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
    res.json(data);
    
})
};