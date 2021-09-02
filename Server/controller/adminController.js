const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")



class AdminController{
    
    static async signup(req,res){
        const {firstname,lastname,dob,email,password}=req.body;
        if(!firstname || !lastname || !dob || !email ||  !password){
            return res.status(422).json({error:"please add all the fields"})
        }

                        Admin.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.status(422).json({error:"user already exists with that email"})
                            }
                            bcrypt.hash(password,12)
                            .then(hashedpassword=>{
                                const user = new Admin({
                                    firstname,
                                    lastname,
                                    dob,
                                    email,
                                    password:hashedpassword,
                                    
                                })
                        
                                user.save()
                                .then(user=>{
                                    res.json({message:"Register successfully"})
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                            })
                        
                        })
                        .catch(err=>{
                        console.log(err)
                        })

    }
    static async login(req,res){
        const {email,password} = req.body
        if(!email || !password){
        return res.status(422).json({error:"please add email or password"})
        }
        Admin.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    req.session.user={}
                    req.session.user.email=email;
                   res.json({message:"successfully signed in"})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or password"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        }

        static async viewAdmins(req,res){
                Admin.find().
                then((admins)=>{
                    res.json({admins})
                }).
                catch(err=>{
                    console.log(err)
                })
        }


}
module.exports=AdminController