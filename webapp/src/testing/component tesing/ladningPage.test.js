import React from "react"
import {cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import TravelApp from "../../screens/landingPage"
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

describe('landing page testing', () => {
    afterEach(cleanup);

    it("should render without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render( <MemoryRouter><TravelApp /></MemoryRouter>,div);
    });
    
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelApp /></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });
})
