import logo from './logo.svg';
import './App.css';
import SignIn from './screens/login';
import TravelApp from './screens/landingPage';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Dashboard from './screens/dashboard';
import SignUp from './screens/Register';
import AdminList from './screens/adminList';
import { ChakraProvider } from "@chakra-ui/react"
import {TestPage} from "./screens/testPage";
import NavBar from './components/navbar';
import { Provinces } from './screens/Provinces';
import { ViewProvince } from './screens/viewProvince';
import {TravelPlanRoutes} from './screens/TravelPlanApp';
import Editquestions from './screens/Editquestions';
import Viewuserlist from './screens/Viewuserlist';
import ViewAdmin from './screens/ViewAdmin';
import Travelplanlist from './screens/Travelplanlist';
import ViewUser from './screens/ViewUser'
import Generatereports  from './screens/Generatereports'
function App() {
  const history = useHistory()
  return (
    <ChakraProvider>
    <div className="App">
      <BrowserRouter>
      
        <Switch>
          <Route exact path="/">
            <TravelApp/>
          </Route>
          
          <Route path="/admin/signin">
              <SignIn/>
          </Route>
          <NavBar>
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
          </NavBar>
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
const g=()=>{
  <Route>
            <TravelPlanRoutes path="/travelPlan" />
          </Route>
}