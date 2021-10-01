import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Avatar, Title, Headline, Button } from "react-native-paper";
import { AppContext } from "../context/AppContext";

export function ProfileScreen(props) {
  const { onLogout, state } = useContext(AppContext);

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <Avatar.Image size={150} source={{ uri: state.pic }} />
      <View style={{ flexDirection: "row", marginTop: 25 }}>
        <Headline>First Name : </Headline>
        <Title>{state.firstname}</Title>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Headline>Last Name : </Headline>
        <Title>{state.lastname}</Title>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Headline>Email : </Headline>
        <Title>{state.email}</Title>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Headline>DOB : </Headline>
        <Title>{state.dob}</Title>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Headline>Country : </Headline>
        <Title>{state.country}</Title>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Headline>Religion : </Headline>
        <Title>{state.religion}</Title>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Headline>Password : </Headline>
        <Title>*******</Title>
      </View>

      <Button
        icon="update"
        mode="contained"
        onPress={() => props.navigation.navigate("updateProfile")}
      >
        edit
      </Button>
      <Button icon="update" mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
}
