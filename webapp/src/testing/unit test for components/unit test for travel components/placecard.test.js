import React from "react"
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import { MemoryRouter,Router } from "react-router-dom";
import { TravelProvider } from "../../../context/TravelContext";
import "@testing-library/jest-dom/extend-expect";
import 'whatwg-fetch'
import { fireEvent, getByTestId, waitFor ,screen} from "@testing-library/dom";
import PlaceCard from "../../../components/TravelPlanApp/placeCard";
import { createMemoryHistory } from 'history'

describe('place card component test', () => {
    
    it("should match snapshot",  () => {
        const tree = renderer.create(<MemoryRouter><TravelProvider><PlaceCard photo="" index="1" name="" address="" types={[]} rating="5" place_id="123" /></TravelProvider></MemoryRouter>);
        expect(tree).toMatchSnapshot();
    });

    it("shoud render without crashing", ()=>{
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><TravelProvider><PlaceCard photo="" index="1" name="" address="" types={[]} rating="5" place_id="123" /></TravelProvider></MemoryRouter>,div)
        
       
    })
    it("should redirect to view poi page if see more button press",()=>{
        const history = createMemoryHistory();
        const div = document.createElement("div");
        ReactDOM.render(<MemoryRouter><Router history={history} ><TravelProvider><PlaceCard photo="" index="1" name="" address="" types={[]} rating="5" place_id="123" /></TravelProvider></Router></MemoryRouter>,div)

        
        waitFor(()=>{
            fireEvent.click(screen.getByTestId("button"))
            expect(history.location.pathname).toBe('/travelPlan/signin/123')
        })
    })
})
