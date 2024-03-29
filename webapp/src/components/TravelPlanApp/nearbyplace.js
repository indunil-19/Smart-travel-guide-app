import {  Flex, HStack,  Box,  VStack } from "@chakra-ui/layout"
import {  Image,Badge,Heading} from "@chakra-ui/react"
import React, { useEffect,useState } from "react"
import { Avatar } from "@chakra-ui/avatar";
import { StarIcon } from "@chakra-ui/icons"
import { useHistory } from "react-router"
import { Config } from "../../config/config";
import StarRatings from "react-star-ratings"


export const NearByPlaceCard=({photo,index,name,address, types=[], rating})=>{
    const [link,setLink]=useState("")
    const history=useHistory()
    useEffect(() => {
        
      
        setLink(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo}&key=${Config.apiKey}`)
    }, [photo])



    return(
        <Flex flexDirection="column" alignItems="center" padding="10px">
                      


                        <Flex flexDirection="row" margin={5} borderWidth="1px" borderRadius="lg" p={5} >
                           <Image src={link}  width="400px" height="300px" objectFit="cover" borderRadius="lg"  />
                           <VStack spacing={3.5} alignItems="start" p={5}>
                                <Box bg="green.200" p={3} borderRadius="full" border="green" borderWidth="1px" ><Heading as="h4" size="md">{index+1}</Heading></Box>
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
                                        

                           </VStack>

                        </Flex>


            </Flex>
    )
}