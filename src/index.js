const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route");

mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/task",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is connected."))
.catch(err=>console.log(err));

app.use('/',route);

app.listen(process.env.PORT || 3000, function(){
    console.log("Connected to PORT:" + (process.env.PORT || 3000))
});
