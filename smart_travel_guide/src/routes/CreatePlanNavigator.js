import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PreferenceSelection from "../screens/PreferenceSelection";
import { TravelPlan } from "../screens/TravelPlan";
import { Provinces } from "../screens/Provinces";
import LocationDetail from "../screens/LocationDetail.js";
import { Dashboard } from "../screens/Dashboard";
import { ProfileScreen } from "../screens/Profile";
import { HeaderAvatar } from "../components/HeaderAvatar";

import { theme } from "../core/theme";

const Stack = createNativeStackNavigator();

export const CreatePlanNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderAvatar />,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
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
};
