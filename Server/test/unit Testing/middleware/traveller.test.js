const ifTraveller=require("../../../middleware/ifTraveller")
let server;
describe('ifTraveller middleware', () => {
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

    it("shoud return next if session has a type traveller", async()=>{
        const req={
            session:{
                user:{type:"traveller"}
            }
        }
        await ifTraveller(req,res,next)
        expect(next).toHaveBeenCalled();
    })

    it("should return error if user has no session",async()=>{
        const req={
            session:{
                user:{}
            }
        }
        await ifTraveller(req,res,next)
        expect(res.json).toHaveBeenCalledWith({error:"you don't have permission"});
    })
})
