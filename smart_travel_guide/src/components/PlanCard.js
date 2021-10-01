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

export const PlanCard = ({
  _id = "",
  name,
  days,
  createdDate,
  onDelete,
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
  const deletePlan = () => {
    fetch(`${Config.localhost}/user/deleteTravelPlan`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planId: _id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          onDelete(result.data);
        }

        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const confirmDelete = () => {
    Alert.alert(
      "Do you want to delete this plan ?",
      "Press Confirm to Delete this travel plan.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            deletePlan();
          },
        },
      ]
    );
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
            });
          }}
        >
          View Plan
        </Button>
        <Button
          icon="delete-outline"
          labelStyle={{ color: "white" }}
          mode="contained"
          style={{ borderRadius: 20, backgroundColor: "red", marginRight: 10 }}
          onPress={confirmDelete}
        >
          Delete
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
