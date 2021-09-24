import React  from "react"
import { View ,Text} from "react-native"


export const Test=()=>{
    return(
        <>
        <View style={{flexDirection:"column", alignItems:"center"}}>

            <View style={{width:"40%", height:"25%", backgroundColor:"black", alignItems:"center", borderRadius:5,justifyContent:"center"}}> 

                <Text style={{color:"white", fontSize:20}}>Day 1
                </Text>
            </View>

       




        </View>
          
        
        
        
        </>
    )
}



















































// import  React, {useState} from 'react';
// import { WebView } from 'react-native-webview';
// import { StyleSheet, Text } from 'react-native';
// import Constants from 'expo-constants';

// export default function App() {
//   const [state,setState]=useState({})
//   const run = `
//        return document.getElementById("map")
//     `;

//     setTimeout(() => {
//       const x=this.webref.injectJavaScript(run);
//       setState(x)
//     }, 3000);



//   return (
//    <>
//    <WebView
//    ref={(r) => (this.webref = r)}
     
//       originWhitelist={['*']}
//       source={{ html: '<div id="map">df</div>' }}
//     />
   
//    <Text>{state}</Text>
   
//    </>
//   );
// }


