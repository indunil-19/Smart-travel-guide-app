import { Box,HStack } from "@chakra-ui/layout"
import { Button ,Heading} from "@chakra-ui/react"

const NavBar=()=>{
    return (
        <>
        
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px" position="fixed" zIndex="9">
        <HStack spacing="24px" justifyContent="space-between" alignItems="center"> 
            <Box>
            <Heading>Travel Guide</Heading>
            </Box>
            <Box>
                    <Button colorScheme="teal" variant="outline">
                        Logout
                    </Button>
            </Box>
            
        </HStack>
        </Box>
        <Box width="full" boxShadow="xl" p="6" bg="white" height="75px">
        </Box>        
        </>
    )
}

export default NavBar