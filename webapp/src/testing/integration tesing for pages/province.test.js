import React from "react"
import {screen, cleanup,waitFor} from "@testing-library/react";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import {TravelProvider} from "../../context/TravelContext"
import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";
import 'whatwg-fetch'
import { Province } from "../../screens/TravelPlanApp/province";

describe('provinces page test', () => {
    let pid=""
    const server=setupServer(
        rest.post("/admin/getProvinceData/"+pid,(req,res,ctx)=>{
            return res(
                ctx.json({
                   name:"test province",
                   description:"test description"
                })
            )
        })
    )
    beforeEach(()=>{      
    })
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    afterEach(cleanup)

    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><Province pid="1" /></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><Province pid="1" /></TravelProvider></MemoryRouter>,div)

        waitFor(()=>{
            expect(screen.getByTestId("container")).toHaveTextContent("test province")
            expect(screen.getByTestId("container")).toHaveTextContent("test description")
        })
    })

    
})
