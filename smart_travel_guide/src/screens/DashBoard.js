import React from "react";

import { BottomNavigation } from "react-native-paper";
import PreferenceSelection from "./PreferenceSelection";
import SavedPlans from "./SavedPlans";
import Map from "./Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "../core/theme";
import { TravelPlan } from "./TravelPlan";
import { Provinces } from "./Provinces";
import AppLoading from "./AppLoading";

const AddPlanStack = createNativeStackNavigator();

function AddPlanStackScreen() {
  return (
    <AddPlanStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <AddPlanStack.Screen
        name="Create New Plan"
        component={PreferenceSelection}
      />
      <AddPlanStack.Screen
        name="Travel Plan"
        component={TravelPlan}
        options={{ headerBackVisible: false }}
      />
      <AddPlanStack.Screen name="Provinces" component={Provinces} />
      <AddPlanStack.Screen name="App Loading" component={AppLoading} />
    </AddPlanStack.Navigator>
  );
}

const DashBoardScreen = (props) => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: "savedPlans", title: "Saved Plans", icon: "bookmark-outline" },
    { key: "addPlan", title: "Add Plan", icon: "plus-circle-outline" },
    { key: "map", title: "Map", icon: "map-marker-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    addPlan: AddPlanStackScreen,
    savedPlans: SavedPlans,
    map: Map,
  });

  return (
    <BottomNavigation
      in
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default DashBoardScreen;
