import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import NearByPlaceCard from "../../../components/TravelPlanApp/nearbyplace";
import { getByTestId, waitFor } from "@testing-library/dom";

describe('nearby place component test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><NearByPlaceCard/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><NearByPlaceCard  photo={["123"]} index={"1"} name={"example hotel"} address="example address"  types={[]} rating="5" /></TravelProvider></MemoryRouter>,div)
       waitFor(()=>{
           expect(getByTestId("card")).toHaveTextContent("example hotel")
       })
       
    })
})
