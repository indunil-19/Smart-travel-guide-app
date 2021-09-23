import React, { useEffect,useState , useContext} from "react"
import { getNearByHotels} from "../../services/ViewPOIServices"
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex } from "@chakra-ui/layout"

export const NearByHotels=()=>{
    const [data,setData]=useState([])
    const {state, dispatch}=useContext(TravelContext)
    

    useEffect( ()=>{
            getNearByHotels({lat:6.927079,lng:79.857750}).
            then((r)=>{
                setData(r)
                console.log(r)   
            }); 
            
        },[state.accomodation_location] )

  
    return(
        <>
        <Flex flexDirection="column" alignItems="center">
        
        { 
         data.map((Item, index)=>{
            return(
                <>
                
                <PlaceCard  index={index} name={Item.name} address={Item.vicinity} photo={Item.photos ? Item.photos[0].photo_reference : "" } rating={Item.rating} place_id={Item.place_id}/>
                
                </>
            )
        })
    }
        
        </Flex>
        </>
    )
}





