import { Route, Switch } from "react-router";
import NavBar from "../../components/TravelPlanApp/navbar";
import { Home } from "./Home";
import { TravelPlan } from "./TravelPlan";
import { UserPreferences } from "./userPreferences";
import { TravelProvider } from "../../context/TravelContext";
import { ViewPois } from "./ViewPOI";
import { NearByHotels } from "./nearbyhotels";
import { EditPlan } from "./editPlan";
import { AddMorePlaces } from "./addMorePlaces";
import { MyPlans } from "./Myplans";

export const TravelPlanRoutes = () => {
  return (
    <>
      <TravelProvider>
        <NavBar />
        <Switch>
          <Route path="/travelPlan/myplans">
            <MyPlans />
          </Route>

          <Route path="/travelPlan/addMorePlaces">
            <AddMorePlaces />
          </Route>

          <Route path="/travelPlan/editPlan">
            <EditPlan />
          </Route>

          <Route path="/travelPlan/nearbyhotels">
            <NearByHotels />
          </Route>

          <Route path="/travelPlan/viewpoi/:place_id">
            <ViewPois />
          </Route>

          <Route path="/travelPlan/userPreferences">
            <UserPreferences />
          </Route>

          <Route path="/travelPlan/travelPlan">
            <TravelPlan />
          </Route>

          <Route path="/travelPlan">
            <Home />
          </Route>
        </Switch>
      </TravelProvider>
    </>
  );
};
