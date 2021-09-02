import React ,{useContext} from 'react';
import { Text, View  } from 'react-native';
import { Avatar, Title,Headline, Button } from 'react-native-paper';
import { AppContext } from '../context/AppContext';
export function ProfileScreen(props) {

    const {state, dispatch}=useContext(AppContext)


  // const data1={_id:"6117e0470bc409058c9748fd",
  //              firstname:"indunil",
  //              lastname:"udayangana",
  //              email:"udayangana98@gmail.com",
  //              dob:"1998/10/10",
  //              country:"SL",
  //              religion:"buddhist",
  //           }
  // dispatch({type:"USER",payload:data1})
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop:20}}>
          <Avatar.Image size={150} source={{uri:state.pic}} />
          <View style={{flexDirection:"row", marginTop:25}}>
            <Headline>First Name : </Headline><Title>{state.firstname}</Title>   
          </View>

          <View style={{flexDirection:"row"}}>
            <Headline>Last Name : </Headline><Title>{state.lastname}</Title>   
          </View>

          <View style={{flexDirection:"row"}}>
            <Headline>Email : </Headline><Title>{state.email}</Title>   
          </View>

          <View style={{flexDirection:"row"}}>
            <Headline>DOB : </Headline><Title>{state.dob}</Title>   
          </View>

          <View style={{flexDirection:"row"}}>
            <Headline>Country : </Headline><Title>{state.country}</Title>   
          </View>

          <View style={{flexDirection:"row"}}>
            <Headline>Religion : </Headline><Title>{state.religion}</Title>   
          </View>

          <View style={{flexDirection:"row", marginBottom:20}}>
            <Headline>Password : </Headline><Title>*******</Title>   
          </View>

          <Button icon="update" mode="contained"  onPress={() => props.navigation.navigate("updateProfile")}>
               edit
        </Button>
      </View>
    );
  }
  