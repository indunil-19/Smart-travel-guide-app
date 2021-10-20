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
import { ViewMyTravelPlan } from "../../screens/TravelPlanApp/ViewMyTravelPlan";
import { createMemoryHistory } from 'history'

describe('viewPlan page test', () => {
    beforeEach(()=>{      
    })
    
    afterEach(cleanup)

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><ViewMyTravelPlan/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><ViewMyTravelPlan/></TravelProvider></MemoryRouter>,div)
    })
    it("should redirect to review page  if  button click",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><ViewMyTravelPlan/></TravelProvider></Router></MemoryRouter>)        
        
        fireEvent.click(screen.getByTestId("submit"))
        await waitFor(()=>{
            
            expect(history.location.pathname).toBe('/travelPlan/review')
        })
        
    })

})
