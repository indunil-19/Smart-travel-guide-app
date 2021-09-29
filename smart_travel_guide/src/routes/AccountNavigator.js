import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";

import { theme } from "../core/theme";

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
