import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favourites from "../screens/Favourites";
import { ProfileScreen } from "../screens/Profile";

import { theme } from "../core/theme";
import { HeaderAvatar } from "../components/HeaderAvatar";

const Stack = createNativeStackNavigator();

export const FavouritesNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerRight: () => <HeaderAvatar />,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
    }}
  >
    <Stack.Screen name="Favourites" component={Favourites} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);
