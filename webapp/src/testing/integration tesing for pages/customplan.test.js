import React from "react"
import {cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import { CustomPlanInner ,CustomPlan} from "../../screens/TravelPlanApp/customPlan";


describe('custom plan page test', () => {
    
    afterEach(cleanup)

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><CustomPlan/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><CustomPlan  /></TravelProvider></MemoryRouter>,div)
    })

   
    
})
