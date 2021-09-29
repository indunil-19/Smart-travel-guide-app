import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Box, Flex, HStack, Stack, VStack } from "@chakra-ui/layout";
import {
  Image,
  Heading,
  Button,
  Text,
  Badge,
  Avatar,
  Skeleton,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";
import { MdDriveEta } from "react-icons/md";
import { TravelContext } from "../../context/TravelContext";
import { getTravelPlan } from "../../services/TravelPlanService";
import { PlaceCard } from "../../components/TravelPlanApp/placeCard";
import { FiEdit, FiSave } from "react-icons/fi";

export const TravelPlan = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(TravelContext);
  const [isloading, setLoading] = useState(false);
  const [plan, setPlan] = useState([[], []]);
  useEffect(() => {
    if (state.travelPlan) {
      setLoading(true);
      setPlan(state.travelPlan);
    } else {
      getTravelPlan(
        "wet",
        [],
        "2",
        "buddhsism",
        [],
        ["ancient", "natural", "parks"]
      ).then((r) => {
        console.log(r[0]);
        setPlan(r[0]);
        setLoading(true);
        dispatch({ type: "set_travelPlan", payload: { travelPlan: r[0] } });
        dispatch({ type: "set_pois", payload: { allpois: r[1] } });

        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
      });
    }
  }, [state]);
  var i = 0;
  var accomodation = "";

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const savePlan = () => {
    fetch("/user/saveTravelPlan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travelPlan: state.travelPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/travelPlan/myplans");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePlan = () => {
    fetch("/user/updateTravelPlan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planId: state.planId,
        travelPlan: state.travelPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        history.push("/travelPlan/myplans");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {state.planId ? "update" : "save"} Travel Plan
              </AlertDialogHeader>

              <AlertDialogBody>
                Do you want to {state.planId ? "update" : "save"}?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={onClose}
                  ml={3}
                  onClick={() => {
                    if (state.planId) {
                      updatePlan();
                    } else {
                      savePlan();
                    }
                  }}
                >
                  save
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>

      <Skeleton isLoaded={isloading}>
        <Flex alignItems="center" flexDirection="column" boxShadow="lg">
          <Image
            src="https://www.thexpressng.com/wp-content/uploads/2019/03/SriLanka_Slider.jpg"
            alt="Segun Adebayo"
            height="400px"
            width="100%"
            objectFit="cover"
          />
          <Heading
            marginTop="-350px"
            boxShadow="dark-lg"
            borderRadius="5px"
            padding="10px"
            marginBottom="300px"
          >
            {plan[0].length} Day Trip in
          </Heading>
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" variant="outline" m="5px">
              Travel Plan
            </Button>
          </Stack>
        </Flex>

        <Flex flexDirection="column" alignItems="center">
          <HStack>
            <IoLocationSharp /> <Badge size="15">9.00 a.m</Badge>{" "}
            <Text fontSize="3xl">Start from colombo</Text>
          </HStack>

          <>
            {plan[0] &&
              plan[0].map((Item = [], index) => {
                return (
                  <>
                    <Box color="white" backgroundColor="black" padding={3}>
                      Day {index + 1}
                    </Box>
                    {Item.map((subItem, index) => {
                      i = i + 1;
                      accomodation = subItem.geometry.location;
                      return (
                        <>
                          <Card
                            name={subItem.name}
                            photo={subItem.photos[0].photo_reference}
                            address={subItem.formatted_address}
                            rating={subItem.rating}
                            index={i}
                            distance={plan[1][i - 1].distance.text}
                            duration={plan[1][i - 1].duration.text}
                            place_id={subItem.place_id}
                          />
                        </>
                      );
                    })}
                    <Button
                      colorScheme="teal"
                      variant="solid"
                      m={15}
                      width="50%"
                      onClick={() => {
                        dispatch({
                          type: "accomodation_location",
                          payload: {
                            accomodation_location: accomodation,
                          },
                        });
                        history.push("/travelPlan/nearbyhotels");
                      }}
                    >
                      Find Accomodations
                    </Button>
                    <Divider orientation="horizontal" mb={2} />
                  </>
                );
              })}
          </>

          <HStack>
            <IoLocationSharp /> <Badge size="15">6.00 p.m</Badge>{" "}
            <Text fontSize="3xl">End - colombo</Text>
          </HStack>
        </Flex>

        <VStack position="fixed" bottom="0" right="0" p={3}>
          <Button
            colorScheme="teal"
            size="lg"
            borderRadius="50%"
            onClick={() => {
              history.push("/travelPlan/editPlan");
            }}
          >
            <FiEdit />
          </Button>

          <Button
            colorScheme="teal"
            size="lg"
            borderRadius="50%"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <FiSave />
          </Button>
        </VStack>
      </Skeleton>
    </>
  );
};

const Card = ({
  distance,
  duration,
  photo,
  index,
  name,
  address,
  types = [],
  rating,
  place_id,
}) => {
  return (
    <Flex flexDirection="column" alignItems="center" padding="10px">
      <HStack h="100px" p={4}>
        <Divider orientation="vertical" variant="dashed" />
        <VStack>
          <HStack>
            <MdDriveEta /> <Text fontSize="2xl">{distance} </Text>{" "}
          </HStack>
          <Badge size="15">{duration}</Badge>
        </VStack>
      </HStack>
      <PlaceCard
        photo={photo}
        index={index}
        name={name}
        address={address}
        types={types}
        rating={rating}
        place_id={place_id}
      />
    </Flex>
  );
};
