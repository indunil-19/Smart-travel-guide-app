import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Snackbar,
  Drawer,
  Chip,
  FAB,
  Portal,
  Provider,
} from "react-native-paper";
import { AppContext } from "../context/AppContext";
import { getTravelPlan } from "../services/TravelPlanService";
import { Config } from "../config/config";
import { useIsFocused } from "@react-navigation/native";

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
  const [fabOpen, setFABOpen] = useState({ open: false });
  const { open } = fabOpen;
  const isFocused = useIsFocused();

  const onStateChange = ({ open }) => {
    setFABOpen({ open });
  };

  const display = (r) => {
    setData((curData) => {
      var dataDict = [];
      for (let i = 0; i < r[0].length; i++) {
        dataDict.push({ title: i + 1, data: r[0][i] });
      }

      return dataDict;
    });
    // Distance and Duration
    setDistanceTime((curData) => {
      var index = 0;
      var disTime = {};
      for (let i = 0; i < r[0].length; i++) {
        for (let j = 0; j < r[0][i].length; j++) {
          index = index + 1;
          disTime[r[0][i][j].place_id] = [
            r[1][index - 1].distance.text,
            r[1][index - 1].duration.text,
          ];
        }
      }
      return disTime;
    });
  };

  useEffect(() => {
    if (state.travelPlan) {
      setLoading(false);
      // console.log(plan.length);

      setPlan(state.travelPlan);
      display(state.travelPlan);
    } else {
      getTravelPlan(
        "wet",
        [],
        "2",
        "buddhsism",
        [],
        ["ancient", "natural", "parks"]
        // state.userPreferences.climate,
        // state.userPreferences.provinces,
        // state.userPreferences.days,
        // state.userPreferences.religion,
        // state.userPreferences.thingsLike,
        // state.userPreferences.placesLike
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
        setDistanceTime((curData) => {
          var index = 0;
          var disTime = {};
          for (let i = 0; i < r[0].length; i++) {
            for (let j = 0; j < r[0][i].length; j++) {
              index = index + 1;
              disTime[r[0][i][j].place_id] = [
                r[1][index - 1].distance.text,
                r[1][index - 1].duration.text,
              ];
            }
          }
          return disTime;
        });
        setLoading(false);
        dispatch({ type: "set_travelPlan", payload: { travelPlan: r } });
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
          // ! Add a error
          console.log(data.error);
        } else {
          // ! Add a save confirm
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Location Detail", {
              id: item.place_id,
              name: item.name,
            });
          }}
        >
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

            <Portal>
              <FAB.Group
                open={open}
                icon={open ? "calendar-today" : "plus"}
                style={{ paddingBottom: 40 }}
                visible={isFocused}
                actions={[
                  {
                    icon: "map-marker",
                    label: "Route",
                    onPress: () => navigation.navigate("Travel Route"),
                  },
                  {
                    icon: "circle-edit-outline",
                    label: "Edit Plan",
                    onPress: () => navigation.navigate("Edit Plan"),
                  },
                  {
                    icon: "bookmark-outline",
                    label: "Save Plan",
                    onPress: () => confirmSave(),
                  },
                ]}
                onStateChange={onStateChange}
              />
            </Portal>
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
});
