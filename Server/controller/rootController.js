const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")

const {Client} = require("@googlemaps/google-maps-services-js");



class RootController{
    
    
    static async signup(req,res){
        const {firstname,lastname,dob,country,religion,email,password}=req.body;
        if(!firstname || !lastname || !dob || !country || !religion || !email  || !password){
            console.log(req.body)
            return res.json({error:"please add all the fields"})
        }

                       return User.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.json({error:"user already exists with that email"})
                            }
                            return bcrypt.hash(password,12)
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
                        
                                return user.save()
                                .then(user=>{
                                    return  res.json({message:"Register successfully"})
                                })
                                .catch(err=>{
                                    console.log(err)
                                    return res.json({error:"system error"})
                                })
                            })
                        
                        })
                        .catch(err=>{
                        console.log(err)
                        return res.json({error:"system error"})
                        })

    }
    static async login(req,res){
        const {email,password} = req.body
        if(!email || !password){
        return res.json({error:"please add email or password"})
        }
        return User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.json({error:"Invalid Email or password"})
            }
            return bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    const {_id, firstname, lastname, email,dob,country,religion,password}=savedUser
                    req.session.user={}
                    req.session.user.email=email;
                    req.session.user._id=_id;
                    req.session.user.type="traveller"
                   return  res.json({message:"successfully signed in", user:{_id,firstname,lastname,email, dob, country,religion, type:"traveller"}})
                }
                else{
                    return res.json({error:"Invalid Email or password",})
                }
            })
            .catch(err=>{
                console.log(err)
                return res.json({error:"system error"})
            })
        }).catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
        }

    static async logout(req,res){
            req.session.destroy();     
            return res.json({message:"signout successfully"})
        }
        


}
module.exports=RootController