import React from "react"
import {render,screen, cleanup,waitFor, fireEvent} from "@testing-library/react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import UserPreferences from "../../screens/TravelPlanApp/userPreferences";
import { createMemoryHistory } from 'history'

describe('userpreferences page test', () => {
    
   
    afterEach(cleanup)

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><UserPreferences/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><UserPreferences /></TravelProvider></MemoryRouter>,div)
        
    })
    it("route correctly to next page if no error",async()=>{
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><UserPreferences/></TravelProvider></Router></MemoryRouter>)   
           
        fireEvent.click(screen.getByTestId("climate"))
        fireEvent.click(screen.getByTestId("province1"))
        fireEvent.click(screen.getByTestId("province2"))
        fireEvent.click(screen.getByTestId("province3"))
        fireEvent.change(screen.getByTestId("days"), {target:{value:"2"}})
        fireEvent.change(screen.getByTestId("religion"), {target:{value:"Buddhism"}})
        fireEvent.click(screen.getByTestId("placeslike1"))
        fireEvent.click(screen.getByTestId("placeslike2"))
        fireEvent.click(screen.getByTestId("placeslike3"))
        fireEvent.click(screen.getByTestId("thingslike1"))
        fireEvent.click(screen.getByTestId("thingslike2"))
        fireEvent.click(screen.getByTestId("thingslike3"))
        
        fireEvent.click(screen.getByTestId("submit")) 
        waitFor(()=>{
            expect(history.location.pathname).toBe('/travelPlan/travelPlan"')

        })  
        
  
    })

    it("shoud render aleart if select more than 3 places like", ()=>{
   
        const history = createMemoryHistory();
        render(<MemoryRouter><Router history={history}><TravelProvider><UserPreferences/></TravelProvider></Router></MemoryRouter>)   
        
        fireEvent.click(screen.getByTestId("placeslike1"))
        fireEvent.click(screen.getByTestId("placeslike2"))
        fireEvent.click(screen.getByTestId("placeslike3"))
        fireEvent.click(screen.getByTestId("placeslike4"))
        fireEvent.click(screen.getByTestId("next")) 
        waitFor(()=>{
            expect(screen.getByTestId("aleart")).toBeInTheDocument()
        })
    })

    

    

})
 