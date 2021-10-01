import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar, Title, Headline, Button, Card } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import Background from "../components/Background";
import { theme } from "../core/theme";
export function ProfileScreen(props) {
  const { onLogout, state } = useContext(AppContext);
  const renderAvatar = () => {
    if (state.pic) {
      return <Avatar.Image size={150} source={{ uri: state.pic }} />;
    } else {
      return (
        <Avatar.Icon
          size={150}
          icon="account"
          color="white"
          style={{ backgroundColor: theme.colors.primary }}
        />
      );
    }
  };
  return (
    <Background>
      {renderAvatar()}
      <Card style={styles.card} elevation={8}>
        <Card.Content style={{ alignItems: "center", marginVertical: 25 }}>
          <Title>First Name : {state.firstname}</Title>
          <Title>Last Name :{state.lastname}</Title>
          <Title>Date of Birth : {state.dob}</Title>
          <Title>Country : {state.country}</Title>
          <Title>Religion : {state.religion}</Title>
        </Card.Content>
        <Card.Actions
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <Button
            icon="update"
            mode="contained"
            labelStyle={{ color: "white" }}
            style={{ borderRadius: 20, marginLeft: 10 }}
            onPress={() => props.navigation.navigate("Edit Profile")}
          >
            edit
          </Button>
          <Button
            icon="update"
            mode="contained"
            labelStyle={{ color: "white" }}
            style={{
              borderRadius: 20,
              backgroundColor: "red",
              marginRight: 10,
            }}
            onPress={() => {
              onLogout();
            }}
          >
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </Background>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    borderRadius: 20,
  },
});
