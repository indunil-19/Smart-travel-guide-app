import React, {useEffect,useState} from 'react';
import { ScrollView, View ,Image} from 'react-native';
import { Text , Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {Config} from '../config/config'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export const Province=({route})=>{

    const {pid}=route.params
    const [ima,setIma]=useState([])
    const [name, setName]=useState("")
    const [description, setDescription]=useState("")

    useEffect(()=>{
    
        fetch(`${Config.Localhost}/admin/getProvinceData/`+pid).
        then(res=>res.json())
        .then(data=>{
           console.log(data)
           setIma(data.images)
           setName(data.name)
           setDescription(data.description)
          
        }).catch(err=>{
            console.log(err)
        })
     
     },[pid])
    
    return(
      <ScrollView>
        <Card>
    <Card.Content>
      <Title>{name}</Title>
      <View>
      <ScrollView 
      horizontal={true}     
      >
      {ima.map((item,index)=>{
        return(
          <Image key={index} source={{uri:item}}  style={{width:200,height:200}}/>

        )
      })}
      

    </ScrollView>
    </View>


      <Paragraph>{description}</Paragraph>
    </Card.Content>
      
    </Card>

    
  </ScrollView>
    )
}