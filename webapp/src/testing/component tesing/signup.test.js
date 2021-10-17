import React from "react"
import {render,fireEvent,screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import SignUp from "../../screens/TravelPlanApp/signUp"
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import { createMemoryHistory } from 'history'


describe('signup page test', () => {
    const server=setupServer(
        rest.post("/signup",(req,res,ctx)=>{
            if(!req.body.firstname || !req.body.lastname || ! req.body.dob ||!req.body.email ||!req.body.password ||! req.body.religion ){
                return res(
                ctx.json({
                    error:"signup error",
                })
            )}
            return res(
                ctx.json({
                    message:"sign up successs",
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
        ReactDOM.render(<MemoryRouter><TravelProvider><SignUp  /></TravelProvider></MemoryRouter>,div)
    })

    it("should signup correctly if no error",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><SignUp/></TravelProvider></Router></MemoryRouter>)   
           
        fireEvent.change(screen.getByPlaceholderText("first name"), {target:{value:"testname"}})
        fireEvent.change(screen.getByPlaceholderText("last name"), {target:{value:"testlastname"}})
        fireEvent.change(screen.getByPlaceholderText("Date of birth"), {target:{value:"1998-10-10"}})
        fireEvent.change(screen.getByTestId("religion"), {target:{value:"Buddhism"}})
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"testemail@gmail.com"}})
        fireEvent.change(screen.getByTestId("country"), {target:{value:"sl"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:"1234"}})
        fireEvent.click(screen.getByTestId("signUp"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            expect(history.location.pathname).toBe('/travelPlan/signin')
        })
        
    })

    it("should return error if email is invalid",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><SignUp/></TravelProvider></Router></MemoryRouter>)     
        fireEvent.change(screen.getByPlaceholderText("first name"), {target:{value:"testname"}})
        fireEvent.change(screen.getByPlaceholderText("last name"), {target:{value:"testlastname"}})
        fireEvent.change(screen.getByPlaceholderText("Date of birth"), {target:{value:"testlastname"}})
        fireEvent.change(screen.getByTestId("religion"), {target:{value:"buddhism"}})
        fireEvent.change(screen.getByTestId("country"), {target:{value:"sl"}})
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"invalidemail"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:"1234"}})
        fireEvent.click(screen.getByTestId("signUp"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            
        })
        
    })


    it("should return error if error in signup ",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><SignUp/></TravelProvider></Router></MemoryRouter>)   
           
        fireEvent.change(screen.getByPlaceholderText("first name"), {target:{value:"testname"}})
        fireEvent.change(screen.getByPlaceholderText("last name"), {target:{value:"testlastname"}})
        fireEvent.change(screen.getByPlaceholderText("Date of birth"), {target:{value:"testlastname"}})
        fireEvent.change(screen.getByTestId("religion"), {target:{value:"buddhism"}})
        fireEvent.change(screen.getByTestId("country"), {target:{value:"sl"}})
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"invalidemail"}})
        fireEvent.change(screen.getByPlaceholderText("password"), {target:{value:""}})
        fireEvent.click(screen.getByTestId("signUp"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            
        })
        
    })

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><SignUp/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });





})
