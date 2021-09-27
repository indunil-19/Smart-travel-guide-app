import { Flex,Heading, VStack ,Text} from "@chakra-ui/layout"
import { Input, InputGroup, InputLeftAddon ,Button, Checkbox} from "@chakra-ui/react"
import { BiUserCircle } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";


export const SignIn=()=>{
    return(
        <>
        
        <Flex  flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" backgroundSize="cover" backgroundPosition="center" backgroundImage="url('https://images.unsplash.com/photo-1578519050142-afb511e518de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')">
           
           <Flex p={10} borderColor="white" borderWidth={3}  borderRadius={8} width="md" justifyContent="center" alignItems="center" boxShadow="dark-lg" color="white">
            <VStack spacing={10} w="md" color="white">
                <Heading as="h2" size="xl" color="white">
                   SignIn
                </Heading>

                <InputGroup >
                    <BiUserCircle  />
                    <Input type="text" placeholder="name" />
                </InputGroup>

                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                <InputGroup >
                    <RiLockPasswordLine/>
                    <Input placeholder="password" type="password" />
                </InputGroup>

                <Checkbox defaultIsChecked>Remember me</Checkbox>

                <Button colorScheme="blue">Sign In</Button>
                <Text >you don't have an account?<Link to="/travelPlan/signup" >SignUp</Link></Text>
                
            </VStack>
            
            </Flex>
        </Flex>
        
        </>
    )
}