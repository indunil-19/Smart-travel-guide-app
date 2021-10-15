const ifUserNotLoggedIn=require("../../../middleware/ifUserNotLoggedIn")
let server;
describe('ifUserNotLoggedIn middleware', () => {
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

    it("shoud return next if user session exists", async()=>{
        const req={
            session:{
                user:{type:"traveller"}
            }
        }
        await ifUserNotLoggedIn(req,res,next)
        expect(next).toHaveBeenCalled();
    })

    it("should return error if user has no session",async()=>{
        const req={
            session:{
                
            }
        }
        await ifUserNotLoggedIn(req,res,next)
        expect(res.json).toHaveBeenCalledWith({error:"you are not logged in, please log in first"});
    })
})
