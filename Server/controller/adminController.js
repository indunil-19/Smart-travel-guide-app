const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")
const Province=mongoose.model("Province")
const TravelPlan=mongoose.model("TravelPlan")


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
        static async addImgtoProvinceData(req,res){
           const  provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                        "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}
   
            Province.findOne({pid:req.body.pid})
            .then((saveData)=>{
                if(!saveData){
                    const province=new Province({
                        pid:req.body.pid,
                        name:provinceList[req.params.pid],
                        description:req.body.description,
                        images:[req.body.image]
                    })
                    province.save()
                                .then(result=>{
                                   return res.json({message:"upload image successfully", result})
                                })
                                .catch(err=>{
                                    console.log(err)
                                })

                }
                if(saveData){
                    Province.findOneAndUpdate({pid:req.body.pid},{$push:{images:req.body.image}},{new:true}).
                    then(result=>{
                        return res.json({message:"upload image successfully", result})
                    }).
                    catch(err=>{
                        console.log(err)
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        static async getProvinceData(req,res){
           const provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                        "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}


            Province.findOne({pid:req.params.pid})
            .then((saveData)=>{
                if(!saveData){
                    const province=new Province({
                        pid:req.params.pid,
                        name:provinceList[req.params.pid],
                        description:"",
                        images:[]
                    })
                    province.save()
                                .then(result=>{
                                   return res.json(result)
                                })
                                .catch(err=>{
                                    console.log(err)
                                })

                }
                if(saveData){
                    return res.json(saveData)
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        static async deleteProvinceImage(req,res){
            Province.findOne({pid:req.body.pid})
            .then((saveData)=>{
                if(!saveData){   
                    return res.json({error:"bad request"})
                }
                if(saveData){
                    Province.findOneAndUpdate({pid:req.body.pid},{$pull:{images:req.body.image}},{new:true}).
                    then(result=>{
                        return res.json({message:"delete image successfully", result})
                    }).
                    catch(err=>{
                        console.log(err)
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        static async descriptionUpdate(req,res){
            Province.findOne({pid:req.body.pid})
            .then((saveData)=>{
                if(!saveData){   
                    return res.json({error:"bad request"})
                }
                if(saveData){
                    Province.findOneAndUpdate({pid:req.body.pid},{description:req.body.description},{new:true}).
                    then(result=>{
                        return res.json({message:"update description successfully", result})
                    }).
                    catch(err=>{
                        console.log(err)
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        }

        static async getSharedPlans(req,res){
            TravelPlan.find({ownedBy:"6131020c334d393094db1e4a", public:false})
                .populate("OwnedBy","_id")
                .sort('-createdAt')
                .then(myPlans=>{
                    res.json({myPlans})
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        static async getPublicPlans(req,res){
            TravelPlan.find({ownedBy:"6131020c334d393094db1e4a", public:true})
                .populate("OwnedBy","_id")
                .sort('-createdAt')
                .then(myPlans=>{
                    res.json({myPlans})
                })
                .catch(err=>{
                    console.log(err)
                })
        }

}
module.exports=AdminController