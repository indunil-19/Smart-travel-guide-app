import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import Carousal from "../../../components/TravelPlanApp/carousal";
import { getByTestId, waitFor } from "@testing-library/dom";
import PlanCard from "../../../components/TravelPlanApp/planCard,";

describe('plan card test', () => {
    
    // it("should match snapshot",  () => {
    //     const tree = renderer.create(<MemoryRouter><TravelProvider><PlanCard/></TravelProvider></MemoryRouter>);
    //     expect(tree).toMatchSnapshot();
    // });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><PlanCard /></TravelProvider></MemoryRouter>,div)
      
       
    })
})
