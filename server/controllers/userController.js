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
        throw new Error("all inputs are required");
    }

    try {
        const preuser = await userDb.findOne({ email: email });

        if (preuser) {
            res.status(400).json({success:false, message:"this user is already exist"});
        } else if (password !== cpassword) {
            return  res.status(400).json({success:false, message:"password and cpassword not match"});
        } else {
            const data = new userDb({
                name, email, password,cpassword
            })

            // here hashing password

            await data.save();
            return  res.status(201).json({success:true, message:"user created succefully",data:{...data._doc,password:undefined}});
        }

    } catch (error) {
        return  res.status(400).json({success:false,message:error.message})
    }

}


// login api
exports.Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Please fill in all the required fields.");
    }

    try {
        const userValid = await userDb.findOne({ email: email });
        if (!userValid) {
            return res.status(400).json({ success:false,message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
            return res.status(400).json({ success:false,message: "Invalid credentials." });
        }

        const token = await userValid.generateAuthtoken();

        res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 9000000),
            httpOnly: true
        });

        const result = {
            user: userValid,
            token
        };

        return res.status(200).json({ success:true,message:"user loged in successfully", result:{...result._doc,password:undefined} });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success:false,message:error.message});
    }
};
exports.Validuser = async(req,res)=>{
    try {
        const ValidUserOne = await userDb.findOne({_id:req.userId}).select("-password");
        if(!ValidUserOne){
            return res.status(400).json({success:false,message:"user not found"})
        }
      return  res.status(200).json({success:true,ValidUserOne});
    } catch (error) {
       return res.status(400).json({success:false,message:error.message});
    }
}


