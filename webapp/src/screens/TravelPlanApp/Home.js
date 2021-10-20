import { Flex, HStack, Heading ,Text} from "@chakra-ui/layout"
import { Footer } from "../../components/TravelPlanApp/Footer"
import { Button } from "@chakra-ui/button"
import { Image } from "@chakra-ui/image"
import { useHistory } from "react-router"
import  PlanCard  from "../../components/TravelPlanApp/planCard,"
import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"

const Home=()=>{
    const history=useHistory()
    const [plans,setPlans]=useState([])
    useEffect(()=>{
            fetch("/user/getPublicTravelPlans",{method:"get"}).then(res=>res.json())
            .then(result=>{
                // console.log(result)
                setPlans(result.myPlans)
            }).catch(e=>{
                console.log("dfdf")
            })
    },[])
    
    
    return(
        <>
        <Flex flexDirection="column"  alignItems="center" minHeight="100vh" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center"  backgroundImage="url('https://images.unsplash.com/photo-1583648542585-d5f9b9c989a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80')">
            <Text fontSize="4xl" p={5}>The new way to plan your next trip</Text>

            <Text fontSize="xl">Get a personalized trip 
            A complete day by day itinerary
            based on your preferences</Text>

            <Text fontSize="xl">
            Customize it 
            Refine your trip. We'll find the
            best routes and schedules
            </Text>


            <HStack spacing={10} p={2}>
                <Flex flexDirection="column" p={10} shadow="dark-lg" borderRadius="5px" width="80%">
                   <Image src={"https://images.unsplash.com/photo-1632429619634-3d97fc1693e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  /> 
                   
                    <Button colorScheme="teal" m={4} onClick={()=>{
                        history.push("/travelPlan/userPreferences")
                    }}>
                        Find A travel Plan
                    </Button>
                </Flex>

                <Flex flexDirection="column" p={10} shadow="dark-lg" borderRadius="5px" width="80%">
                     <Image src={"https://images.unsplash.com/photo-1632429619634-3d97fc1693e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  /> 
                    <Button colorScheme="teal" m={4} onClick={()=>{
                        history.push("/travelPlan/customPlan")
                    }}>
                        Create your own Travel Plan
                    </Button>

                </Flex>
            </HStack>

            
        </Flex>
        <Flex flexDirection="column" bg="purple.900" p="15%" >
                    <Flex boxShadow='dark-lg' p={5}>
                    <Heading as="h2" size="xl" color="white">
                        `` Use our Sri Lanka trip planner to see the best Sri Lanka attractions. Sri Lanka vacation ideas help you See & Do More on your holiday.Explore, experience and enjoy the most amazing destinations and take in the magnificence of most unique Sri Lankan socio-cultural and historical splendour.
                    </Heading>
                    </Flex>
        </Flex>

        <Flex flexDirection="column" alignItems="center" mb="-165px" p={5}>
             <Text fontSize="4xl">Plans Used by Previous Users</Text>
             <Link to="/travelPlan/toprated"><Text fontSize="2xl" color="tomato">
                See all.....
            </Text>
            </Link>

            <Flex flexDirection="row" maxWidth="100vw" overflowX="scroll" p={3} data-testid="tplan">

                {plans && plans.map((plan , index)=>{
                        return(
                          
                                <Flex minWidth="md"  >
                                    <PlanCard  name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan}/>
                                 </Flex> 
                        )
                    })
                }
                
               
 
            </Flex>
        </Flex>

        <Footer/>
        
        </>
    )
}
export default Home