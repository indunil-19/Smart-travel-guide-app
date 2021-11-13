import React , {useEffect,useState}from "react"
import { useHistory } from "react-router"
import { Box, Flex ,HStack, VStack} from "@chakra-ui/layout"
import { Image,Button,Badge, Avatar , Heading} from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import StarRatings from "react-star-ratings"

export const PlaceCard=({photo="",index,name,address, types=[], rating, place_id})=>{
    const [link,setLink]=useState("")
    const history=useHistory()
    useEffect(() => {
        
        
        setLink(photo)
    }, [photo])
    return(
        <Flex flexDirection="row" margin={5} borderWidth="1px" borderRadius="lg" p={5} width="100%">
                           <Image src={link}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  />
                           <VStack spacing={3.5} alignItems="start" p={5}>
                                 <Box bg="green.200" p={3} borderRadius="full" border="green" borderWidth="1px" ><Heading as="h4" size="md">{index.toString()}</Heading></Box>
                                 <Box lineHeight="tall" fontWeight="semibold" as="h4"> {name}</Box>
                                 <Box color="gray.600" fontSize="sm">{address}</Box>
                                <HStack>
                                        <>    {types.map((item)=>{
                                                return(
                                                    <Badge borderRadius="full" px="2" colorScheme="teal">{item}</Badge>
                                                )
                                            })}
                                        </> 
                                         
                                </HStack>

                                <HStack>
                                        {/* <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} />
                                        <StarIcon color={"teal.500"} /> */}


                                        <StarRatings
                                        rating={rating}
                                        starRatedColor="teal"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="3px"
                                        />
                                        <Box>rating {rating}</Box>
                                        
                                </HStack>
                               
                                        <Button colorScheme="teal" variant="outline" onClick={()=>{
                                            history.push('/travelPlan/viewpoi/'+place_id)
                                        }}>
                                            See more...
                                        </Button>

                           </VStack>

        </Flex>
    )
}