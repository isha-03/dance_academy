const express=require("express");
const path= require("path");
const fs=require("fs");
const app=express();
const port =8000;
const bodyparser=require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactAcademy');
  console.log("connected")
}
//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    desc: String
  });
const contact = mongoose.model('detail', contactSchema);
//express specific stuff
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'));

app.get("/",(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
});
app.get("/contact",(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
});
app.post("/contact",(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved in the database")
    });
});
//start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
})

