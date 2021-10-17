import React from "react"
import {render,fireEvent,screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import { createMemoryHistory } from 'history'
import Home from "../../screens/TravelPlanApp/Home"


describe('home page test', () => {
    const server=setupServer(
        rest.get("/user/getPublicTravelPlans",(req,res,ctx)=>{
            
            return res(
                ctx.json({
                    myPlans:[{
                    createdAt: "2021-10-15T11:07:53.534Z",
                    travelPlan:[ [[],[]],
                     []],
                    },{
                        createdAt: "2021-10-15T11:07:53.534Z",
                        travelPlan:[ [[],[]],
                         []],
                    }]
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
        ReactDOM.render(<MemoryRouter><TravelProvider><Home /></TravelProvider></MemoryRouter>,div)
        
    })
    it("shoud render plan card correctly",async()=>{
        const div = document.createElement("div");
        const x=render(<MemoryRouter><TravelProvider><Home /></TravelProvider></MemoryRouter>,div)
        await waitFor(async()=>{
            const planCard=await x.getByTestId("abc")
            
            expect(planCard).toBeInTheDocument()

         })
        })


     
})
