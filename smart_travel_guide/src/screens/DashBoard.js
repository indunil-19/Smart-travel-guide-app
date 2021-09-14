import React from "react";

import Background from "../components/Background";
import PreferenceCard from "../components/PreferenceCard";
import { BottomNavigation, Text } from "react-native-paper";
import AddPlan from "./AddPlan";
import SavedPlans from "./SavedPlans";
import Map from "./Map";

const DashBoardScreen = (props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "savedPlans", title: "Saved Plans", icon: "bookmark-outline" },
    { key: "addPlan", title: "Add Plan", icon: "plus-circle-outline" },
    { key: "map", title: "Map", icon: "map-marker-outline" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    savedPlans: SavedPlans,
    addPlan: AddPlan,
    map: Map,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default DashBoardScreen;
