require("dotenv").config()
const express =require("express")
const cors=require("cors")
require("./db/conn");
const port = process.env.PORT ||4000;
const app = express();

const corsOptions={
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,PATCH,DELETE",
  Credential:true
}
app.use(cors(corsOptions));
app.use(express.json());

const usreAuthRoutes=require("./routes/router");
app.use("/userAuth/v1/api",usreAuthRoutes)

app.get("/",(req,res)=>{
    res.send("server is running");
})
app.listen(port, () =>
  console.log(`server is running at port no. http://localhost:${port}`),
);