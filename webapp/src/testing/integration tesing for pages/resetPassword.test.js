import React from "react"
import {render,screen, cleanup,waitFor, fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import ResestPassword from "../../screens/TravelPlanApp/resestPassword";


describe('reset password plans page test', () => {
    const server=setupServer(
        rest.get("/reset-password",(req,res,ctx)=>{
            return res(
                ctx.json({
                   message:"check your email"
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
        ReactDOM.render(<MemoryRouter><TravelProvider><ResestPassword /></TravelProvider></MemoryRouter>,div)
        
    })

    it("shoud render reset page correctly",async()=>{
        const div = document.createElement("div");
        render(<MemoryRouter><TravelProvider><ResestPassword /></TravelProvider></MemoryRouter>,div)
        fireEvent.change(screen.getByPlaceholderText("email"), {target:{value:"udayangana1998@gmail.com"}})
        fireEvent.click(screen.getByTestId("submit"))
        await waitFor(()=>{
            const toasts=screen.getAllByRole("list")
            expect(toasts[2]).toBeInTheDocument();
            
        })
    })

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><ResestPassword/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });


     
})
