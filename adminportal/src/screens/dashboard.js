import NavBar from "../components/navbar"
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from "@chakra-ui/react"

const Dashboard=()=>{
    return(
        <>
        <NavBar>
        
       
        <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Users</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            23.36%
            </StatHelpText>
        </Stat>

        <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
            </StatHelpText>
        </Stat>
        </StatGroup>
       

        </NavBar>




        </>
    )
}
export default Dashboard;