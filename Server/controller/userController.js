const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const TravelPlan=mongoose.model("TravelPlan")



class UserController{
    static async updateUser(req,res){

         return User.findOne({email:req.body.email})
            .then((savedUser)=>{
                if(savedUser && savedUser._id!=req.body._id){
                    return res.json({error:"user already exists with that email"})
                }
                    return User.findByIdAndUpdate(req.body._id,{
                        firstname:req.body.firstname,
                        lastname:req.body.lastname,
                        dob:req.body.dob,
                        country:req.body.country,
                        religion:req.body.religion,
                        email:req.body.email,
                        pic:req.body.pic,
                        password:req.body.password
                    },{new:true}).
                    then(data=>{
                       if(data){
                        return res.json(data)
                       }
                        return  res.json({error:"update fail"})
                    }).catch(err=>{
                        console.log(err)
                        return res.json({error:"system error"})
                    
                    })

            }).catch((e)=>{
                console.log(e)
                return res.json({error:"system error"})
            })       
                
        }

   

    static async saveTravelPlan(req,res){
            
             const travelPlan=new TravelPlan({
                 travelPlan:req.body.travelPlan,
                 ownedBy:req.session.user._id

             })  
            return travelPlan.save().then((result)=>{
                 if(result){
                   return res.json({result, message:"your plan is saved sucessfully"})
                 }
                 return res.json({error:"your plan is not saved"})
                 
             }).catch((error)=>{
                 console.log(error)
                 return res.json({error:"system error"})
                 
             })
    }
    static async getTravelPlans(req,res){

       return  TravelPlan.find({ownedBy:req.session.user._id})
        .populate("OwnedBy","_id")
        .sort('-createdAt')
        .then(myPlans=>{
            if(myPlans){
                return res.json({myPlans})
            }
        })
        .catch(err=>{
            console.log(err)
            return res.json({error:"system error"})
            
        })
    }

    static async updateTravelPlan(req,res){
       
        return TravelPlan.findOneAndUpdate({_id:req.body.planId,ownedBy:req.session.user._id},{
            travelPlan:req.body.travelPlan
        }).then(data=>{
            console.log(data)
                if(data){
                    return res.json({data})
                }
                return res.json({error:"you can't update this plan"})
                
        }).catch(e=>{
            console.log(e)
            return res.json({error:"system error"})
        })

    }

    static async deleteTravelPlan(req,res){
        // req.user={
        //     _id:"6130fec5f7e9e71fc487f211"
        // }
       return TravelPlan.findOneAndRemove({_id:req.body.planId,ownedBy:req.session.user._id}).then(data=>{
            if(data) return res.json({data})
            return res.json({error:"you can't delete this"})
        }).catch(e=>{
            console.log(e)
            return res.json({error:"system error"})

        })
    }
    static async addReview(req,res){
       
        return TravelPlan.findOneAndUpdate({_id:req.body.planId,ownedBy:req.session.user._id},{
            rate:req.body.rate,
            review:req.body.review

        },{new:true}).then(data=>{
            if(data){
                return res.json({data})
            }
            return res.json({error:"you can't review for this"})
        }).catch(e=>{
            console.log(e)
            return res.json({error:"system error"})
        })
    

    }
    static async getReviews(req,res){
       
        return TravelPlan.findOne({_id:req.body.planId,ownedBy:req.session.user._id}).then(data=>{
                if(data)  return res.json({data})
                return  res.json({error:"something went wrong"})
                        
        }).catch(e=>{
            console.log(e)
            return res.json({error:"system error"})
        })
    }

