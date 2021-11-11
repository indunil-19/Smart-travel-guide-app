import React from "react"
import {render,screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import SwitchPois from "../../screens/TravelPlanApp/switchPois";


describe('top rated plans page test', () => {
    
    beforeEach(()=>{      
    })
 
    afterEach(cleanup)

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><SwitchPois /></TravelProvider></MemoryRouter>,div)
        
    })


    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><SwitchPois/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });


     
})
