import React, { useState, useContext } from "react";
import { View, Alert } from "react-native";
import { Button, Card, Title, Subheading } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Config } from "../config/config";
import { AppContext } from "../context/AppContext";

export const StartLocation = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [start_location, setStartLocation] = useState({
    lat: 6.927079,
    lng: 79.85775,
  });
  const [start_location_name, setStartLocationName] = useState("Colombo");

  const confirmLocation = () => {
    dispatch({
      type: "set_start_location",
      payload: {
        locationDetails: {
          startLocation: start_location,
          startLocationName: start_location_name,
        },
      },
    });
    Alert.alert(
      `Selected staring location is ${start_location_name}`,
      "Press 'CONFIRM' to generate travel plan.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            navigation.navigate("Travel Plan", {
              permissions: "edit",
            });
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 10,
      }}
    >
      <Card style={{ margin: 10, borderRadius: 20 }} elevation={8}>
        <Card.Content
          style={{
            alignContent: "center",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Title>Select a starting location</Title>
        </Card.Content>
      </Card>
      <GooglePlacesAutocomplete
        styles={{
          container: {
            height: 120,
          },
          textInput: {
            backgroundColor: "grey",
            height: 38,
            color: "white",
            fontSize: 16,
            borderRadius: 20,
            elevation: 8,
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
        minLength={3}
        placeholder="Search..."
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details.geometry.location) {
            let location = {
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
            };
            setStartLocation(location);
            setStartLocationName(details.name);
          }
        }}
        query={{
          key: Config.apiKey,
          language: "en",
          components: "country:lk",
        }}
      />
      <Card
        style={{ margin: 10, borderRadius: 20, alignItems: "center" }}
        elevation={8}
      >
        <Card.Content
          style={{
            alignContent: "center",
            alignItems: "center",
            padding: 5,
            flexDirection: "row",
          }}
        >
          <Title>Selected Location :</Title>
          <Subheading>{start_location_name}</Subheading>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "center" }}>
          <Button
            onPress={() => {
              confirmLocation();
            }}
          >
            Confirm Location
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
