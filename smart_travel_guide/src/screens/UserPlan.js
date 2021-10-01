import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../context/AppContext";
import { Config } from "../config/config";
import { TravelPlan } from "./TravelPlan";

const SavedPlan = ({ route, navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { title, plan, id } = route.params;

  return <TravelPlan />;
};

export default SavedPlan;
