import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedPlans from "../screens/SavedPlans";
import UserPlan from "../screens/UserPlan";
import { TravelPlan } from "../screens/TravelPlan";
import { ProfileScreen } from "../screens/profile";
import { UpdateProfile } from "../screens/updateProfile";

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
    <Stack.Screen
      name="My Plans"
      component={SavedPlans}
      options={{ title: "Saved Plans" }}
    />
    <Stack.Screen
      name="User Plan"
      component={TravelPlan}
      options={({ route }) => ({ title: route.params.title })}
    />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Edit Profile" component={UpdateProfile} />
  </Stack.Navigator>
);
