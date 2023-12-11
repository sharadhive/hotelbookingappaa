const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String ,
        required: true
    } ,
    type: String ,  //single double or suite 
    price: {
        type:Number ,
        required: true
    } ,
    img: [] ,
  
})


const Room = mongoose.model('Room' , roomSchema)


module.exports = Room