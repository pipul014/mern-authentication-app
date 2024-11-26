const userDb=require("../models/userSchema")
const bcrypt = require("bcryptjs")  //import for cpassword hash password
const nodemailer = require("nodemailer");


// email config

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
}) 
// register api
exports.Register = async (req, res) => {
    
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword ) {
        return  res.status(400).json("all inputs are required")
    }

    try {
        const preuser = await userDb.findOne({ email: email });

        if (preuser) {
            res.status(400).json("this admin is already exist");
        } else if (password !== cpassword) {
            return  res.status(400).json("password and cpassword not match");
        } else {
            const data = new userDb({
                name, email, password,cpassword
            })

            // here hashing password

            await data.save();
            return  res.status(200).json(data);
        }

    } catch (error) {
        return  res.status(400).json(error)
    }

}

// login api
exports.Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userDb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                // token generate
                const token = await userValid.generateAuthtoken();
                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                console.log(result);
                
                res.status(201).json({status:201,result})
            }
        }
    } catch (error) {
     return   res.status(400).json(error)
    }

}
