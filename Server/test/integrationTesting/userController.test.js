const mongoose = require('mongoose')
const mongouri="mongodb+srv://dbUser:d61NVqHI6EhQKkFv@cluster0.3k6ej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// d61NVqHI6EhQKkFv dbUser
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo db")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('../../models/user')
require("../../models/TravelPlan")

const User = mongoose.model("User")


const UserController=require("../../controller/userController")



let server;
describe("user functionalities integration test", ()=>{
    const res={
        json:null
    }

    beforeEach(async()=>{
        server=require("../../app").server
        res.json=jest.fn();
    })

    afterEach(async()=>{
        res.json=null
        await server.close()
    })
    afterAll(async()=>{

    })

    describe("user update function ", ()=>{
        let req;
        let user;
        beforeEach(async()=>{
             user = new User({
                firstname:"testFirstName",
                lastname:"testLastName",
                dob:"1998/10/10",
                country:"SL",
                religion:"buddhist",
                email:"test@gmail.com",
                password:"testPassword",
                
            })
    
            await user.save()
            req={
                body:{
                    _id:user._id,
                    firstname:"editedFirstName",
                    lastname:"editedLastName",
                    dob:"1998/10/4",
                    country:"Ind",
                    religion:"editedCountry",
                    email:"editedmail@gmail.com",
                    pic:"testUrl",
                    password:"editdPassword"
                }
            }
        })
        afterEach(async()=>{
            await  User.findOneAndRemove({email:"editedmail@gmail.com"})
        })

        it("should update and return data if no error",async()=>{
            await UserController.updateUser(req,res)
            expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining( { 
            
       
             _id:user._id,
            firstname:"testFirstName",
            lastname:"testLastName",
            dob:"1998/10/10",
            country:"SL",
            religion:"buddhist",
            email:"test@gmail.com",
            password:"testPassword",
            pic:"https://res.cloudinary.com/dm36weewi/image/upload/v1630596425/5311083-middle_glqrak.png",
            
            
            })
            )
        })
        

    })

})