// const mongoose = require('mongoose')
// const mongouri="mongodb+srv://dbUser:d61NVqHI6EhQKkFv@cluster0.3k6ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// // d61NVqHI6EhQKkFv dbUser
// mongoose.connect(mongouri,{
//     useNewUrlParser:true,
//     useUnifiedTopology: true

// })
// mongoose.connection.on('connected',()=>{
//     console.log("conneted to mongo db")
// })
// mongoose.connection.on('error',(err)=>{
//     console.log("err connecting",err)
// })

// require('../../models/user')
// require("../../models/TravelPlan")

// const User = mongoose.model("User")
// const TravelPlan=mongoose.model("TravelPlan")


// const UserController=require("../../controller/userController")



// let server;
// describe("user functionalities integration test", ()=>{
//     const res={
//         json:null
//     }

//     beforeEach(async()=>{
//         server=require("../../app").server
//         res.json=jest.fn();
//     })

//     afterEach(async()=>{
//         res.json=null
//         await server.close()
//     })
//     afterAll(async()=>{
//         mongoose.connection.close(function(){})
//     })

//     describe("user update function ", ()=>{
//         let req;
//         let user;
//         beforeEach(async()=>{
//              user = new User({
//                 firstname:"testFirstName",
//                 lastname:"testLastName",
//                 dob:"1998/10/10",
//                 country:"SL",
//                 religion:"buddhist",
//                 email:"test@gmail.com",
//                 password:"testPassword",
                
//             })
    
//             await user.save()
//             req={
//                 body:{
//                     _id:user._id,
//                     firstname:"editedFirstName",
//                     lastname:"editedLastName",
//                     dob:"1998/10/4",
//                     country:"Ind",
//                     religion:"editedCountry",
//                     email:"editedmail@gmail.com",
//                     pic:"testUrl",
//                     password:"editdPassword"
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  User.findOneAndRemove({email:"editedmail@gmail.com"})
//         })

//         it("should update and return data if no error",async()=>{
//             await UserController.updateUser(req,res)
//             expect(res.json).toHaveBeenCalledWith(
//             expect.objectContaining( { 
            
//                 _id:user._id,
//                 firstname:"editedFirstName",
//                 lastname:"editedLastName",
//                 dob:"1998/10/4",
//                 country:"Ind",
//                 religion:"editedCountry",
//                 email:"editedmail@gmail.com",
//                 pic:"testUrl",
//                 password:"editdPassword"
            
            
//             })
//             )
//         })

//         it("should return error if email is alredy registered", async()=>{
//             req.body.email="udayangana98@gmail.com"
//             await UserController.updateUser(req,res)
//             expect(res.json).toHaveBeenCalledWith({error:"user already exists with that email"})
//         })

//         it("should return error if user id is not valid",async()=>{
//             req.body._id=null
//             await UserController.updateUser(req,res)
//             expect(res.json).toHaveBeenCalledWith({error:"update fail"})
//         })

//         it("should return error if email is wrong",async()=>{
//             req.body.email={}
//             await UserController.updateUser(req,res)
//             expect(res.json).toHaveBeenCalledWith({"error": "system error",})
//         })

//         it("should return error if _id is wrong",async()=>{
//             req.body._id={}
//             await UserController.updateUser(req,res)
//             expect(res.json).toHaveBeenCalledWith({"error": "system error",})
//         })

        
        

//     })

//     describe("user share travel plan function", ()=>{
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     travelPlan:[[[]],[]]
//                 }
//             }
//         })
//         it("should return m=success mesaage if plan is saved successfully",async()=>{
//             await UserController.saveTravelPlan(req,res)
        
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//                 message:"your plan is saved sucessfully"
//             }))
//         })
//         it("should return error if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.saveTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//                 "error": "system error"
//             }))
//         })

//     })
//     describe("user get his/her tavel plans function ",()=>{
//         let req;
//         beforeEach(async()=>{
//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//             }
//         })

//         it("should return myplans if no error",async()=>{
//             await UserController.getTravelPlans(req,res)
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({myPlans:expect.arrayContaining([])}))
//         })

//         it("should return error if user is not logged in",async()=>{
//             req.session.user._id={}
//             await UserController.getTravelPlans(req,res)
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:"system error"}))
//         })

