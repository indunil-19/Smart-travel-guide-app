import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, Colors } from "react-native-paper";

import PreferenceSelection from "../screens/PreferenceSelection";
import { TravelPlan } from "../screens/TravelPlan";
import { Provinces } from "../screens/Provinces";
import LocationDetail from "../screens/LocationDetail.js";
import { Dashboard } from "../screens/Dashboard";

import { theme } from "../core/theme";

const Stack = createNativeStackNavigator();

export const CreatePlanNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerRight: () => (
        <IconButton
          icon="account"
          color="white"
          size={20}
          onPress={() => console.log("Pressed")}
        />
      ),
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Create New Plan" component={PreferenceSelection} />
    <Stack.Screen
      name="Travel Plan"
      component={TravelPlan}
      options={{ headerBackVisible: false }}
    />
    <Stack.Screen
      name="Location Detail"
      component={LocationDetail}
      options={({ route }) => ({ title: route.params.name })}
    />

    <Stack.Screen name="Provinces" component={Provinces} />
  </Stack.Navigator>
);
