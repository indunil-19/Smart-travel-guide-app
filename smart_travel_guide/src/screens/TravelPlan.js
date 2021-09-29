import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator, Drawer, Chip, FAB } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import { getTravelPlan } from "../services/TravelPlanService";

import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import Background from "../components/Background";

import { LocationInfoCard } from "../components/LocationInfoCard";

import { theme } from "../core/theme";

export function TravelPlan({ navigation }) {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [plan, setPlan] = useState([[], []]);
  const [data, setData] = useState([]);
  const [distanceTime, setDistanceTime] = useState({});

  useEffect(() => {
    if (state.travelPlan) {
      setLoading(true);
      setPlan(state.travelPlan);
    } else {
      getTravelPlan(
        "wet",
        [],
        "3",
        "buddhsism",
        [],
        ["ancient", "natural", "parks"]
      ).then((r) => {
        setPlan(r);
        setData((curData) => {
          var dataDict = [];
          for (let i = 0; i < r[0].length; i++) {
            dataDict.push({ title: i + 1, data: r[0][i] });
          }

          return dataDict;
        });
        // Distance and Duration
        var index = 0;

        for (let i = 0; i < r[0].length; i++) {
          for (let j = 0; j < r[0][i].length; j++) {
            index = index + 1;
            setDistanceTime((curData) => {
              curData[r[0][i][j].place_id] = [
                r[1][index - 1].distance.text,
                r[1][index - 1].duration.text,
              ];

              return curData;
            });
          }
        }
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

  const renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Location Detail", {
              id: item.place_id,
              name: item.name,
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              justifyContent: "space-around",
            }}
          >
            <Chip icon="road-variant">{distanceTime[item.place_id][0]}</Chip>
            <Chip icon="timer">{distanceTime[item.place_id][1]}</Chip>
          </View>

          <LocationInfoCard location={item} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        {!isLoading && (
          <ActivityIndicator animating={true} size={80} theme={theme} />
        )}

        {isLoading && (
          <>
            <SectionList
              sections={data}
              keyExtractor={(item) => item.place_id}
              renderItem={(item, index) => renderItem(item, index)}
              initialNumToRender={2}
              stickySectionHeadersEnabled={true}
              renderSectionHeader={({ section: { title } }) => (
                <Drawer.Item
                  style={{ backgroundColor: "#64ffda" }}
                  icon="calendar"
                  label={"Day " + title}
                  active={false}
                />
              )}
            />
            <FAB
              style={styles.fab}
              large
              icon="bookmark-outline"
              onPress={() => console.log("Pressed")}
            />
          </>
        )}
      </SafeAreaView>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
