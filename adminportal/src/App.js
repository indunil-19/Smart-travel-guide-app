import logo from './logo.svg';
import './App.css';
import SignIn from './screens/login';
import TravelApp from './screens/landingPage';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Dashboard from './screens/dashboard';
import SignUp from './screens/Register';
import AdminList from './screens/adminList';

function App() {
  const history = useHistory()
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
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

        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
