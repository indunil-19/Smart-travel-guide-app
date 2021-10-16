import TravelApp from './screens/landingPage';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import {TravelPlanRoutes} from './screens/TravelPlanApp'
import { Adminroutes } from './screens/AdminPortal/Adminroutes';

function App() {  
  return (
    <ChakraProvider>
    <div className="App">
      <BrowserRouter>
      
        <Switch>
    
          <Route exact path="/">
            <TravelApp/>
          </Route>
          
          <Route path="/travelPlan">
            <TravelPlanRoutes  />
          </Route>

          <Route path="/admin">
            <Adminroutes  />
          </Route>
          
        </Switch>
        
      </BrowserRouter>
    
    </div>
    </ChakraProvider>
    
  );
}


export default App;

