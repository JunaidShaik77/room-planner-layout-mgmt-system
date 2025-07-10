const express = require("express");
const app = express();
const mongoose = require("mongoose");


app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://Room_Planner:IKA@roomdesignandlayout.r6ihssl.mongodb.net/")

const notesSchema =
{
  title: String,
  content: String
}

const Note = mongoose.model("Note",notesSchema);


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app._routerlisten(5523,function(){
    console.log("Server is running on 3000");
})
