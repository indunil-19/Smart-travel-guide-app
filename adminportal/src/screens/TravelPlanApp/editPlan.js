import React , {useContext,useEffect,useState}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack,Stack, VStack} from "@chakra-ui/layout"
import { Image,Heading,Button,Text,Badge, Avatar , Skeleton ,Divider} from "@chakra-ui/react"
import {IoLocationSharp} from "react-icons/io5"
import {MdDriveEta} from "react-icons/md"
import { TravelContext } from "../../context/TravelContext"
import { getTravelPlan } from "../../services/TravelPlanService"
import { PlaceCard } from "../../components/TravelPlanApp/placeCard"
import { FiEdit, FiSave} from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { FaExchangeAlt } from "react-icons/fa";
import { DeletePOI , DeleteDay} from "../../services/EditPlanServices"
import { IoMdCloseCircleOutline } from "react-icons/io";


export const EditPlan=()=>{

    const history=useHistory()
    const {state, dispatch}=useContext(TravelContext)
    const [plan,setPlan]=useState([[], []])
    useEffect( ()=>{ 

  
            setPlan(state.travelPlan)
            
       
        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
    } ,[state] )


    const deletePOI=(index,index1)=>{

        DeletePOI(index,index1,plan).then((res)=>{
            console.log(res)
            dispatch({type:"set_travelPlan" , payload:{travelPlan:res}})
            setPlan(res)
        })
    }

    const deleteDay=(day)=>{
            DeleteDay(day,plan).then((res)=>{
                console.log(res)
            })
    }






    var i=0;
    var accomodation=""
    return(
        <>
      
        


        <Flex flexDirection="column" alignItems="center">

            <HStack> 
                   <IoLocationSharp/> <Badge size="15">9.00 a.m</Badge> <Text fontSize="3xl">Start from colombo</Text>                  
            </HStack>
         

            <>
                    { (plan[0]) &&
                    plan[0].map((Item=[], index)=>{
                    
                        return (
                        <>
                        {
                            index==0 ? <>
                            
                              <Box color="white" backgroundColor="black" padding={3} >Day {index+1}</Box>
                            </>:
                            <HStack>

                            <Box color="white" backgroundColor="black" padding={3} >Day {index+1}</Box>
                                    <Button colorScheme="red" variant="outline" onClick={()=>{
                                            deleteDay(index+1)
                                    }}>
                                    <IoMdCloseCircleOutline />
                                    </Button>
                            </HStack> 
                        } 
                           
                        {
                            Item.map( (subItem, index1,)=>{
                                i=i+1
                                accomodation=subItem.geometry.location
                                return(
                                <> 
                                 <HStack>
                                        <VStack>
                                            <Button leftIcon={<AiFillDelete />} colorScheme="teal" variant="solid" onClick={()=>{
                                                    deletePOI(index,index1)
                                            }}>
                                                Delete
                                            </Button>

                                            <Button leftIcon={<FaExchangeAlt />} colorScheme="teal" variant="solid">
                                            change
                                            </Button>

                                        </VStack>
                                        <Card name={subItem.name} photo={subItem.photos[0].photo_reference} address={subItem.formatted_address} rating={subItem.rating} index={i} distance={plan[1][i-1].distance.text} duration={plan[1][i-1].duration.text}  place_id={subItem.place_id}/>
                         
                                </HStack>
                                </>
                                )
                            })
                        }   
                            
                            <Button colorScheme="red" variant="outline" m={15} width="50%" onClick={()=>{
                                            history.push('/travelPlan/addMorePlaces')
                                        }}>
                                Add more places
                           </Button>




                           <Button colorScheme="teal" variant="solid" m={15} width="50%" onClick={()=>{
                                            dispatch({type:"accomodation_location", payload:{
                                                accomodation_location:accomodation
                                            }})
                                            history.push('/travelPlan/nearbyhotels')
                                        }}>
                                Find Accomodations
                           </Button>
                           <Divider orientation="horizontal" mb={2} />
                        </>
                        
                        
                    )
                    })}             
             </>
                 


            <HStack> 
                   <IoLocationSharp/> <Badge size="15">6.00 p.m</Badge> <Text fontSize="3xl">End - colombo</Text>                  
            </HStack>


            



        </Flex>





         
        </>
    )
}

const Card=({distance,duration,photo,index,name,address, types=[], rating, place_id})=>{


    return(
        <Flex flexDirection="column" alignItems="center" padding="10px">
                        <HStack  h="100px" p={4}>
                            <Divider orientation="vertical"   variant="dashed" />
                            <VStack>
                                <HStack>< MdDriveEta /> <Text fontSize="2xl">{distance} </Text> </HStack>
                                <Badge size="15">{duration}</Badge>
                            </VStack>

                        </HStack>
                        
                       
                        <PlaceCard  photo={photo} index={index} name={name} address={address} types={types} rating={rating} place_id={place_id}/>
                       
                        


            </Flex>
    )
}


  