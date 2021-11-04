import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import SavedPlans from "../screens/SavedPlans";

import { TravelPlan } from "../screens/TravelPlan";
import { ProfileScreen } from "../screens/profile";
import { UpdateProfile } from "../screens/updateProfile";
import { AddPlace } from "../screens/AddPlace";
import { NearByHotels } from "../screens/NearByHotels";
import { EditPlan } from "../screens/EditPlan";
import { Route } from "../screens/Route";
import LocationDetail from "../screens/LocationDetail.js";

import { theme } from "../core/theme";
import { HeaderAvatar } from "../components/HeaderAvatar";
import { Notification } from "../components/Notification";

const Stack = createStackNavigator();

export const SavedPlanNavigator = () => (
  <>
    <Notification />
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderAvatar />,
        headerRightContainerStyle: { padding: 10 },
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
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen name="Travel Route" component={Route} />
      <Stack.Screen name="Edit Plan" component={EditPlan} />
      <Stack.Screen
        name="Find Hotels"
        component={NearByHotels}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Add Place"
        component={AddPlace}
        options={{
          presentation: "transparentModal",
          headerShown: false,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="Location Detail"
        component={LocationDetail}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Edit Profile" component={UpdateProfile} />
    </Stack.Navigator>
  </>
);
