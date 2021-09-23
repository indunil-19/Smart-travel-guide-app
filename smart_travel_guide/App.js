import  React , {useContext} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import { ProfileScreen } from './src/screens/profile';
import { HomeScreen } from './src/screens/Home';
import { FontAwesome } from '@expo/vector-icons';
import { UpdateProfile } from './src/screens/updateProfile';
import { AppProvider } from './src/context/AppContext';
import { UserPreferences } from './src/screens/UserPreferences';
import { Provinces } from './src/screens/Provinces';
import { TravelPlan } from './src/screens/TravelPlan';
import { Province } from './src/screens/province';

import { Test } from './src/screens/Test';






const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>

    
      <Stack.Screen name="test" component={Test} />
     {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> */}



    {/* <Stack.Screen name="Home" component={HomeScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity style={{}} onPress={()=>navigation.navigate("Profile")}>
                <FontAwesome name="user-circle-o" size={24} color="black" />
                </TouchableOpacity>
            ),
          })}
      />
    <Stack.Screen name="UserPreferences" component={UserPreferences} />  
       
        
        <Stack.Screen name="Profile" component={ProfileScreen} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity style={{}} onPress={()=>navigation.navigate("Profile")}>
                <FontAwesome name="sign-out" size={30} color="red"  />
                </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="updateProfile" component={UpdateProfile} /> 
        <Stack.Screen name="TravelPlan" component={TravelPlan} />
        <Stack.Screen name="Provinces" component={Provinces}  /> 
        <Stack.Screen name="Province" component={Province} /> */}


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ()=>{
  return(
    <AppProvider >
      <App/>
    </AppProvider>
  )
}

