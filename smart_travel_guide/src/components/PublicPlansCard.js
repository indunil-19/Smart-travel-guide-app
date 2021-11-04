import React, { useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { AppContext } from "../context/AppContext";

import { Config } from "../config/config";
import { theme } from "../core/theme";
import { useNavigation } from "@react-navigation/native";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const PublicPlanCard = ({
  _id = "",
  name,
  days,
  createdDate,
  travelPlan,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();

  const links = [
    require("../assets/img/1.jpg"),
    require("../assets/img/2.jpg"),
    require("../assets/img/3.jpg"),
    require("../assets/img/4.jpg"),
    require("../assets/img/5.jpg"),
    require("../assets/img/6.jpg"),
  ];

  const confirmAddPlan = () => {
    Alert.alert(
      `Do you want to add ${name} plan to your saved plans library?`,
      "Press Confirm to save this travel plan.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            addPlan();
          },
        },
      ]
    );
  };

  const addPlan = () => {
    fetch(`${Config.localhost}/user/saveTravelPlan`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travelPlan: travelPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Alert.alert(data.error, "", [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
          console.log(data.error);
          return;
        } else {
          dispatch({
            type: "set_notification",
            payload: {
              notification: {
                message: "Saved Successfully",
                icon: "check-circle-outline",
              },
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card style={styles.card} elevation={8}>
      <Card.Cover
        source={links[getRandomInt(6)]}
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      />
      <Card.Title title={name} subtitle={createdDate} />
      <Card.Content>
        <Title>{days + " day trip"}</Title>
      </Card.Content>

      <Card.Actions
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Button
          icon="open-in-new"
          mode="contained"
          labelStyle={{ color: "white" }}
          style={{
            borderRadius: 20,
            backgroundColor: theme.colors.primary,
            marginLeft: 10,
          }}
          onPress={() => {
            dispatch({
              type: "set_travelPlan",
              payload: { travelPlan: travelPlan },
            });
            dispatch({ type: "set_planId", payload: { planId: _id } });
            navigation.navigate("User Plan", {
              title: name,
              plan: travelPlan,
              id: _id,
              permissions: "view",
            });
          }}
        >
          View Plan
        </Button>
        {/* <Button
          icon="star-outline"
          labelStyle={{ color: "white" }}
          mode="contained"
          style={{
            borderRadius: 20,
            backgroundColor: "gray",
            marginRight: 10,
          }}
          onPress={() => {}}
        >
          Rate
        </Button> */}
        <Button
          icon="plus"
          labelStyle={{ color: "white" }}
          mode="contained"
          style={{
            borderRadius: 20,
            backgroundColor: theme.colors.primary,
            marginRight: 10,
          }}
          onPress={() => {
            confirmAddPlan();
          }}
        >
          Add Plan
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 20,
  },
});
