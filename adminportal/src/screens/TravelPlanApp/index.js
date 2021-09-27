import { Route, Switch } from "react-router"
import NavBar from "../../components/TravelPlanApp/navbar"
import { Home } from "./Home"
import { TravelPlan } from "./TravelPlan"
import { UserPreferences } from "./userPreferences"
import { TravelProvider } from "../../context/TravelContext"
import { ViewPois } from "./ViewPOI"
import { NearByHotels } from "./nearbyhotels"
import { EditPlan } from "./editPlan"
import { AddMorePlaces } from "./addMorePlaces"
import { MyPlans } from "./Myplans"
import { ViewMyTravelPlan } from "./ViewMyTravelPlan"
import { PlanReview } from "./PlanReview"
import { MyAccount } from "./myAccount"
import { Footer2 } from "../../components/TravelPlanApp/Footer2"
import { Box } from "@chakra-ui/layout"
import { TopRatedPlans } from "./TopRatedPlans"
import { SignIn } from "./signIn"
import { SignUp } from "./signUp"
import { About } from "./about"
import { Contact } from "./contact"
import { Provinces } from "./provinces"

export const TravelPlanRoutes=()=>{
    return(
        <>
        <TravelProvider>
        <NavBar/>
        <Box minHeight="100vh" >
        <Switch >


            <Route path="/travelPlan/provinces">
                <Provinces />
            </Route>


            <Route path="/travelPlan/about">
                <About/>
            </Route>

            <Route path="/travelPlan/contact">
                <Contact/>
            </Route>

            <Route path="/travelPlan/signin">
                <SignIn/>
            </Route>
            <Route path="/travelPlan/signUp">
                <SignUp/>
            </Route>

            <Route path="/travelPlan/toprated">
                <TopRatedPlans/>
            </Route>
            <Route path="/travelPlan/myAccount">
                <MyAccount/>
            </Route>
            <Route path="/travelplan/review">
                <PlanReview/>
            </Route>
            <Route path="/travelPlan/viewMyTravelPlan">
                <ViewMyTravelPlan/>
            </Route>
            <Route path="/travelPlan/myplans" >
                <MyPlans/>
            </Route>

            <Route path="/travelPlan/addMorePlaces/:day">
                <AddMorePlaces/>
            </Route>

            <Route path="/travelPlan/editPlan" >
                <EditPlan/>
            </Route>

            <Route path="/travelPlan/nearbyhotels" >
                <NearByHotels/>
            </Route>

            <Route path="/travelPlan/viewpoi/:place_id" >
                <ViewPois/>
            </Route>

             <Route path="/travelPlan/userPreferences">
                <UserPreferences/>
            </Route>

            <Route path="/travelPlan/travelPlan">
                <TravelPlan/>
            </Route>

            <Route path="/travelPlan">
                <Home />
            </Route>
        </Switch>
        </Box>
        <Footer2/>
        </TravelProvider>
        </>
    )
}