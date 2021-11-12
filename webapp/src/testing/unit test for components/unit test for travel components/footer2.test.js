import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import Footer2 from "../../../components/TravelPlanApp/Footer2";

describe('footer2 component test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><Footer2/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><Footer2  /></TravelProvider></MemoryRouter>,div)
       
       
    })
})
