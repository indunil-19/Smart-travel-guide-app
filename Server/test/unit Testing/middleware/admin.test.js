const ifAdmin=require("../../../middleware/ifAdmin")
let server;
describe('ifAdmin middleware', () => {
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

    it("shoud return next if session has a type admin", async()=>{
        const req={
            session:{
                admin:{type:"admin"}
            }
        }
        await ifAdmin(req,res,next)
        expect(next).toHaveBeenCalled();
    })

    it("should return error if admin has no session",async()=>{
        const req={
            session:{
                admin:{}
            }
        }
        await ifAdmin(req,res,next)
        expect(res.json).toHaveBeenCalledWith({error:"you don't have permission"});
    })
})
