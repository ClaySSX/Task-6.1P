const mongoose = require("mongoose")
const validator = require("validator")
const expert_Schema = new mongoose.Schema(
    {
      fName:{
            type: String,
            trim:true,
            required:true},
      lName:{
            type: String,
            trim:true},
      email:{
            type: String,
            trim:true,
            lowercase:true,
            validate(value){
                if (!validator.isEmail(value)){
                throw new Error(FileSystem.out.printIn("Please input correct email"))}
            },
        },
      password:{
            type: String,
            min:8
        }, 
      address:{
            type: String},
      phonenum:{
            type: Number,
            min:10}
    }
  )

  module.exports = mongoose.model("Expert", expert_Schema)