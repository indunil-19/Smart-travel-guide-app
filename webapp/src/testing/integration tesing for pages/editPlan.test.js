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
import { createMemoryHistory } from 'history'
import { EditPlan,Card } from "../../screens/TravelPlanApp/editPlan";


describe('edit plan page', () => {
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><EditPlan/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><EditPlan  /></TravelProvider></MemoryRouter>,div)
    })

    

})
