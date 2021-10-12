import SignIn from './login';
import {Route,Switch,} from 'react-router-dom'
import Dashboard from './dashboard';
import SignUp from './Register';
import AdminList from './adminList';
import {TestPage} from "./testPage";
import { Provinces } from './/Provinces';
import { ViewProvince } from './viewProvince';
import Editquestions from './Editquestions';
import Viewuserlist from './Viewuserlist';
import ViewAdmin from './ViewAdmin';
import Travelplanlist from './Travelplanlist';
import NavBar from '../../components/navbar';
import { AdminProvider } from '../../context/AdminContext';
import ViewUser from './ViewUser';
import Generatereports from './Generatereports';
import { SharedPlan } from './shredPlans';
import { TravelPlan } from '../../components/AdminComponents/TravelPlanView';
import { ViewPois } from '../TravelPlanApp/ViewPOI';
import { PublicPlans } from './publicPlans';

export const Adminroutes=()=>{
    return(
        <>
        <AdminProvider>
        
        <NavBar>
        <Switch >
          
          <Route path="/admin/signin">
              <SignIn/>
          </Route>
          
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


        </Switch>
        </NavBar>   
        </AdminProvider>
        </>
    )
}