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
require('../../models/admin')
require('../../models/Province')
require('../../models/TravelPlan')

const Admin = mongoose.model("Admin")
const Province=mongoose.model("Province")


const AdminController=require("../../controller/adminController")

let server;
describe("admin controller functionalities integration test", ()=>{
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
            await  Admin.findOneAndRemove({email:"testemail@email.com"})
            req={
                body:{
                    firstname:"testFirstName",
                    lastname:"testLastName",
                    dob:"1998/10/10",
                    email:"testemail@email.com",
                    password:"testPassword"
                }
            }
        })
        it("should return success messsage if no error", async()=>{
            await AdminController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"Register successfully"})
            await  Admin.findOneAndRemove({email:"testemail@email.com"})
        })
        it("should return error if all inputs are not filled",async()=>{
            req.body.firstname=""
            await AdminController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"please add all the fields"})
        })
        it("shoud return error if user is already exits",async()=>{
            req.body.firstname="test@firstName"
            req.body.email="udayangana98@gmail.com"
            await AdminController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"user already exists with that email"})
        })
        it("should return error if input is wrong",async()=>{
            req.body.firstname={}
            await AdminController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        it("should return error if email is wrong",async()=>{
            req.body.email={}
            await AdminController.signup(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })

    })

    
    describe('login functionality', () => {
        let req;
        let admin;
        beforeEach(async()=>{
            await  Admin.findOneAndRemove({email:"testAdmin@email.com"})
            admin=new Admin({
                    firstname:"testFirstName",
                    lastname:"testLastName",
                    dob:"1998/10/10",
                    email:"testAdmin@email.com",
                    password:"testPassword"
            })
            await admin.save();
            req={
                body:{ 
                    email:"testAdmin@email.com",
                    password:"testPassword"
                }
            }
        })
        afterEach(async()=>{
            await  Admin.findOneAndRemove({email:"testAdmin@email.com"})
        })
        it("should return data and success message if no error",async()=>{
            await AdminController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"successfully signed in", data:expect.objectContaining({})})
        })
        it("should return error if all fields are not complteted",async()=>{
            req.body.email=""
            await AdminController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"please add email or password"})
        })
        it("should return error if password is incorrect",async()=>{
            req.body.email="testemail@email.com"
            req.body.password="1234"
            await AdminController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"Invalid Email or password",})
        })
        it("should return error if email is wrong",async()=>{
            req.body.email={}
            await AdminController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        it("should return error if password is wrong",async()=>{
            req.body.password={}
            await AdminController.login(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
        })
        
    })

    describe('view admins functionality', () => {
        let req={}
        it("should return list of admins if no error", async()=>{
            await AdminController.viewAdmins(req,res)
            expect(res.json).toHaveBeenCalledWith({admins:expect.objectContaining({})})
        })

    })

    describe('view admin functionality', () => {
        let req={
            params:{
                pid:"61195080842cff30a8d39f25"
            }
        }
        it("should return list of admins if no error", async()=>{
            await AdminController.viewAdmin(req,res)
            expect(res.json).toHaveBeenCalledWith({admins:expect.objectContaining({}), pid:"61195080842cff30a8d39f25"})
        })


    })
    describe('view user functionality', () => {
        let req={}
        it("should return list of users if no error", async()=>{
            await AdminController.viewUser(req,res)
            expect(res.json).toHaveBeenCalledWith({users:expect.objectContaining({})})
        })
    })

    describe('travel plan functionality', () => {
        let req={}
        it("should return list of travel plans if no error", async()=>{
            await AdminController.Travelplan(req,res)
            expect(res.json).toHaveBeenCalledWith({travelplan:expect.objectContaining({})})
        })
    })

    describe('add image function', () => {
        let req;

        beforeEach(async()=>{
            req={
                body:{
                    pid:"p1",
                    image:"testurl"
                }
            }
        })
        afterEach(async()=>{
            await Province.findOneAndUpdate({pid:"p1"},{$pull:{images:"testurl"}})
            
        })

        it("should return sucessmessage if no error", async()=>{
            await AdminController.addImgtoProvinceData(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"upload image successfully", result:expect.objectContaining({})})
        })

        it("should return error if error while uploading",async()=>{
            req.body.pid={}
            await AdminController.addImgtoProvinceData(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
             
        })


    })

    describe('get province data function', () => {
        let req;

        beforeEach(async()=>{
            req={
                body:{
                    pid:"p1",
                }
            }
        })
       

        it("should return sucess message if no error", async()=>{
            await AdminController.getProvinceData(req,res)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({}))
        })    

        it("should return error if error while updating",async()=>{
            req.body.pid={}
            await AdminController.getProvinceData(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
             
        })
    })


    describe('delete image function', () => {
        let req;

        beforeEach(async()=>{
            await Province.findOneAndUpdate({pid:"p1"},{$push:{images:"testurl"}})
            req={
                body:{
                    pid:"p1",
                    image:"testurl"
                }
            }
        })
        afterEach(async()=>{
            await Province.findOneAndUpdate({pid:"p1"},{$pull:{images:"testurl"}})
            
        })

        it("should return sucess message if no error", async()=>{
            await AdminController.deleteProvinceImage(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"delete image successfully", result:expect.objectContaining({})})
        })
        it("should return error if pid is invalid", async()=>{
            req.body.pid="p20"
            await AdminController.deleteProvinceImage(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"bad request"})
        })        

        it("should return error if error while deleting",async()=>{
            req.body.pid={}
            await AdminController.deleteProvinceImage(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
             
        })


    })


    describe('update description function', () => {
        let req;

        beforeEach(async()=>{
            req={
                body:{
                    pid:"p1",
                    description:"test description"
                }
            }
        })
       

        it("should return sucess message if no error", async()=>{
            await AdminController.descriptionUpdate(req,res)
            expect(res.json).toHaveBeenCalledWith({message:"update description successfully", result:expect.objectContaining({})})
        })
        it("should return error if pid is invalid", async()=>{
            req.body.pid="p20"
            await AdminController.descriptionUpdate(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"bad request"})
        })        

        it("should return error if error while updating",async()=>{
            req.body.pid={}
            await AdminController.descriptionUpdate(req,res)
            expect(res.json).toHaveBeenCalledWith({error:"system error"})
             
        })


    })
    
    






})