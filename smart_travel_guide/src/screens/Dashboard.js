import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { DashboardSlider } from "../components/ImageSlider";
import { Card, Button, Paragraph, IconButton } from "react-native-paper";
import { theme } from "../core/theme";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";

export const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DashboardSlider />
      <Card style={styles.card} elevation={8}>
        <Card.Title
          title="TRAVEL SRI LANKA"
          titleStyle={{ textAlign: "center" }}
          style={{
            backgroundColor: theme.colors.primary,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          }}
        />
        <Card.Content style={{ marginVertical: 20 }}>
          <Paragraph style={{ fontSize: 15, textAlign: "center" }}>
            Create your own custom travel plan or use our auto generated travel
            plan according to your preferences.
          </Paragraph>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <FontAwesome5
              name="campground"
              size={30}
              color={theme.colors.primary}
            />
            <FontAwesome5
              name="umbrella-beach"
              size={30}
              color={theme.colors.primary}
            />
            <FontAwesome5 name="tree" size={32} color={theme.colors.primary} />
            <Foundation
              name="mountains"
              size={30}
              color={theme.colors.primary}
            />
          </View>
        </Card.Content>

        <Card.Actions
          style={{ flexDirection: "row", justifyContent: "space-evenly" }}
        >
          <Button
            mode="contained"
            style={{ borderRadius: 20 }}
            onPress={() => {}}
          >
            CUSTOM PLAN
          </Button>
          <Button
            mode="contained"
            style={{ borderRadius: 20 }}
            onPress={() => {
              navigation.navigate("Create New Plan");
            }}
          >
            GENERATE PLAN
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  card: {
    width: "90%",
    minHeight: 300,
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 20,
  },
});
