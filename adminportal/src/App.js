import logo from './logo.svg';
import './App.css';
import SignIn from './screens/login';
import TravelApp from './screens/landingPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Dashboard from './screens/dashboard';
import SignUp from './screens/Register';
import AdminList from './screens/adminList';
import { ChakraProvider } from "@chakra-ui/react"
import {TestPage} from "./screens/testPage"
import { Provinces } from './screens/Provinces';
import { ViewProvince } from './screens/viewProvince';
import {TravelPlanRoutes} from './screens/TravelPlanApp'
import { SharedPlan } from './screens/shredPlans';
import { AdminProvider } from './context/AdminContext';
import { TravelPlan } from './components/AdminComponents/TravelPlanView';
import { ViewPois } from './screens/TravelPlanApp/ViewPOI';
import { PublicPlans } from './screens/publicPlans';

function App() {

  
  return (
    <ChakraProvider>
    <div className="App">
      <BrowserRouter>
        <Switch>
          {/* <AdminProvider> */}
          <Route exact path="/">
            <TravelApp/>
          </Route>

          <Route path="/admin/signin">
              <SignIn/>
          </Route>

          <Route path="/admin/dashboard">
              <Dashboard/>
          </Route>

          <Route path="/admin/addAdmin">
              <SignUp/>
          </Route>

          <Route path="/admin/viewAdmins">
            <AdminList/>
          </Route>

          <Route path="/test">
            <TestPage/>
          </Route>

          <Route path="/admin/provinces">
            <Provinces/>
          </Route>

          <Route path="/admin/viewProvinces/:pid">
            <ViewProvince/>
          </Route>

         <Route path="/admin/sharedPlans">
            <SharedPlan />
         </Route>
         
         <Route path="/admin/viewMyTravelPlan">
            <TravelPlan />
         </Route>

         <Route path="/admin/viewpoi/:place_id">
            <ViewPois />
         </Route>

         <Route path="/admin/publicPlans">
            <PublicPlans />
         </Route>

         {/* </AdminProvider> */}

          <Route>
            <TravelPlanRoutes path="/travelPlan" />
          </Route>


          

          

        </Switch>
      </BrowserRouter>
    </div>
    </ChakraProvider>
    
  );
}


export default App;
