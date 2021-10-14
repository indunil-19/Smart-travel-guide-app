import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Snackbar,
  Drawer,
  Chip,
  FAB,
} from "react-native-paper";
import { AppContext } from "../context/AppContext";
import { getTravelPlan } from "../services/TravelPlanService";
import { Config } from "../config/config";

import {
  SafeAreaView,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Background from "../components/Background";

import { LocationInfoCard } from "../components/LocationInfoCard";

import { theme } from "../core/theme";

export function TravelPlan({ navigation }) {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = useState(true);
  const [plan, setPlan] = useState([[], []]);
  const [data, setData] = useState([]);
  const [distanceTime, setDistanceTime] = useState({});

  const display = (r) => {
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
  };

  useEffect(() => {
    if (state.travelPlan) {
      setLoading(false);
      // console.log(plan.length);

      setPlan(state.travelPlan);
      display(state.travelPlan);
    } else {
      getTravelPlan(
        state.userPreferences.climate,
        state.userPreferences.provinces,
        state.userPreferences.days,
        state.userPreferences.religion,
        state.userPreferences.thingsLike,
        state.userPreferences.placesLike
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
        var index = -1;

        for (let i = 0; i < r[0].length; i++) {
          for (let j = 0; j < r[0][i].length; j++) {
            index = index + 1;

            setDistanceTime((curData) => {
              console.log(r[1][index].distance.text);
              curData[r[0][i][j].place_id] = [
                r[1][index].distance.text,
                r[1][index].duration.text,
              ];

              return curData;
            });
          }
        }
        setLoading(false);
        dispatch({ type: "set_travelPlan", payload: { travelPlan: r } });

        //  console.log(r[0][0][0].photos[0].photo_reference)
        // "wet",[],"2","buddhsism",[],["ancient", "natural", "parks"]
        // state.userPreferences.climate,state.userPreferences.provinces,state.userPreferences.days,state.userPreferences.religion,state.userPreferences.thingsLike,state.userPreferences.placesLike
      });
    }
  }, [state]);
  const confirmSave = () => {
    Alert.alert(
      "Do you want to save this plan ?",
      "Press Confirm to save the travel plan.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            savePlan();
          },
        },
      ]
    );
  };

  const savePlan = () => {
    fetch(`${Config.localhost}/user/saveTravelPlan`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        travelPlan: state.travelPlan,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          navigation.navigate("Dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {isLoading && (
          <ActivityIndicator animating={true} size={80} theme={theme} />
        )}

        {!isLoading && (
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
              style={styles.fabOne}
              large
              icon="circle-edit-outline"
              onPress={() => console.log("Edit Screen")}
            />
            <FAB
              style={styles.fabTwo}
              large
              icon="bookmark-outline"
              onPress={() => confirmSave()}
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
  fabOne: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
  },
  fabTwo: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
