import React ,{useContext} from 'react';
import { Text, View,Image  } from 'react-native';
import { Button } from 'react-native-paper';
import { AppContext } from '../context/AppContext';


export function HomeScreen(props) {
  const {state, dispatch}=useContext(AppContext)

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
           <Image source={{uri:"https://images.unsplash.com/photo-1460627390041-532a28402358?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"}}  style={{width:"100%",height:"40%"}}/>
            <View style={{ alignItems:"center",  padding:10, width:"100%", marginTop:30}}>
    
              <Button icon="" mode="contained" onPress={() => props.navigation.navigate("UserPreferences")} style={{width:"80%",margin:10, padding:5}}>
                 Find Your Travel Plan
              </Button>

              <Button icon="" mode="contained" onPress={() => console.log('Pressed')} style={{width:"60%",margin:10, padding:5}}>
                 Plan Your Trip
              </Button>

              <Button icon="" mode="contained" onPress={() => console.log('Pressed')} style={{width:"80%",margin:10,  padding:5}}>
                Top Rated Travel Plans
              </Button>
              {/* <Text style={{marginTop:-100}}>
              Despite being a relatively small island, Sri Lanka is endowed with a diverse collection of landscapes, climates and natural features. Sri Lanka’s infamous beaches have been enticing visitors for many years. However, the rest of the island harbours many more idyllic vistas.

The central highlands are carpeted with emerald tea plantations interspersed with occasional waterfalls. Cool climates, misty views, and quaint estate bungalows are a throwback to bygone eras.

The cultural triangle in the centre of the island holds a certain magic, with ruins from several ancient king
              </Text> */}

            </View>
      </View>
    );
  }
  