const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")

const {Client} = require("@googlemaps/google-maps-services-js");



class RootController{
    static async indexPage(req,res){
 
    //     const client = new Client({});
    //     const x= { origin: 'Chicago, IL',
    //     destination: 'Los Angeles, CA',
    //     waypoints: [
    //       {
    //         location: 'Joplin, MO',
    //         stopover: false
    //       },{
    //         location: 'Oklahoma City, OK',
    //         stopover: true
    //       }],
    //     provideRouteAlternatives: false,
    //     travelMode: 'DRIVING',
    //     drivingOptions: {
    //       departureTime: new Date(/* now, or future date */),
    //       trafficModel: 'pessimistic'
    //     },
        
    //     // unitSystem: google.maps.UnitSystem.IMPERIAL
    // }

    //  client
    //   .directions({params:{
    //       origin:{lat:6.927079,lng:79.857750},
    //       destination:{lat:6.927079,lng:79.857750},
    //       optimizeWaypoints: true,
    //       waypoints: [],
    //       travelMode: 'DRIVING',
    //       key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
    //     }})
    //     .then((response) => {
    //       // directionsRenderer.setDirections(response);    
    //       console.log(response.data.routes[0].legs);
    //       res.send(response.data)
    //     //  console.log(pois[0])
    //     })
    //      .catch((e) =>{ 
    //          console.log(e)
    //         // window.alert("Directions request failed due to " + e)
    //     });


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
                    req.session.user._id=_id;
                    req.session.user.type="traveller"
                   return  res.json({message:"successfully signed in", user:{_id,firstname,lastname,email, dob, country,religion, type:"traveller"}})
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
            req.session.destroy();     
            return res.json({message:"signout successfully"})
            

        }


        static async addAdmin(req,res){
            console.log("sdgysdyy")
            return res.send("add admin success")
        }


}
module.exports=RootController