import React, { useContext, useState, useEffect } from "react";
import { Text, ActivityIndicator, Divider } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import { getTravelPlan } from "../services/TravelPlanService";
import AppLoading from "expo-app-loading";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";
import { theme } from "../core/theme";
import LocationCard from "../components/LocationCard";

export function TravelPlan() {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [plan, setPlan] = useState([[], []]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (state.travelPlan) {
      setLoading(true);
      setPlan(state.travelPlan);
    } else {
      getTravelPlan(
        "wet",
        [],
        "2",
        "buddhsism",
        [],
        ["ancient", "natural", "parks"]
      ).then((r) => {
        setPlan(r);
        setLoading(true);
        dispatch({ type: "set_travelPlan", payload: { travelPlan: r } });

        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
      });
    }
  }, [state]);

  // const fetchPlan = () => {
  //   getTravelPlan(
  //     state.userPreferences.climate,
  //     state.userPreferences.provinces,
  //     state.userPreferences.days,
  //     state.userPreferences.religion,
  //     state.userPreferences.thingsLike,
  //     state.userPreferences.placesLike
  //   ).then((r) => {
  //     setPlan(r);
  //   });
  // };
  // const handleLoadingError = (error) => {
  //   console.warn(error);
  // };

  // if (isLoading) {
  //   return (
  //     <>
  //       <AppLoading
  //         startAsync={fetchPlan}
  //         onError={handleLoadingError}
  //         onFinish={() => setLoading(false)}
  //       />
  //     </>
  //   );
  // }

  // useEffect(() => {}, [state]);

  const renderItem = ({ item }) => {
    const backgroundColor =
      item.place_id === selectedId ? "#00ff80" : "#638875";
    const color = item.place_id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.place_id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerstyle={styles.planContainer}>
          <ActivityIndicator
            animating={!isLoading}
            size="large"
            theme={theme}
          />
          {plan[0] &&
            plan[0].map((Item = [], index) => {
              return (
                <View key={index}>
                  <Text> Day {index + 1}</Text>
                  <FlatList
                    data={Item}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.place_id}
                  />
                </View>
              );
            })}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },

  planContainer: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
  },

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 15,
  },
});
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);
