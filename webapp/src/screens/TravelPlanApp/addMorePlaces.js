import { useContext, useState, useEffect } from "react"
import { findPois, addPoiToPlan } from "../../services/EditPlanServices"
import { useParams } from 'react-router'
import { TravelContext } from "../../context/TravelContext"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { Flex, HStack ,VStack} from "@chakra-ui/layout"
import { GrAddCircle } from "react-icons/gr";
import { Button } from "@chakra-ui/button"
import { useHistory } from "react-router"
import { Tabs, TabList, TabPanels, Tab, TabPanel,Alert} from "@chakra-ui/react"
import { AlertIcon } from "@chakra-ui/alert"
import Autocomplete from "react-google-autocomplete";

export const AddMorePlaces=()=>{
    const history=useHistory()
    const {day}=useParams()
    const [pois,setPois]=useState([])
    const [route,setRoute]=useState([])
    const {state, dispatch}=useContext(TravelContext)
    const [place1,setPlace1]=useState({})


    const [poisCustom,setPoisCustom]=useState([])
    const [routeCustom,setRouteCustom]=useState([])


    useEffect(() => {
        findPois(day, state.travelPlan, state.allpois).then((res)=>{
            console.log(res)
            setPois(res[0])
            setRoute(res[1])
        })
    }, [state])


    const addPoi=(day,poi, route)=>{
            addPoiToPlan(day,poi, route,state.travelPlan).then((res)=>{
                // console.log(res)
                dispatch({type:"set_travelPlan" , payload:{travelPlan:res}})
            })
    }

    return(
        <>
        <Tabs isFitted variant="line"  >
        <TabList  position="fixed" width="full" zIndex="8" bg="white" p={2} >
            <Tab >Place sugests for you</Tab>
            <Tab>Find by your self</Tab>
        </TabList>


        <TabPanels >


        <TabPanel>
        <Flex flexDirection="column" alignItems="center">
        {
            pois.length==0 ? 
            <>
                <Alert status="warning" mt="100px">
                    <AlertIcon />
                    Seems there is no pois for suggests. 
                </Alert>
            
            </> :<></>
        }
        
        { 
         pois.map((Item, index)=>{
            return(
                <>
                <HStack m={3}>

                <Button colorScheme="black" variant="outline" onClick={()=>{
                                addPoi(day,Item, route[index]);
                                history.push("/travelPlan/editPlan")

                 }}>
                     <GrAddCircle />           
                </Button>



                <PlaceCard  index={index+1} name={Item.name} address={Item.vicinity?Item.vicinity : Item.formatted_address  } photo={Item.photos ? Item.photos[0].photo_reference : "" } rating={Item.rating} place_id={Item.place_id}/>
                </HStack>
                </>
            )
        })

    }



        
        
        </Flex>
        </TabPanel>


        <TabPanel>


        <Flex flexDirection="column" alignItems="center" p={10}>
                <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
                apiKey={"AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA"}

                onPlaceSelected={(place) => {
                if(place.geometry.location){
                    setPlace1(place)
                    findPois(day, state.travelPlan, [place]).then((res)=>{
                        // console.log(res)
                        setPoisCustom(res[0])
                        setRouteCustom(res[1])
                    })
                }
                }}

                options={{
                    types: ['geocode' , 'establishment'],
                    componentRestrictions: { country: "LK" },
                    fields:["ALL"]
                }}
                >
                </Autocomplete>


        </Flex>






        </TabPanel>



        </TabPanels>
        </Tabs>
        </>
    )
}