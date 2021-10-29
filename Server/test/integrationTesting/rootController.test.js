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

const User = mongoose.model("User")


const RootController=require("../../controller/rootController")

let server;
describe("root controller functionalities integration test", ()=>{
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
        mongoose.connection.close(function(){})
    })

    describe('signup functionality', () => {
        let req;
        beforeEach(async()=>{
            await  User.findOneAndRemove({email:"testemail@email.com"})
            req={
                body:{
                    firstname:"testFirstName",
                    lastname:"testLastName",
                    dob:"1998/10/10",
                    country:"testCountry",
                    religion:"testReligion",
                    email:"testemail@email.com",
                    password:"testPassword"
                }
            }
        })
        it("should return success messsage if no error", async()=>{
            await RootController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"Register successfully"})
            await  User.findOneAndRemove({email:"testemail@email.com"})
        })
        it("should return error if all inputs are not filled",async()=>{
            req.body.firstname=""
            await RootController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"please add all the fields"})
        })
        it("shoud return error if user is already exits",async()=>{
            req.body.firstname="test@firstName"
            req.body.email="udayangana98@gmail.com"
            await RootController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"user already exists with that email"})
        })
        it("should return error if input is wrong",async()=>{
            req.body.firstname={}
            await RootController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        it("should return error if email is wrong",async()=>{
            req.body.email={}
            await RootController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })

    })

    describe('login functionality', () => {
        let req;
        let user;
        beforeEach(async()=>{
            await  User.findOneAndRemove({email:"testemail123@email.com"})
            user=new User({
                    firstname:"testFirstName",
                    lastname:"testLastName",
                    dob:"1998/10/10",
                    country:"testCountry",
                    religion:"testReligion",
                    email:"testemail123@email.com",
                    password:"testPassword"
            })
            await user.save();
            req={
                body:{ 
                    email:"testemail123@email.com",
                    password:"testPassword"
                }
            }
        })
        afterEach(async()=>{
            await  User.findOneAndRemove({email:"testemail123@email.com"})
        })
        it("should return data and success message if no error",async()=>{
            await RootController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"successfully signed in", user:expect.objectContaining({})})
        })
        it("should return error if all fields are not complteted",async()=>{
            req.body.email=""
            await RootController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"please add email or password"})
        })
        it("should return error if password is incorrect",async()=>{
            req.body.email="testemail@email.com"
            req.body.password="1234"
            await RootController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"Invalid Email or password",})
        })
        it("should return error if email is wrong",async()=>{
            req.body.email={}
            await RootController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        it("should return error if password is wrong",async()=>{
            req.body.password={}
            await RootController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        


    })

    describe('logout functionality', () => {
        let req;
        beforeEach(async()=>{
            req={
                session:{
                    user:{_id:"6130fec5f7e9e71fc487f211"},
                    destroy:jest.fn()
                }
            }
        })
        it("shoud return successfull massage if no error",async()=>{
            await RootController.logout(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"signout successfully"})
        })
    })
    
    



})