import NavBar from "../components/navbar"
import { Select } from "@chakra-ui/select"
import { InputGroup } from "@chakra-ui/input"
import { Flex, HStack, Text } from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { Button } from "@chakra-ui/button"
import { PlanCard } from "../components/AdminComponents/planCard"
import { AiOutlineDelete } from "react-icons/ai"
import { MdPublic } from "react-icons/md"

export const SharedPlan=()=>{
    const [rate,setRate]=useState("")
    const [plans,setPlans]=useState([])

    useEffect(()=>{
        getSharedPlans()
    },[])


    const getSharedPlans=()=>{
        fetch('/admin/getsharedPlans',{
            method:"post",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    rate:rate,

                }
            )
        }).then(res=>res.json()).
        then(data=>{
            setPlans(data.myPlans)
            console.log(data)
        }).catch(e=>{
            console.log(e)
        })
    }

    return(
        <>
        
        <NavBar>
        <Flex flexDirection="column" alignItems="center">
        <HStack width="full">
        <InputGroup>
            <Text>select rate</Text>
            <Select defaultValue="5" onChange={(e)=>setRate(e.target.value)} value={rate}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            </Select>
            </InputGroup>
            <Button colorScheme="teal" size="xs" leftIcon={<BiSearch/>} p={4} onClick={()=>getSharedPlans()}>
                search
            </Button>
        </HStack>
        </Flex>



        <>
        {plans && plans.map((plan,index)=>{
                    return(
                        <>
                         <Flex flexDirection="column" alignItems="center" p={3}>
                            <HStack>

                            <Button colorScheme="red" onClick={()=>{
                                
                            }}><AiOutlineDelete /></Button>



                            <Button colorScheme="blue" onClick={()=>{
                                
                            }}><MdPublic /></Button>
                        
                            <PlanCard _id={plan._id} name={plan.name ? plan.name : `My plan ${index+1}`} days={plan.travelPlan[0].length} createdDate={plan.createdAt} travelPlan={plan.travelPlan} />

                            </HStack>
                         </Flex>
                        </>
                    )
        })}

        </>














        </NavBar>

        
        
        </>
    )
}