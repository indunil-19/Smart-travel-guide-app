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
import {TravelPlan,Card, Route} from "../../screens/TravelPlanApp/TravelPlan";
import { createMemoryHistory } from 'history'


describe('travel plan page test', () => {
    const server=setupServer(
        rest.post("/user/saveTravelPlan",(req,res,ctx)=>{
            return res(
                ctx.json({
                    message:"sign up successs",
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
        const tree = renderer.create(<MemoryRouter><TravelProvider><TravelPlan/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><TravelPlan  /></TravelProvider></MemoryRouter>,div)
    })

    it("should redirect to my plan page if save successfully",()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><TravelPlan/></TravelProvider></Router></MemoryRouter>)   
        
        
        waitFor(()=>{
            fireEvent.click(screen.getByTestId("save"))
            const confirmButton=screen.getByTestId("confirm")
            expect(confirmButton).toBeInTheDocument();

            fireEvent.click(confirmButton)
            waitFor(()=>{
                expect(history.location.pathname).toBe('/travelPlan/myplans')
            })
            
        })


    })

    it("should redirect to edit page if edit button click",()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><TravelPlan/></TravelProvider></Router></MemoryRouter>)   
        
        
        waitFor(()=>{
            fireEvent.click(screen.getByTestId("edit"))
            waitFor(()=>{
                expect(history.location.pathname).toBe('/travelPlan/editPlans')
            })
            
        })


    })
    it("should render travelPlan if no error",()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><TravelPlan/></TravelProvider></Router></MemoryRouter>)   
        
        
        waitFor(()=>{
          expect(screen.getByTestId("travelPlan")).toContain(Card) 
          
        })
    })

    it("should render map if tab is click", ()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><TravelPlan/></TravelProvider></Router></MemoryRouter>)   
        
        
        waitFor(()=>{
            fireEvent.click(screen.getByTestId("maptab"))
            expect(Route).toBeInTheDocument() 
          
        })
    })
    
})
