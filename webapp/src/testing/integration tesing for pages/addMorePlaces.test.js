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
import AddMorePlaces from "../../../src/screens/TravelPlanApp/addMorePlaces"

describe('add more places page', () => {
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><AddMorePlaces/></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><AddMorePlaces  /></TravelProvider></MemoryRouter>,div)
    })
    it("should render properly if tabs click",()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><AddMorePlaces  /></TravelProvider></MemoryRouter>,div)

        waitFor(()=>{
            fireEvent.click(screen.getByTestId("findPlaces"))
            expect(screen.getByTestId("placesfind")).toBeInTheDocument()
        })
    })

    
})
