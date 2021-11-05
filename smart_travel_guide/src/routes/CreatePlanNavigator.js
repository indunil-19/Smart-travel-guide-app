import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import PreferenceSelection from "../screens/PreferenceSelection";
import { TravelPlan } from "../screens/TravelPlan";
import { Route } from "../screens/Route";
import { Provinces } from "../screens/Provinces";
import LocationDetail from "../screens/LocationDetail.js";
import { Dashboard } from "../screens/Dashboard";
import { ProfileScreen } from "../screens/profile";
import { UpdateProfile } from "../screens/updateProfile";
import { EditPlan } from "../screens/EditPlan";
import { AddPlace } from "../screens/AddPlace";
import { NearByHotels } from "../screens/NearByHotels";
import { ResetPassword } from "../screens/ResetPassword";

import { HeaderAvatar } from "../components/HeaderAvatar";

import { theme } from "../core/theme";
import { Notification } from "../components/Notification";

const Stack = createStackNavigator();

export const CreatePlanNavigator = () => {
  return (
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
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Profile" component={UpdateProfile} />
        <Stack.Screen
          name="Change Password"
          component={ResetPassword}
          options={{
            presentation: "transparentModal",
            headerShown: false,
            cardOverlayEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />
        <Stack.Screen name="Create New Plan" component={PreferenceSelection} />
        <Stack.Screen
          name="Travel Plan"
          component={TravelPlan}
          options={{ headerBackVisible: false }}
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

        <Stack.Screen name="Provinces" component={Provinces} />
      </Stack.Navigator>
    </>
  );
};
