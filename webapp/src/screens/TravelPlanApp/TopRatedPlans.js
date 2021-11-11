import { PlanCard } from "../../components/TravelPlanApp/planCard,"
import { Flex } from "@chakra-ui/layout"
import React,{ useState,useEffect } from "react"
 const TopRatedPlans=()=>{
    const [plans,setPlans]=useState([])
    useEffect(()=>{
            fetch("/user/getPublicTravelPlans").then(res=>res.json())
            .then(result=>{
                console.log(result)
                setPlans(result.myPlans)
            })
    },[])
    return(
        <>
        

        <Flex flexDirection="column" width="80%" p={3} justifyContent="center" alignItems="center" mx="auto" data-testid="tplans">  

                {plans && 
                    plans.map((plan , index)=>{
                        return(
                            <>
                                <Flex minWidth="md">
                                    <PlanCard  name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan}/>
                                 </Flex>
                            </>
                        )
                    })
                }
                
               
 
        </Flex>


        </>
    )
}
export default TopRatedPlans