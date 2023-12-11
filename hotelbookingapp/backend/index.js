const express = require('express')
const app = express()
const cors  = require('cors')
const router = require('./controller/main')

const mongoose = require('mongoose')



app.use(cors({
    origin: 'http://localhost:6110',
    credentials: true, 
  }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb+srv://sharadnarzo10:Nwm9q6ESDupF30mJ@cluster0.wnewvoq.mongodb.net/hotelbook2')
.then(()=>{
console.log('Database Connected');
})
.catch((e)=>{
    console.log('Error Connecting Database' , e.name);
})



app.get('/' , (req,res)=> {
    res.send('Home Page')
})


app.use('/api' , router)

app.listen(  6000, ()=>{
    console.log('Server Started');
})