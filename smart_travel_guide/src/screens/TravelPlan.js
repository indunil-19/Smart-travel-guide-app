import React, { useContext, useState ,useEffect} from "react"
import { Text} from "react-native-paper"
import { AppContext } from "../context/AppContext"
import { getTravelPlan } from "../services/TravelPlanService"



export function TravelPlan(){
    const {state, dispatch}=useContext(AppContext)
    const [plan,setPlan]=useState([])
  
       useEffect( ()=>{  
         console.log(state)       
        getTravelPlan(state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike).then((r)=>{
        //  console.log(r)
         setPlan(r)
       }) } ,[state] )
     
    return (
      <>
     {plan.map((Item, index)=>{
       return (
        <Text key={index}>{Item.name}</Text>
       )
     })}
      
      
      </>
        
    )
}


