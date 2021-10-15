const ifAdminNotLoggedIn=require("../../../middleware/ifAdminNotLoggedIn")
let server;
describe('ifAdminNotLoggedIn middleware', () => {
    const res={
        json:null,

    }
    const next=jest.fn()

    beforeEach(async()=>{
        res.json=jest.fn();
        server=require("../../../app").server;
    })

    afterEach(async()=>{
       await server.close()
    })

    it("shoud return next if admin session exists", async()=>{
        const req={
            session:{
                admin:{type:"admin"}
            }
        }
        await ifAdminNotLoggedIn(req,res,next)
        expect(next).toHaveBeenCalled();
    })

    it("should return error if admin has no session",async()=>{
        const req={
            session:{
                
            }
        }
        await ifAdminNotLoggedIn(req,res,next)
        expect(res.json).toHaveBeenCalledWith({error:"you are not logged in, please log in first"});
    })
})
