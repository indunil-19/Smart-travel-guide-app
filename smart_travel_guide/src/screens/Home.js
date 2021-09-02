import React ,{useContext} from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';


export function HomeScreen() {
  const {state, dispatch}=useContext(AppContext)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{state._id}</Text>
       
      </View>
    );
  }
  