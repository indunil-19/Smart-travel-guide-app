import React from "react"
import {screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import TravelPlanRoutes from "../../screens/TravelPlanApp/index"


describe('view poi page test', () => {
    
    
    afterEach(cleanup)

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelPlanRoutes/></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelPlanRoutes /></MemoryRouter>,div)

        
    })

      
})
