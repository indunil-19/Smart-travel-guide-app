import { Divider, Flex, HStack, Text,  } from "@chakra-ui/layout"
import React from "react"
import { Heading } from "@chakra-ui/layout";
import { IoLocation } from "react-icons/io5";
import { Tag } from "@chakra-ui/tag";
import { Carousal } from "../../components/TravelPlanApp/carousal"
import { Review } from "../../components/TravelPlanApp/review"


 const PoiCard=({data={}})=>{
    return(
        <Flex  flexDirection="column" alignItems="center" width="70%" marginX="auto" boxShadow="dark-lg" padding={4} marginTop={2}>            
            

            <HStack><IoLocation/>
            <Heading padding={5}>{data.name}</Heading>
            </HStack>

            <Carousal photos={data.photos} />

            <HStack spacing={6}  p={2}> 
                {(data.types)  && data.types.map((type)=>{
                    return(
                        <Tag  variant="solid" colorScheme="teal">
                            {type}
                        </Tag>
                    )
                })}
            </HStack>

            <Text fontSize="md">{data.formatted_address}</Text>
            
         




            <Divider  padding="5" />
            
            <Text fontSize="3xl">User reviews</Text>
            
            <>
            {(data.reviews) && data.reviews.map((review)=>{
                return(
                    <Review  author_name={review.author_name} profile_photo_url={review.profile_photo_url} relative_time_description={review.relative_time_description} text={review.text} rating={review.rating} author_url={review.author_url}/>
                )
            })}
            
            
            </>
                       
        </Flex>
    )
}
export default PoiCard