    static async shareTravelPlan(req,res){
       
         return TravelPlan.findOne({_id:req.body.planId,ownedBy:req.session.user._id}).then(data=>{
            // 6131020c334d393094db1e4a
            if(data){  
            const travelPlan=new TravelPlan({
                travelPlan:data.travelPlan,
                review:data.review,
                rate:data.rate,
                ownedBy:{
                    _id:"6131020c334d393094db1e4a"
                }

            })  
           return travelPlan.save().then((result)=>{
               return res.json({result})

            }).catch((error)=>{
                console.log(error)
                return res.json({error:"system error"})
            })

            }
            return  res.json({error:"something went wrong"})

        }).catch(e=>{
            console.log(e)
            return res.json({error:"system error"})
        })
        }

    
    
}
// static async getTouristAttractions(req,res){
    // // console.log(climate,provinces,days,religion,thingsLike,placesLike)
    // const client = new Client({});
   
      
    //   var province=[]
      
      
    //   var climate="wet"
      
      
         
    //   var things_you_like_to_do=[]
      
    //   var religion="buddhist"
     
      
    //   var placeslike=["animal", "parks", "beaches"]
      
    //   var number_of_days=1
      
    //   var provinceData={
    //     "Northern":[9.112945,80.477003],
    //     "North Western":[7.612998,80.180174],
    //     "Western":[6.904614,80.037256],
    //     "North Central":[8.331083,80.641908],
    //     "Central":[7.318882,80.696876],
    //     "Sabaragamuwa":[6.697343,80.509984],
    //     "Eastern":[7.602108,81.598357],
    //     "Uva":[6.751896,81.290534],
    //     "Southern":[6.058624,80.414907]
    //   }
      
    //   var climateData={
    //     "wet":["Western", "Sabaragamuwa", "Southern"],
    //     "intermediate":["Central", "Uva"],
    //      "dry":["Northern","North Western", "North Central","Eastern"]
    //   }
      
    //   var pois=new Array()
      
    //   // user preferences analysis
    //   function userPreferencesAnalysis(){
    //     let reqArr=[]
    //     let pro=[];
    //     if(climate){
    //       pro=climateData[climate].filter(x=>province.includes(x))
    //       if(pro.length==0){
    //         pro=climateData[climate]
      
    //       }
    //     }
    //     let R="50000"
    //     pro.forEach(ele => {
    //       if(ele=="Northern")  R="5000";
    //       things_you_like_to_do.forEach(x=>{
    //         let req={
    //           location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
    //           radius: R,
    //           query: x,
    //           type:['tourist_attraction', ],
    //           // 
    //           key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
    //           rating:4,
    //         };
    //         reqArr.push(req)
    //       })
    //       placeslike.forEach(x=>{
    //         if(x=="reliogous"){
    //           let req={
    //             location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
    //             radius: R,
    //             query: x+religion,
    //             type:['tourist_attraction', ],
    //             // rankBy :google.maps.places.RankBy.DISTANCE,
    //             key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
    //             rating:4,
    //           };
    //           reqArr.push(req)
    //         }else{
    //           let req={
    //             location:  { lat:provinceData[ele][0], lng:provinceData[ele][1]},
    //             radius: R,
    //             query: x,
    //             type:['tourist_attraction', ],
    //             // rankBy :google.maps.places.RankBy.DISTANCE,
    //             key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
    //             rating:4,
      
    //         };
    //         reqArr.push(req)
    //       }})
      
    //     });
      
    //     return reqArr;
    //   }
    //    async function initMap() {
    //       userPreferencesAnalysis().forEach(async(x)=>{
    //             findPOIS(x)
    //       })
    //       await new Promise(r => setTimeout(r, 6000));
    //       await calculateAndDisplayRoute();

    //       return res.send({pois});
        
    //   }
      
    //   return await initMap();
      
      
    //   // find point of interersts for a request
    //    function findPOIS(request){
        
    //       return client
    //         .textSearch({
    //           params: request,
    //           timeout: 1000, // milliseconds
    //         })
    //         .then((r) => {
    //         //  console.log(r.data.results.length);
    //         //  pois=pois.concat(r.data.results)
    //           addPlaces(r.data.results)
    //           return ;
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //         });
        
    //   }
    //   // add placess to map
    //   function addPlaces(results) {
    //       for (var i = 0; i < results.length; i++) {
    //       var place = results[i];
    //       if(results[i].rating>=4.3){
    //         //  console.log(results[i])
    //         // pois.push(results[i])
    //         // console.log(results[i].name, results[i].rating, results[i].types)
      
      
    //         if(pois.length<=number_of_days*8){
    //           if(Math.random()>0.5) {
    //             // console.log(results[i].name)
    //             // createMarker(results[i])
    //             pois.push(place)
             
    //           };
    //         }    
    //       }
    //     } 
    //   }
      
     
      
      
      
        
    //   async function calculateAndDisplayRoute() {
    //     const waypts = [];
        
      
    //     for (let i = 0; i < pois.length; i++) {
    //         waypts.push(
    //            pois[i].geometry.location
    //         );
    //     }

    //     console.log(waypts)
    //     client
    //     .directions({params:{
    //         origin:{lat:6.927079,lng:79.857750},
    //         destination:{lat:6.927079,lng:79.857750},
    //         optimizeWaypoints: true,
    //         waypoints: waypts,
    //         travelMode: 'DRIVING',
    //         key: "AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY",
  
    //       }})
    //       .then((response) => {
    //         //   console.log(response.data.routes[0])
    //         // directionsRenderer.setDirections(response);
            
    //         const route = response.data.routes[0];
            
    //         let day1=[]
    //         let day2=[]
    //         let day3=[]
    //         let time=0
    //          for (let i = 0; i < route.legs.length-1; i++) {
    //         //   console.log(route.legs[i], pois[route.waypoint_order[i]].name, route.waypoint_order[i])
    //            time=time+route.legs[i].duration.value+3600
    //            if(time<32400) day1.push(route.waypoint_order[i])
    //            else if(time<64800) day2.push(route.waypoint_order[i])
    //            else if(time<97200)  day3.push(route.waypoint_order[i])
            
    //        }
    //        console.log(day1)
    //        console.log(day2)
    //        console.log(day3)
    //     //    console.log(pois[0])
    //       })
    //        .catch((e) =>{ console.log(e)
    //           // window.alert("Directions request failed due to " + e)
    //       });
    //   }
// }
module.exports=UserController