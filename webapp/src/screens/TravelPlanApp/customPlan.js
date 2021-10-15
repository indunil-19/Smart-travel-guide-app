import { Flex,VStack,HStack,Text,} from '@chakra-ui/layout';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import {useState,useEffect,useContext,useRef} from "react";
import Autocomplete from "react-google-autocomplete";
import { useHistory } from "react-router"
import { TravelContext } from "../../context/TravelContext"
import { Button, Heading,Image,AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay} from "@chakra-ui/react"
import { MdDeleteForever } from "react-icons/md";
import { calculateAndDisplayRoute } from '../../services/TravelPlanService';

export const CustomPlanInner=()=>{
  const history=useHistory()
  const {state, dispatch}=useContext(TravelContext)

  const [p,setP]=useState([])
 
 
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()
  

    
    
    return(
        <>
      <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Places error
                    </AlertDialogHeader>
        
                    <AlertDialogBody>
                      you can't add more than 24 places to your plan
                    </AlertDialogBody>
        
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>



       <Flex width="100%" alignItems="center" flexDirection="column" justifyContent="center">
                  
        <Autocomplete style={{width:"40%" ,height:"30px", padding:"5px", margin:"15px",background:"grey", borderRadius:"5px", color:"white"}}
        apiKey={"AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA"}

        onPlaceSelected={(place) => {
          if(place.length>24){
              setIsOpen(true)
          }



          if(place.geometry.location){
            // console.log(place.photos[0].getUrl())
            setP(p=>[...p,place])
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
      <Flex justifyContent="center" flexDirection="column" alignItems="center">
     
        {p.map((i,index)=>{
          
          return(
            <>
            
            <HStack p={3}>
            <Heading as="h5" size="md">
                {index+1}
                {".  "}
                {i.name}
            </Heading>

            <Button onClick={()=>{
                  console.log(index)
                  setP(p.filter((item,index1)=>{
                       if(index1 !==index)  return item
                  }))
                 }}>
                 <MdDeleteForever />
            </Button>
            </HStack>
            </>
          )
         
        })}


            <GoogleMap
                    defaultZoom={7}
                    defaultCenter={{ lat: 7.291418, lng:80.636696}}
                  >
            
                    {p && p.map((item=[],index)=>{
                        return(
                            <>
                               
                                        <>
                                        <Marker position={item.geometry.location} label={`${index+1}`} />
                                        
                                        </>
                            </>
                        )
                    })

                    }     
    
            </GoogleMap>




        {
          p.length ?

          <Button colorScheme="teal" variant="outline" onClick={
           ()=>{
            calculateAndDisplayRoute(p).then(r=>{
             
              dispatch({type:"set_travelPlan" , payload:{travelPlan:r[0]}})
              dispatch({type:"set_pois" , payload:{allpois:r[1]}})
              history.push("/travelPlan/travelPlan")

            })
           }
          }>
          submit
        </Button> :
        <></>

        }
        </Flex>




        </>
    )
}
const MapWrapped = withScriptjs(withGoogleMap(CustomPlanInner));

export const CustomPlan=()=>{
  return(
    <Flex width="80%" height="180vh" flexDirection="column" mx="auto" my="2" boxShadow="dark-lg">
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `40%` }} />}
        />
        </Flex>    
  )
}


