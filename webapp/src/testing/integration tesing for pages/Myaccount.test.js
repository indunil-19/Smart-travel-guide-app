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
import MyAccount from "../../screens/TravelPlanApp/myAccount";
import { createMemoryHistory } from 'history'

describe('my account page', () => {
    


    const server=setupServer(
        rest.post("/user/updateUser",(req,res,ctx)=>{
            return res(
                ctx.json({
                    _id:req.body._id,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    dob:req.body.dob,
                    country:req.body.country,
                    religion:req.body.religion,
                    email:req.body.email, 
                    pic:req.body.pic

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
        const tree = renderer.create(<MemoryRouter><TravelProvider><MyAccount/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><MyAccount  /></TravelProvider></MemoryRouter>,div)
    })

    it("should enable edit if edit button click",()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><MyAccount  /></TravelProvider></MemoryRouter>,div)
        waitFor(()=>{
            fireEvent.click(screen.getByTestId("edit"))
            waitFor(()=>{
                expect(screen.getByTestId("firstname")).toBeEnabled()
                expect(screen.getByTestId("lastname")).toBeEnabled()
                expect(screen.getByTestId("dob")).toBeEnabled()

                waitFor(()=>{
                    fireEvent.change(screen.getByTestId("firstname"),{target:{value:"indunil"}})
                    fireEvent.change(screen.getByTestId("lastname"),{target:{value:"udayngana"}})
                    fireEvent.change(screen.getByTestId("dob"),{target:{value:"1998/10/10"}})
                    fireEvent.change(screen.getByTestId("lastname"),{target:{value:"udayngana"}})
                    fireEvent.select(screen.getByTestId("religion"),{target:{value:"Buddhism"}})
                    fireEvent.select(screen.getByTestId("email"),{target:{value:"udayangana98@gmail.com"}})
                    fireEvent.click(screen.getByTestId("save"))
                })
            })
            
        })

    })


})
