import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native';



export function Provinces(props) {
    

    return (
    <ScrollView>

      <Province label="1" name="Northern Province" navigation={props.navigation} pid="p1"/>
      <Province label="2" name="North Western Province" navigation={props.navigation} pid="p2"/>
      <Province label="3" name="Western Province" navigation={props.navigation} pid="p3"/>
      <Province label="4" name="North Central Province" navigation={props.navigation} pid="p4"/>
      <Province label="5" name="Central Province" navigation={props.navigation} pid="p5"/>
      <Province label="6" name="Sabaragamuwa Province" navigation={props.navigation} pid="p6"/>
      <Province label="7" name="Eastern Province" navigation={props.navigation} pid="p7"/>
      <Province label="8" name="Uva Province" navigation={props.navigation} pid="p8"/>
      <Province label="9" name="Southern Province" navigation={props.navigation} pid="p9"/>
  
  </ScrollView>
    );
  }
 const Province=({label,name,navigation, pid})=>{
  const LeftContent = props =>  <Avatar.Text size={40} label={label} />
   return(
     <>
     <TouchableOpacity onPress={()=>navigation.navigate("Province", {pid:pid})}>
     <Card style={{margin:5}}>
    <Card.Title title={name}  left={LeftContent}  />
     </Card>
    </TouchableOpacity>
     
     </>
   )
 }

