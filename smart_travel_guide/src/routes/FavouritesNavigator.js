import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favourites from "../screens/Favourites";

import { theme } from "../core/theme";

const Stack = createNativeStackNavigator();

export const FavouritesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen name="Favourites" component={Favourites} />
  </Stack.Navigator>
);
