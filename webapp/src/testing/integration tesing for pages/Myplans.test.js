import React from "react"
import {render,screen, cleanup,waitFor,fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import MyPlans from "../../screens/TravelPlanApp/Myplans"
describe('home page test', () => {
    const server=setupServer(
        rest.get("/user/getTravelPlans",(req,res,ctx)=>{
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
        }),

        rest.post("/user/deleteTravelPlan",(req,res,ctx)=>{
            return res(
                ctx.json({
                    myPlans:[
                    {
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
        ReactDOM.render(<MemoryRouter><TravelProvider><MyPlans /></TravelProvider></MemoryRouter>,div)
        
    })

    it("shoud render plan card correctly",async()=>{
        const div = document.createElement("div");
        render(<MemoryRouter><TravelProvider><MyPlans /></TravelProvider></MemoryRouter>,div)

        waitFor(()=>{
            const planCard= screen.getByTestId("plans")
            expect(planCard).toHaveTextContent("plan1")

         })
    })
    it("should delete plan if delete icon click",()=>{
        const div = document.createElement("div");
        render(<MemoryRouter><TravelProvider><MyPlans /></TravelProvider></MemoryRouter>,div)

        waitFor(()=>{
            const planCard= screen.getByTestId("plans")
            expect(planCard).toHaveTextContent("plan1")
            expect(planCard).toHaveTextContent("plan2")
            const deleteButton=screen.getAllByTestId("deleteButton")
            fireEvent.click(deleteButton[0])
            waitFor(()=>{
                expect(screen.getByTestId("aleart")).toBeInTheDocument();
                fireEvent.click(screen.getByTestId("aleart"))
                waitFor(()=>{
                    const planCard1= screen.getByTestId("plans")
                    expect(planCard1).toHaveTextContent("plan2")
                })
            })

         })
    })

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><MyPlans/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });


     
})
