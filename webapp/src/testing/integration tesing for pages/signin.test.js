import React from "react"
import {render,fireEvent,screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import SignIn from "../../screens/TravelPlanApp/signIn"
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import { createMemoryHistory } from 'history'

describe('signin page testing', () => {
    const server=setupServer(
        rest.post("/signin",(req,res,ctx)=>{
            return res(
                ctx.json({
                    message:"sign in successs",
                    user:{
                        _id:"5654545454545454"
                    }
                })
            )
        })
    )
    
    beforeEach(()=>{      
    })
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    afterEach(cleanup)

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><SignIn  /></TravelProvider></MemoryRouter>,div)
    })
    it("should login correctly if no error",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><SignIn/></TravelProvider></Router></MemoryRouter>)        
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"udayangana98@gmail.com"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:"1234"}})
        fireEvent.click(screen.getByTestId("signIn"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            expect(history.location.pathname).toBe('/travelPlan')
        })
        
    })

    it("shoud toast if error in login",async()=>{
        const server=setupServer(
            rest.post("/signin",(req,res,ctx)=>{
                if(!req.body.email || !req.body.password){
                    return res(
                        ctx.json({
                            error:"sign in error",
                        })
                    )}
                return res(
                    ctx.json({
                        error:"sign in error",
                    })
                )
            })
        )
        render(<MemoryRouter><TravelProvider><SignIn/></TravelProvider></MemoryRouter>)        
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"udayangana98@gmail.com"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:""}})
        fireEvent.click(screen.getByTestId("signIn"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            
        })
    })

    it("shoud toast if email is wrong",async()=>{
        
        render(<MemoryRouter><TravelProvider><SignIn/></TravelProvider></MemoryRouter>)        
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"wrongemail"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:""}})
        fireEvent.click(screen.getByTestId("signIn"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            
        })
    })

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><SignIn/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

})
