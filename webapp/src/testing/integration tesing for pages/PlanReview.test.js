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
import PlanReview from "../../screens/TravelPlanApp/PlanReview";
import { createMemoryHistory } from 'history'

describe('planReview page test', () => {
    const server=setupServer(
        rest.get("/user/getReview",(req,res,ctx)=>{
            return res(
                ctx.json({
                        rate:5,
                        review:"nice plan"
                        })
            )
        }),
        rest.post("/user/addReview",(req,res,ctx)=>{
            return res(
                ctx.json({
                        rate:req.body.rate,
                        review:req.body.review
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

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><PlanReview/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><PlanReview  /></TravelProvider></MemoryRouter>,div)
    })

    it("should render review and rate if no error",()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><PlanReview/></TravelProvider></Router></MemoryRouter>)    
        waitFor(()=>{
            expect(screen.getByTestId("review")).toHaveTextContent("nice plan")
            expect(screen.getByTestId("rate")).toHaveLength(5)
            
        })
    })
    it("should add review if submit click", ()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><s/></TravelProvider></Router></MemoryRouter>) 

        
        waitFor(()=>{
            fireEvent.change(screen.getByTestId("review"), {target:{value:"test review"}})
            fireEvent.change(screen.getByTestId("rate"), {target:{value:4}})
            fireEvent.click(screen.getByTestId("submit"))
            waitFor(()=>{
                expect(screen.getByTestId("review")).toHaveTextContent("test review")
                expect(screen.getByTestId("rate")).toHaveLength(4)
            })
            
        })
    })


})
