const express = require("express");
const bodyParser = require("body-parser");
const Expert = require("./models/Expert.js")
const app = express();
const mongoose = require("mongoose")
const path = require('path');
const e = require("express");

app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://clay-admin:Moshpit1@cluster0.usdlt.mongodb.net/iServiceDB", {useNewUrlParser:true})

app.route('/experts')
  .get((req, res)=>{
    Expert.find((err, expertsList)=>{
      if(err){res.send(err)} 
      else{
        res.send(expertsList)}
    })
  })
  .post((req,res)=>{
    const expert = new Expert({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,  
      password: req.body.password,
      address: req.body.address,
      phonenum: req.body.phonenum
    });
    expert.save((err)=>{
      if(err){
        res.send(err)}
      else res.send("New Expert added Succesfully")
    })
  })
  .delete((req,res)=>{
    Expert.deleteMany((err)=>{
      if(err){
        res.send(err)}
      else res.send("All experts Succesfully deleted")
    })
  })

  app.route('/experts/:id')
    .patch((req,res)=>{
      Expert.update(
        {_id: req.params.id},
        {$set: req.body},
        (err)=>{
          if(!err){res.send('Expert update Succesfully')}
          else res.send(err)
      })
    })
    .get((req, res)=>{
      Expert.findOne(
        {_id:req.params.id},
        (err, expertFound)=>{
          if(expertFound)(res.send(expertFound))
          else res.send("No expert matches found")
      })
    })
    .delete((req,res)=>{
      Expert.deleteOne(
        {_id:req.params.id},
        (err, deleteExpert)=>{
          if(deleteExpert) (res.send("Specific Expert deleted"))
          else res.send(err)
      })
    })

  app.listen(8080, function(){
    console.log("server is running on port 8080")
  });