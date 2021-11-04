import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { Card, Title, Button, IconButton } from "react-native-paper";
import { AppContext } from "../context/AppContext";

import { Config } from "../config/config";
import { theme } from "../core/theme";
import { useNavigation } from "@react-navigation/native";
import Dialog from "react-native-dialog";
import TextInput from "./TextInput";

export const PlanCard = ({
  _id = "",
  name,
  days,
  createdDate,
  onDelete,
  travelPlan,
  displayAlert,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation();
  const [randomInt, setRandomInt] = useState();
  const [visible, setVisible] = useState(false);
  const [planName, setPlanName] = useState({ name: "", error: "" });
  const [displayName, setDisplayName] = useState(name);

  useEffect(() => {
    setRandomInt(Math.floor(Math.random() * 6));
  }, []);

  const links = [
    require("../assets/img/1.jpg"),
    require("../assets/img/2.jpg"),
    require("../assets/img/3.jpg"),
    require("../assets/img/4.jpg"),
    require("../assets/img/5.jpg"),
    require("../assets/img/6.jpg"),
  ];
  const showDialog = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const changeName = () => {
    if (planName && planName.name.length != 0) {
      fetch(`${Config.localhost}/user/changePlanName`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: _id,
          name: planName.name,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.error) {
            dispatch({
              type: "set_notification",
              payload: {
                notification: {
                  message: result.error,
                  icon: "alert-octagon-outline",
                },
              },
            });
          } else {
            dispatch({
              type: "set_notification",
              payload: {
                notification: {
                  message: result.message,
                  icon: "check-circle-outline",
                },
              },
            });
            setDisplayName(planName.name);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(planName);
      showDialog();
    } else {
      setPlanName((cur) => {
        return { name: cur.name, error: "Plan name cannot be empty." };
      });
      return;
    }
  };

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
          displayAlert();
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
        source={links[randomInt]}
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      />
      <Card.Title
        title={displayName}
        subtitle={createdDate}
        right={() => (
          <>
            <IconButton
              icon="circle-edit-outline"
              color={theme.colors.primary}
              size={25}
              onPress={() => showDialog()}
            />
            <Dialog.Container
              onBackdropPress={() => {
                showDialog();
              }}
              visible={visible}
              style={{ borderRadius: 20 }}
            >
              <Dialog.Title>Change Name of {displayName}</Dialog.Title>
              <TextInput
                placeholder="Enter new Name"
                onChangeText={(text) => {
                  setPlanName({ name: text, error: "" });
                }}
                error={planName.error}
                errorText={planName.error}
              />

              <Dialog.Button label="Cancel" color="red" onPress={showDialog} />
              <Dialog.Button
                label="Confirm"
                onPress={() => {
                  changeName();
                }}
              />
            </Dialog.Container>
          </>
        )}
      />
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
            dispatch({
              type: "set_editPlan",
              payload: { editPlan: travelPlan },
            });
            dispatch({ type: "set_planId", payload: { planId: _id } });
            navigation.navigate("User Plan", {
              title: name,
              plan: travelPlan,
              id: _id,
              permissions: "editSaved",
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
