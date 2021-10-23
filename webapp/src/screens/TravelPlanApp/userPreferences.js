import React, {useState, useRef, useContext} from "react"
import { Box, Text,Heading ,Stack, VStack, HStack} from "@chakra-ui/layout"
import { Radio, RadioGroup , Button, Checkbox, CheckboxGroup, Select , AlertDialog,AlertDialogBody,AlertDialogFooter,AlertDialogHeader,AlertDialogContent,AlertDialogOverlay,} from "@chakra-ui/react"
import { useHistory } from "react-router"
import { TravelContext } from "../../context/TravelContext"
import { Link } from "react-router-dom"
import { getTravelPlan } from "../../services/TravelPlanService"

const UserPreferences=()=>{

    const {state, dispatch}=useContext(TravelContext)

    const history=useHistory()
    const [climate, setClimate] =useState('dry');
    const [provinces, setProvinces] = useState([]);
    const [days, setDays] = useState("2");
    const [religion, setReligion] = useState("");
    const [placesLike, setPlacesLike] = useState([]);
    const [thingsLike, setThingsLike] = useState([]);
    const [loading,setLoading]=useState(false)

    const [q1, setQ1]=useState("block")
    const [q2, setQ2]=useState("none")
    const [q3, setQ3]=useState("none")
    const [q4, setQ4]=useState("none")
    const [q5, setQ5]=useState("none")
    const [q6, setQ6]=useState("none")

    
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const [aleartHeader, setAleartHeader]=useState("")
    const [aleartBody, setAleartBody]=useState("")


    return(
        <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay data-testid="aleart">
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {aleartHeader}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {aleartBody}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        
        <Box alignItems="center" padding="50">




        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q1}>
                <Heading>1.Climate Condition would you expect while travelling?</Heading>
                <Box pt={10} pb={10}>
                <RadioGroup onChange={setClimate} value={climate}>
                <Stack spacing={6} >
                    <Radio value="dry"  data-testid="climate">Dry</Radio>
                    <Radio value="wet">Wet</Radio>
                    <Radio value="intermediate">Intermediate</Radio>
                </Stack>
                </RadioGroup>
                </Box>

                <HStack justifyContent="">
                {/* <Button colorScheme="teal" variant="outline">
                    
                </Button> */}
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ1("none"); setQ2("block")}} >
                    Next
                </Button>
                </HStack >

        </Box>


        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q2}>
                <Heading>2.Select at most 3 Provinces you like to visit in Sri Lanka?</Heading>
                <Link to="/travelPlan/provinces"><Text color="blue" textDecoration="underline">refer informations about provinces</Text></Link>
                <Box pt={10} pb={10}>
                <CheckboxGroup colorScheme="green" onChange={(e)=>setProvinces(e)}  >
                <VStack alignItems="start">
                
                    <Checkbox value="Northern">Northern</Checkbox>
                    <Checkbox value="North Western">North Western</Checkbox>
                    <Checkbox value="Western" data-testid='province1'>Western</Checkbox>
                    <Checkbox value="North Central">North Central</Checkbox>
                    <Checkbox value="Central" data-testid='province2'>Central</Checkbox>
                    <Checkbox value="Sabaragamuwa" data-testid='province3'>Sabaragamuwa</Checkbox>
                    <Checkbox value="Eastern">Eastern</Checkbox>
                    <Checkbox value="Uva">Uva</Checkbox>
                    <Checkbox value="Southern">Southern</Checkbox>

                    
                </VStack>
                </CheckboxGroup>
                </Box>

                <HStack justifyContent="space-between">
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ1("block"); setQ2("none")}}>
                    Previous
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={() => {
                    if(provinces.length>=4) {
                            setAleartHeader("Selecet Provinces")
                            setAleartBody("You can't select more than 3 provinces.")
                            setIsOpen(true)
                            return;
                    }
                    setQ2("none"); setQ3("block")}} >
                    Next
                </Button>
                </HStack >

        </Box>



        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q3}>
                <Heading>3.Number of Days , you hope to travel?</Heading>
                <Box pt={10} pb={10}>

                <Select  variant="filled" p={10}  data-testid="days">
                    <option value="1">1 Day</option>
                    <option value="2" >2 Day</option>
                    <option value="3">3 Day</option>
                </Select>
                
                </Box>

                <HStack justifyContent="space-between">
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ2("block"); setQ3("none")}}>
                    Previous
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ3("none"); setQ4("block")}} >
                    Next
                </Button>
                </HStack >

        </Box>


        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q4}>
                <Heading>4.Any religion you would like to see in your travel?</Heading>
                <Box pt={10} pb={10}>

                <Select  variant="filled" p={10} data-testid="religion">
                    <option value="Buddhism">Buddhism</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Islam">Islam</option>
                    <option value="Catholic">Catholic</option>
                    <option value="">None</option>
                    
                    
                </Select>
                
                </Box>

                <HStack justifyContent="space-between">
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ3("block"); setQ4("none")}}>
                    Previous
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ4("none"); setQ5("block")}} >
                    Next
                </Button>
                </HStack >

        </Box>


        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q5}>
                <Heading>5.Select at most 3 places you like to visit in Sri Lanka?</Heading>
                <Box pt={10} pb={10}>
                <CheckboxGroup colorScheme="green" onChange={(e)=>setPlacesLike(e)} >
                <VStack alignItems="start">
                    <Checkbox value="Natural"data-testid="placeslike1" >Natural</Checkbox>
                    <Checkbox value="animal">Animal</Checkbox>
                    <Checkbox value="botenical gardens">Botenical gardens</Checkbox>
                    <Checkbox value="parks">Parks</Checkbox>
                    <Checkbox value="beaches" data-testid="placeslike2">Beaches</Checkbox>
                    <Checkbox value="ancient" data-testid="placeslike3">Ancient</Checkbox>
                    <Checkbox value="reliogous" data-testid="placeslike4">Reliogous</Checkbox>
                    

                    
                </VStack>
                </CheckboxGroup>
                </Box>

                <HStack justifyContent="space-between">
                <Button colorScheme="teal" variant="outline" onClick={() => {                   
                    setQ4("block"); setQ5("none")}}>
                    Previous
                </Button>
                <Button colorScheme="teal" variant="outline" data-testid="next" onClick={() => {
                    if(placesLike.length>=4) {
                        setAleartHeader("Selecet places")
                        setAleartBody("You can't select more than 3 places.")
                        setIsOpen(true)
                        return;
                    }
                    if(placesLike.length!=3) {
                        setAleartHeader("Selecet places")
                        setAleartBody("You need to select 3 places.")
                        setIsOpen(true)
                        return;
                    }                    
                    setQ5("none"); setQ6("block")}} >
                    Next
                </Button>
                </HStack >

        </Box>




        <Box maxW="60%" borderWidth="1px" borderRadius="lg" overflow="hidden" m="auto" padding="25" boxShadow="dark-lg" display={q6}>
                <Heading>6.Select things you like to do in Sri Lanka?</Heading>
                <Box pt={10} pb={10}>
                <CheckboxGroup colorScheme="green" onChange={(e)=>setThingsLike(e)}  >
                <VStack alignItems="start">
                    <Checkbox value="hiking" data-testid="thingslike1" >hiking</Checkbox>
                    <Checkbox value="surfing" data-testid="thingslike2">surfing</Checkbox>
                    <Checkbox value="camping">camping</Checkbox>
                    <Checkbox value="swimming" data-testid="thingslike3">swimming</Checkbox>
                    <Checkbox value="riding boats">riding boats</Checkbox>
                                     

                    
                </VStack>
                </CheckboxGroup>
                </Box>

                <HStack justifyContent="space-between">
                <Button colorScheme="teal" variant="outline" onClick={() => {setQ5("block"); setQ6("none")}}>
                    Previous
                </Button>
                <Button colorScheme="teal" variant="outline" isLoading={loading} loadingText="plase wait"  onClick={() => {

                        setLoading(true)
                         dispatch({type:"USER_PREFERENCES",payload:{userPreferences:{
                            climate:climate,
                            provinces:provinces,
                            days:days,
                            religion:religion,
                            placesLike:placesLike,
                            thingsLike:thingsLike
                        }}}) ;

                        getTravelPlan(climate,provinces,days,religion,thingsLike,placesLike).then((r)=>{
                                // console.log(r)
                                setLoading(false)
                                dispatch({type:"set_travelPlan" , payload:{travelPlan:r[0]}})
                                dispatch({type:"set_pois" , payload:{allpois:r[1]}})
                                history.push("/travelPlan/travelPlan")

                                
                        }).catch(e=>{
                            console.log(e)
                        });




                    }} >
                    Submit
                </Button>
                </HStack >

        </Box>





        </Box>
        
        
        </>
    )
}
export default UserPreferences;
