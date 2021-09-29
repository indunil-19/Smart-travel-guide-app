import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedPlans from "../screens/SavedPlans";

import { theme } from "../core/theme";

const Stack = createNativeStackNavigator();

export const SavedPlanNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen name="Saved Plan" component={SavedPlans} />
  </Stack.Navigator>
);
