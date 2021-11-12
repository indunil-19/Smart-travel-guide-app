import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import Review from "../../../components/TravelPlanApp/review";
import { waitFor ,screen} from "@testing-library/dom";

describe('review component test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><Review/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><Review author_name="indunil" author_url="example.com " profile_photo_url="exmple.jpg" relative_time_description="" text="" rating="5"  /></TravelProvider></MemoryRouter>,div)
        waitFor(()=>{
            expect(screen.getByTestId("review")).toHaveTextContent("indunil")
        })
       
    })
})
