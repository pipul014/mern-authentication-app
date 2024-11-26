const mongoose = require("mongoose");
const DB = process.env.MONGO_URI

mongoose.connect(DB,{
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})