import { Box,HStack } from "@chakra-ui/layout"
import { Button ,Heading, Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuIcon,MenuCommand,MenuDivider,} from "@chakra-ui/react"
import { FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom"

const NavBar=()=>{
    return (
        <>
        
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px" position="fixed" zIndex="9">
        <HStack spacing="24px" justifyContent="space-between" alignItems="center"> 
            <Box>

            <Link to="/travelPlan">
                    <Heading>Travel Guide</Heading>
            </Link>    
            
            </Box>
            <Box>
                    <NavBarAccountItem />
                    <Link to="/travelPlan/signin"><Button colorScheme="teal" variant="outline">
                        Sign in
                    </Button>
                    </Link>
            </Box>
            
        </HStack>
        </Box>
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px">
        </Box>        
        </>
    )
}

export default NavBar



const NavBarAccountItem=()=>{
    return(
        <>
        
        <Menu >
                <MenuButton mr={3}
                    px={2}
                    py={2}
                    transition="all 0.2s"
                    borderRadius="full"
                    borderWidth="1px"
                    _hover={{ bg: "gray.400" }}
                    _expanded={{ bg: "blue.400" }}
                    _focus={{ boxShadow: "outline" }}
                >
                    < FaUserCircle />
                </MenuButton>
                <MenuList>

                    <MenuItem isDisabled={true}>K.D.L.I.udayangana</MenuItem>
                    <MenuItem isDisabled={true}>SL</MenuItem>
                    
                    <MenuDivider />

                    <Link to="/travelPlan/myAccount"><MenuItem >My Account</MenuItem></Link>
                    <Link to="/travelPlan/myplans"><MenuItem>My travel Plans</MenuItem></Link>
                    
                </MenuList>
        </Menu>
        
        
        
        </>
    )
}