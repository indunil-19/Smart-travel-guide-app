import React, { useContext, useState, useEffect } from "react"
import { switchPOI, addPoiToPlan1 } from "../../services/EditPlanServices"
import { useParams } from 'react-router'
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex, HStack ,VStack} from "@chakra-ui/layout"
import { GrAddCircle } from "react-icons/gr";
import { Button } from "@chakra-ui/button"
import { useHistory } from "react-router"

const SwitchPois=()=>{
    const {index,index1}=useParams()
    const history=useHistory()
    
    const [pois,setPois]=useState([])
    const [route,setRoute]=useState([])
    const {state, dispatch}=useContext(TravelContext)
    useEffect(() => {
        
        switchPOI(parseInt(index), parseInt(index1), state.travelPlan, state.allpois).then((res)=>{
            // console.log(res)
            setPois(res[0])
            setRoute(res[1])
        })
    }, [state])


    const addPoi=(poi, route)=>{
            addPoiToPlan1(index,index1,poi, route,state.travelPlan).then((res)=>{
                // console.log(res)
                dispatch({type:"set_travelPlan" , payload:{travelPlan:res}})
            });
    }

    return(
        <>
        <Flex flexDirection="column" alignItems="center">
        
        { 
         pois.map((Item, index)=>{
            return(
                <>
                <HStack m={3}>

                <Button colorScheme="black" variant="outline" onClick={()=>{
                                addPoi(Item, route[index]);
                                history.push("/travelPlan/editPlan")

                 }}>
                     <GrAddCircle />           
                </Button>



                <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity} photo={Item.photos ? Item.photos[0].photo_reference : "" } rating={Item.rating} place_id={Item.place_id}/>
                </HStack>
                </>
            )
        })
    }


        
        
        </Flex>
        </>
    )
}
export default SwitchPois