import React from "react";

import { BottomNavigation } from "react-native-paper";
import AddPlan from "./AddPlan";
import SavedPlans from "./SavedPlans";
import Map from "./Map";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AddPlanStack = createNativeStackNavigator();

function AddPlanStackScreen() {
  return (
    <AddPlanStack.Navigator>
      <AddPlanStack.Screen name="Create New Plan" component={AddPlan} />
      <AddPlanStack.Screen name="Details" component={Map} />
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
