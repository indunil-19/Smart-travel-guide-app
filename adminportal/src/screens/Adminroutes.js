import SignIn from './login';
import TravelApp from './landingPage';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Dashboard from './dashboard';
import SignUp from './Register';
import AdminList from './adminList';
import { ChakraProvider } from "@chakra-ui/react"
import {TestPage} from "./testPage";
import { Provinces } from './/Provinces';
import { ViewProvince } from './viewProvince';
//import {TravelPlanRoutes} from './screens/TravelPlanApp';
import Editquestions from './Editquestions';
import Viewuserlist from './Viewuserlist';
import ViewAdmin from './ViewAdmin';
import Travelplanlist from './Travelplanlist';
//import { Admincontext } from '../context/AdminContext';
import NavBar from '../components/navbar';
//import { AdminProvider } from '../context/AdminContext';
import ViewUser from './ViewUser';
import Generatereports from './Generatereports';
export const Adminroutes=()=>{
    return(
        <>
        <AdminProvider>
        
        <NavBar>
        <Switch >
            


          <Route path="/admin/dashboard">
              <Dashboard/>
          </Route>

          <Route path="/admin/addAdmin">
              <SignUp/>
          </Route>
          <Route path="/admin/ViewTravelplanlist">
              <Travelplanlist/>
          </Route>

          <Route path="/admin/viewAdmins">
            <AdminList/>
          </Route>
          <Route path="/admin/genarate">
            <Generatereports/>
          </Route>
          <Route path="/admin/user/viewSingleuser">
            <ViewAdmin/>
          </Route>
          <Route path="/admin/editquestions">
            <Editquestions/>
          </Route>
          <Route path="/admin/viewAdmin/:pid">
            <ViewAdmin/>
          </Route>
          <Route path="/admin/viewUser/:pid">
            <ViewUser/>
          </Route>

          <Route path="/test">
            <TestPage/>
          </Route>

          <Route path="/admin/provinces">
            <Provinces/>
          </Route>
          <Route path="/admin/Viewuserlist">
            <Viewuserlist/>
          </Route>

          <Route path="/admin/viewProvinces/:pid">
            <ViewProvince/>
          </Route>
        </Switch>
        </NavBar>
        
        </AdminProvider>
        </>
    )
}