import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Favourites from "../screens/Favourites";
import { ProfileScreen } from "../screens/profile";
import { UpdateProfile } from "../screens/updateProfile";

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
    <Stack.Screen name="Top Rated Plans" component={Favourites} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Edit Profile" component={UpdateProfile} />
  </Stack.Navigator>
);
