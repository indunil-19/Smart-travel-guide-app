import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedPlans from "../screens/SavedPlans";
import { ProfileScreen } from "../screens/Profile";

import { theme } from "../core/theme";
import { HeaderAvatar } from "../components/HeaderAvatar";

const Stack = createNativeStackNavigator();

export const SavedPlanNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerRight: () => <HeaderAvatar />,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen name="Saved Plan" component={SavedPlans} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
