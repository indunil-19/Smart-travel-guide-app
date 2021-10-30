import { Flex,Heading, VStack ,Text} from "@chakra-ui/layout"
import { Input, InputGroup, InputLeftAddon ,Button, Checkbox,Select,useToast } from "@chakra-ui/react"
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import React, {useState,useContext,useEffect} from "react"
import { useHistory } from "react-router";
import { TravelContext } from "../../context/TravelContext";


const SignUp=()=>{
    const {state, dispatch}=useContext(TravelContext)
    const history=useHistory()


    useEffect(()=>{
      
        if(state && state._id){
            history.push('/travelPlan')
        }else{
               history.push('/travelPlan/signup')
        }
      },[])


    const toast=useToast()


    const [first_name,setFirst_name]=useState("")
    const [last_name,setLast_name]=useState("")
    const [dob,setDOB]=useState("")
    const [religion,setReligion]=useState("")
    const [country,setCountry]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState('')


    const signUp=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast({
                title: "Enter valid email",
                position:"top-right",
                status:"error",
                duration: 9000,
                isClosable: true,
              })
            return
        }
            fetch("/signup",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                                    firstname:first_name,
                                    lastname:last_name,
                                    dob:dob,
                                    country:country,
                                    religion:religion,
                                    email:email,
                                    password:password,
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){

                    toast({
                        title: data.error,
                        position:"top-right",
                        status:"error",
                        duration: 9000,
                        isClosable: true,
                      })
                }
                else{

                    toast({
                        title: data.message,
                        position:"top-right",
                        status:"success",
                        duration: 9000,
                        isClosable: true,
                      })
                 
                    history.push('/travelPlan/signin')
                }
            }).catch(err=>{
                console.log(err)
            })

    }



    return(
        <>
        
        <Flex  flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" backgroundSize="cover" backgroundPosition="center" backgroundImage="url('https://images.unsplash.com/photo-1578519050142-afb511e518de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')">
           
           <Flex m={3} p={10} borderColor="white" borderWidth={3}  borderRadius={8} width="md" justifyContent="center" alignItems="center" boxShadow="dark-lg" color="white">
            <VStack spacing={10} w="md" color="white">
                <Heading as="h2" size="xl" color="white">
                   SignUp
                </Heading>

                <InputGroup >
                    <BiUserCircle  />
                    <Input type="text" placeholder="first name"  value={first_name} onChange={(e)=>setFirst_name(e.target.value)} />
                </InputGroup>

                <InputGroup >
                    <BiUserCircle  />
                    <Input type="text" placeholder="last name" value={last_name} onChange={(e)=>setLast_name(e.target.value)} />
                </InputGroup>

                <InputGroup >
                    <BiUserCircle  />
                    <Input  type="date" placeholder="Date of birth" value={dob} onChange={(e)=>setDOB(e.target.value)} />
                </InputGroup>

                <InputGroup >
                    <BiUserCircle  />
                    <Select data-testid="religion" placeholder="religion" color="black" value={religion} onChange={(e)=>setReligion(e.target.value)} >
                        <option value="Buddhism">Buddhism</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Islam">Islam</option>
                        <option value="Catholic">Catholic</option>
                        <option value="">None</option>
                    </Select>
                </InputGroup>

                <InputGroup >
                    <RiLockPasswordLine/>
                    <Input placeholder="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </InputGroup>

                <InputGroup >
                    <RiLockPasswordLine/>
                    <Autocomplete data-testid="country" style={{width:"100%" ,height:"45px", padding:"10px", margin:"15px",background:"transparent", borderRadius:"5px", color:"white", borderColor:"white", borderWidth:"2px"}}
                         apiKey={"AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA"}
                            onPlaceSelected={(place) => {
                                    setCountry(place.name)
                            }}

                            options={{
                                types: [],
                                fields:["ALL"]
                               
                            }}
                            defaultValue={country}
                     />
                </InputGroup>

                <InputGroup >
                    <RiLockPasswordLine/>
                    <Input placeholder="password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </InputGroup>

                


                <Button data-testid="signUp" colorScheme="blue" onClick={()=>signUp()}>Sign Up</Button>
                <Text >you already have an account?<Link to="/travelPlan/signin" >SignIn</Link></Text>
                
            </VStack>
            
            </Flex>
        </Flex>
        
        </>
    )
}
export default SignUp