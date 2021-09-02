const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")

class UserController{
    static async updateUser(req,res){

            User.findOne({email:req.body.email})
            .then((savedUser)=>{
                if(savedUser._id!=req.body._id){
                    return res.status(422).json({error:"user already exists with that email"})
                }
            })       
            User.findByIdAndUpdate(req.body._id,{
                                    firstname:req.body.firstname,
                                    lastname:req.body.lastname,
                                    dob:req.body.dob,
                                    country:req.body.country,
                                    religion:req.body.religion,
                                    email:req.body.email,
                                    pic:req.body.pic
            }).
            then(data=>{
                res.json(data)
            }).catch(err=>{
                return res.status(422).json({error:"update error"})
            })    
        }
    
}
module.exports=UserController