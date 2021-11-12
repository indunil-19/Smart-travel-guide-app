import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import Carousal from "../../../components/TravelPlanApp/carousal";
import { getByTestId, waitFor } from "@testing-library/dom";
import Footer from "../../../components/TravelPlanApp/Footer";

describe('footer component test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><Footer/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><Footer  /></TravelProvider></MemoryRouter>,div)
       
       
    })
})