//     })

//     describe("update travel plan function",()=>{
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211"

//             })
//            await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     travelPlan:[[[]],[]],
//                     planId:travelPlan._id
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })


//         it("should return updated data if no error",async()=>{
//             await UserController.updateTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith({data:expect.objectContaining({})})
//         })
//         it("should return error  if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.updateTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:"you can't update this plan"}))
//         })

//         it("should return error  if _id is invalid",async()=>{
//             req.body.planId={}
//             await UserController.updateTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:"system error"}))
//         })



//     })

//     describe("delete travel plan function",()=>{
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211"

//             })
//            await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     planId:travelPlan._id
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })

//         it("should return data if no error",async()=>{
//             await UserController.deleteTravelPlan(req,res);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({"data":expect.objectContaining({})}))
//         })

//         it("should return error if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.deleteTravelPlan(req,res);
//             expect(res.json).toHaveBeenCalledWith({error:"you can't delete this"})
//         })

//         it("should return error if id is invalid",async()=>{
//             req.body.planId={}
//             await UserController.deleteTravelPlan(req,res);
//             expect(res.json).toHaveBeenCalledWith({error:"system error"})
//         })
        
        
//     })


//     describe("add review functionality",()=>{
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211"

//             })
//            await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     planId:travelPlan._id,
//                     rate:1,
//                     review:"nice"
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })

//         it("should return data if no error",async()=>{
//             await UserController.addReview(req,res);
//             expect(res.json).toHaveBeenCalledWith({"data":expect.objectContaining({})})
//         })
//         it("should return error if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.addReview(req,res);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:"you can't review for this"}))
//         })
//         it("should return error if input invalid data",async()=>{
//             req.body.rate={}
//             await UserController.addReview(req,res);
//             expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error:"system error"}))
//         })


//     })



//     describe("get reviews function",()=>{
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211",
//                 rate:1,
//                 review:"nice"
//             })
//            await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     planId:travelPlan._id,
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })

//         it("should return data if no error",async()=>{
//             await UserController.getReviews(req,res);
//             expect(res.json).toHaveBeenCalledWith({"data":expect.objectContaining({})})
//         })
//         it("should return error if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.getReviews(req,res);
//             expect(res.json).toHaveBeenCalledWith({error:"something went wrong"})
//         })
//         it("should return error if invalid input",async()=>{
//             req.body.planId={}
//             await UserController.getReviews(req,res);
//             expect(res.json).toHaveBeenCalledWith({error:"system error"})
//         })

//     })


//     describe('share plan functionality', () => {
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211",
//                 rate:1,
//                 review:"nice"
//             })
//             await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 },
//                 body:{
//                     planId:travelPlan._id,
//                 }
//             }
//         })

//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })

//         it("should return result if no error",async()=>{
//             await UserController.shareTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith({result: expect.objectContaining({})})
//         })
//         it("should return error if user not logged in",async()=>{
//             req.session.user._id=null
//             await UserController.shareTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith({error:"something went wrong"})
//         })
//         it("should return error if wrong input",async()=>{
//             req.body.planId={}
//             await UserController.shareTravelPlan(req,res)
//             expect(res.json).toHaveBeenCalledWith({error:"system error"})
//         })

//     })

//     describe('getPublic plans function', () => {
//         let req;
//         let travelPlan;
//         beforeEach(async()=>{
            
//             travelPlan=new TravelPlan({
//                 travelPlan:[[[]],[]],
//                 ownedBy:"6130fec5f7e9e71fc487f211",
//                 rate:1,
//                 review:"nice",
//                 public:true
//             })
//             await travelPlan.save(); 

//             req={
//                 session:{
//                     user:{_id:"6130fec5f7e9e71fc487f211"}
//                 }
//             }
//         })
//         afterEach(async()=>{
//             await  TravelPlan.findOneAndRemove({_id:travelPlan._id})
//         })

//         it("should return travel plans if no error", async()=>{
//             await UserController.getPublicPlans(req,res)
//             expect(res.json).toHaveBeenCalledWith({myPlans:expect.objectContaining({})})
//         })
        
//     })
    
    




    


// })