import React from "react"
import {render,screen, cleanup,waitFor,fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import {Provinces,TableRow} from "../../screens/TravelPlanApp/provinces";
import { createMemoryHistory } from 'history'

describe('provinces page test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><Provinces/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><Provinces  /></TravelProvider></MemoryRouter>,div)

        expect(TableRow).toContain()
    })
})