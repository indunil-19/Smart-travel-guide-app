import React from "react"
import {render,screen, cleanup,waitFor,fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import { createMemoryHistory } from 'history'
import ChangePassword from "../../screens/TravelPlanApp/changePassword"

describe('change password page', () => {

    const server=setupServer(
        rest.post("/user/updatepassword",(req,res,ctx)=>{
            return res(
                ctx.json({
                    prevoiusPassowrd:"1234",
                    newPassword:"4567"
                    })
            )
        }),
    )
 
    beforeEach(()=>{      
    })
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    afterEach(cleanup)


    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><ChangePassword/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><ChangePassword  /></TravelProvider></MemoryRouter>,div)
    })

    it("should return to my account page if password change sucessfully",()=>{
        const history = createMemoryHistory();
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><Router history={history}><TravelProvider><ChangePassword  /></TravelProvider></Router></MemoryRouter>,div)
        waitFor(()=>{
            fireEvent.change(screen.getByTestId("previous"), {target:{value:"1234"}})
            fireEvent.change(screen.getByTestId("new"), {target:{value:"4567"}})
            fireEvent.click(screen.getByTestId("submit"))
            waitFor(()=>{
                expect(history.location.pathname).toBe("/travelPlan/myAcccount")

            })
            
        })
    })

    

})
