// import React from "react"
// import {screen, cleanup,waitFor} from "@testing-library/react";
// import renderer from "react-test-renderer";
// import ReactDOM from "react-dom";
// import { MemoryRouter } from "react-router-dom";
// import {TravelProvider} from "../../context/TravelContext"
// import "@testing-library/jest-dom/extend-expect";
// import ViewPois  from "../../screens/TravelPlanApp/ViewPOI"
// // import { PoiCard } from "../../components/TravelPlanApp/poicard";
// // import { NearByPlaceCard } from "../../components/TravelPlanApp/nearbyplace";

// describe('view poi page test', () => {
    
    
//     afterEach(cleanup)

//     it("should match snapshot",  () => {
//         const tree = renderer.create(<MemoryRouter><TravelProvider><ViewPois place_id=" ChIJZRPdHihY4joRRH3j8j-i36Y"/></TravelProvider></MemoryRouter>);
//         expect(tree).toMatchSnapshot();
//     });

//     it("shoud render without crashing", ()=>{
//         const div = document.createElement("div");
//         ReactDOM.render(<MemoryRouter><TravelProvider><ViewPois place_id=" ChIJZRPdHihY4joRRH3j8j-i36Y" /></TravelProvider></MemoryRouter>,div)

//         waitFor(()=>{
//             // expect(PoiCard).toContain()
            
//         })
//     })

//     it("should render nearby places if no errorr",()=>{
//         const div = document.createElement("div");
//         ReactDOM.render(<MemoryRouter><TravelProvider><ViewPois place_id=" ChIJZRPdHihY4joRRH3j8j-i36Y" /></TravelProvider></MemoryRouter>,div)

//         waitFor(()=>{
//             // expect(NearByPlaceCard).toContain()
            
//         })
//     })

    
// })
