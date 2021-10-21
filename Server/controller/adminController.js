const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")
const Province=mongoose.model("Province")
const User = mongoose.model("User")
const Travelplan=mongoose.model("TravelPlan")

class AdminController{
     
    static async signup(req,res){
        const {firstname,lastname,dob,email,password}=req.body;
        if(!firstname || !lastname || !dob || !email ||  !password){
            return res.json({error:"please add all the fields"})
        }

                      return Admin.findOne({email:email})
                        .then((savedUser)=>{
                            if(savedUser){
                            return res.json({error:"user already exists with that email"})
                            }
                           return bcrypt.hash(password,12)
                            .then(hashedpassword=>{
                                const user = new Admin({
                                    firstname,
                                    lastname,
                                    dob,
                                    email,
                                    password:hashedpassword,
                                    
                                })
                        
                               return user.save()
                                .then(user=>{
                                   return res.json({message:"Register successfully"})
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
        return Admin.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
            return res.json({error:"Invalid Email or password"})
            }
            return bcrypt.compare(password,savedUser.password)
            .then(doMatch=>{
                if(doMatch){
                    req.session.admin={}
                    req.session.admin.email=email;
                    req.session.admin._id=savedUser._id
                    req.session.admin.type="admin"
                   res.json({message:"successfully signed in",data:savedUser})
                }
                else{
                    return res.json({error:"Invalid Email or password"})
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

        static async viewAdmins(req,res){
               return Admin.find().
                then((admins)=>{
                    return res.json({admins})
                }).
                catch(err=>{
                    console.log(err)
                    return res.json({error:"system error"})
                })
        }
        static async viewAdmin(req,res){
            return Admin.find().
            then((admins)=>{
                return res.json({admins,pid:req.params.pid})
            }).
            catch(err=>{
                console.log(err)
                return res.json({error:"system error"})
            })
    }
    static async viewUser(req,res){
            return User.find().
            then((users)=>{
                return res.json({users})
            }).
            catch(err=>{
                console.log(err)
                return res.json({error:"system error"})
            })
    }
    static async Travelplan(req,res){
        return Travelplan.find().
        then((travelplan)=>{
            return res.json({travelplan})
        }).
        catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
    }
    static async addImgtoProvinceData(req,res){
        const  provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                    "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}

        return Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){
                const province=new Province({
                    pid:req.body.pid,
                    name:provinceList[req.params.pid],
                    description:req.body.description,
                    images:[req.body.image]
                })
                return province.save()
                            .then(result=>{
                                return res.json({message:"upload image successfully", result})
                            })
                            .catch(err=>{
                                console.log(err)
                            })
            }
            if(saveData){
                return Province.findOneAndUpdate({pid:req.body.pid},{$push:{images:req.body.image}},{new:true}).
                then(result=>{
                    return res.json({message:"upload image successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                    return res.json({error:"system error"})
                })
            }
        }).catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
    }
    static async getProvinceData(req,res){
        const provinceList ={"p1":"Northern Province", "p2":"North Western Province", "p3":"Western Province", "p4":"North Central Province",
                    "p5":"Central Province", "p6":"Sabaragamuwa Province", "p7":"Eastern Province", "p8":"Uva Province", "p9":"Southern Province"}


        return Province.findOne({pid:req.params.pid})
        .then((saveData)=>{
            if(!saveData){
                const province=new Province({
                    pid:req.params.pid,
                    name:provinceList[req.params.pid],
                    description:"",
                    images:[]
                })
                return province.save()
                            .then(result=>{
                                return res.json(result)
                            })
                            .catch(err=>{
                                console.log(err)
                                return res.json({error:"system error"})
                            })

            }
            if(saveData){
                return res.json(saveData)
            }
        }).catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
    }

    static async deleteProvinceImage(req,res){
        return Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){   
                return res.json({error:"bad request"})
            }
            if(saveData){
                return Province.findOneAndUpdate({pid:req.body.pid},{$pull:{images:req.body.image}},{new:true}).
                then(result=>{
                    return res.json({message:"delete image successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                    return res.json({error:"system error"})
                })
            }
        }).catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
    }

    static async descriptionUpdate(req,res){
        return Province.findOne({pid:req.body.pid})
        .then((saveData)=>{
            if(!saveData){   
                return res.json({error:"bad request"})
            }
            if(saveData){
                return Province.findOneAndUpdate({pid:req.body.pid},{description:req.body.description},{new:true}).
                then(result=>{
                    return res.json({message:"update description successfully", result})
                }).
                catch(err=>{
                    console.log(err)
                    return res.json({error:"system error"})
                })
            }
        }).catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
        })
    }

        static async getSharedPlans(req,res){
            Travelplan.find({ownedBy:"6131020c334d393094db1e4a", rate:req.body.rate, public:false})
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
            Travelplan.find({ownedBy:"6131020c334d393094db1e4a", public:true})
                .populate("OwnedBy","_id")
                .sort('-createdAt')
                .then(myPlans=>{
                    res.json({myPlans})
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        static async deleteTravelPlan(req,res){
            Travelplan.findOneAndRemove({_id:req.body.planId,ownedBy:"6131020c334d393094db1e4a"}).then(data=>{
                return res.json({data})
            }).catch(e=>{
                console.log(e)
            })
        }

        static async setPublicPlan(req,res){
            
            Travelplan.findOneAndUpdate({_id:req.body.planId,ownedBy:"6131020c334d393094db1e4a"},{public:true},{new:true}).
                    then(data=>{
                        return res.json({data})
                    }).
                    catch(err=>{
                        console.log(err)
                    })
        }
        static async removePublicPlan(req,res){
            Travelplan.findOneAndUpdate({_id:req.body.planId,ownedBy:"6131020c334d393094db1e4a"},{public:false},{new:true}).
            then(data=>{
                return res.json({data})
            }).
            catch(err=>{
                console.log(err)
            })
        }

}
module.exports=AdminController