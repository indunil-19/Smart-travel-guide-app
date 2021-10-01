import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CreatePlanNavigator } from "./CreatePlanNavigator";
import { SavedPlanNavigator } from "./SavedPlanNavigator";
import { FavouritesNavigator } from "./FavouritesNavigator";

import { theme } from "../core/theme";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Add Plan"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Saved Plans"
        component={SavedPlanNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bookmark-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Plan"
        component={CreatePlanNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};