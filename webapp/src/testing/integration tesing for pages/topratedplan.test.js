import React from "react"
import {render,screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import TopRatedPlans from "../../screens/TravelPlanApp/TopRatedPlans";


describe('top rated plans page test', () => {
    const server=setupServer(
        rest.get("/user/getPublicTravelPlans",(req,res,ctx)=>{
            return res(
                ctx.json({
                    myPlans:[
                        {
                    name:"plan1",
                    createdAt: "2021-10-15T11:07:53.534Z",
                    travelPlan:[ [[],[]],
                     []],
                    },{
                    name:"plan2",
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
        ReactDOM.render(<MemoryRouter><TravelProvider><TopRatedPlans /></TravelProvider></MemoryRouter>,div)
        
    })

    it("shoud render plan card correctly",async()=>{
        const div = document.createElement("div");
        render(<MemoryRouter><TravelProvider><TopRatedPlans /></TravelProvider></MemoryRouter>,div)

        waitFor(()=>{
            const planCard= screen.getByTestId("tplans")
            expect(planCard).toHaveTextContent("plan1")

         })
    })

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><TopRatedPlans/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });


     
})
