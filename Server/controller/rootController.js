const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")



class RootController{
    static async indexPage(req,res){
        res.send("download the application from this link")
    }
    static async signup(req,res){
        const {firstname,lastname,dob,country,religion,email,password}=req.body;
        if(!firstname || !lastname || !dob || !country || !religion || !email  || !password){
            console.log(req.body)
            return res.status(422).json({error:"please add all the fields"})
        }

                        User.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.status(422).json({error:"user already exists with that email"})
                            }
                            bcrypt.hash(password,12)
                            .then(hashedpassword=>{
                                const user = new User({
                                    firstname,
                                    lastname,
                                    dob,
                                    country,
                                    religion,
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
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const {_id, firstname, lastname, email,dob,country,religion,password}=savedUser
                    req.session.user={}
                    req.session.user.email=email;
                    
                    res.json({message:"successfully signed in", user:{_id,firstname,lastname,email, dob, country,religion,password}})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or password",})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        }

        static async logout(req,res){
            req.session={}
            return

        }


}
module.exports=RootController