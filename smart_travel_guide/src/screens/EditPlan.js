import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  IconButton,
  Snackbar,
  Button,
  Drawer,
  Chip,
  FAB,
  Portal,
  Provider,
} from "react-native-paper";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { DeletePOI, DeleteDay, AddDay } from "../services/EditPlanServices";
import { theme } from "../core/theme";
import { LocationInfoCard } from "../components/LocationInfoCard";

import Background from "../components/Background";

export const EditPlan = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const [plan, setPlan] = useState([[], []]);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [distanceTime, setDistanceTime] = useState({});

  useEffect(() => {
    setPlan(state.travelPlan);
    display(state.travelPlan);
    setLoading(false);
    console.log("hi");
  }, [state]);

  //* Delete a Day
  const deleteDay = (day) => {
    // DeleteDay(day, plan).then((res) => {
    //   dispatch({ type: "set_travelPlan", payload: { travelPlan: res } });
    //   setPlan(res);
    // });
    console.log(distanceTime);
  };

  //* Delete a Point of interest
  const deletePOI = (index, index1) => {
    console.log(state.travelPlan[0].length);
    DeletePOI(index, index1, plan).then((res) => {
      dispatch({ type: "set_travelPlan", payload: { travelPlan: res } });
      setPlan(res);
    });
  };

  //* Add a Day to the plan
  const addDay = () => {
    AddDay(plan).then((res) => {
      dispatch({ type: "set_travelPlan", payload: { travelPlan: res } });
      setPlan(res);
    });
  };

  //* Rendering display data (Section list data and Distance-Time data)
  const display = (r) => {
    setData((curData) => {
      var dataDict = [];
      for (let i = 0; i < r[0].length; i++) {
        dataDict.push({ title: i + 1, data: r[0][i] });
      }

      return dataDict;
    });
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

  //* Section List Item Rendering
  const renderItem = ({ item, index, section }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            margin: 10,
            justifyContent: "space-around",
          }}
        >
          <Chip icon="road-variant">
            {distanceTime[item.place_id] ? distanceTime[item.place_id][0] : ""}
          </Chip>
          <Chip icon="timer">
            {distanceTime[item.place_id] ? distanceTime[item.place_id][1] : ""}
          </Chip>
        </View>
        <FAB
          small
          color="red"
          icon="close-outline"
          onPress={() => deletePOI(section.title - 1, index)}
          style={styles.fab}
        />
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
  const renderDayHeader = (title) => {
    return (
      <>
        {title == 1 ? (
          <Drawer.Item
            style={{ backgroundColor: "#64ffda" }}
            icon="calendar"
            label={"Day " + title}
            active={false}
            right={() => (
              <IconButton
                icon="plus-circle-outline"
                color="black"
                size={22}
                style={{ margin: 0, padding: 0 }}
                onPress={() => {
                  setLoading(true);
                  navigation.navigate("Add Place", {
                    day: title,
                  });
                }}
              />
            )}
          />
        ) : (
          <Drawer.Item
            style={{ backgroundColor: "#64ffda" }}
            icon="calendar"
            label={"Day " + title}
            active={false}
            right={() => (
              <>
                <IconButton
                  icon="plus-circle-outline"
                  color="black"
                  size={22}
                  style={{ margin: 0, padding: 0 }}
                  onPress={() => {
                    if (plan[0][title - 2].length == 0) {
                      navigation.navigate("Add Place", {
                        day: title,
                        message:
                          "Add places to day " +
                          (title - 1) +
                          " first to continue.",
                      });
                    } else {
                      setLoading(true);
                      navigation.navigate("Add Place", { day: title });
                    }
                  }}
                />
                <IconButton
                  icon="delete"
                  color="red"
                  size={22}
                  style={{ margin: 0, padding: 0 }}
                  onPress={() => deleteDay(title)}
                />
              </>
            )}
          />
        )}
      </>
    );
  };
  const renderFooter = () => {
    return (
      <>
        <Button style={{ alignItems: "center" }} onPress={() => addDay()}>
          Add a day
        </Button>
        <Text>Destination Colombo</Text>
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
              renderItem={(item, section, index) =>
                renderItem(item, index, section)
              }
              initialNumToRender={2}
              stickySectionHeadersEnabled={true}
              renderSectionHeader={({ section: { title } }) =>
                renderDayHeader(title)
              }
              ListHeaderComponent={<Text> Starting from colombo</Text>}
              ListFooterComponent={renderFooter()}
            />
          </>
        )}
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    zIndex: 1,
    margin: 16,
    right: -13,
    bottom: 296,
    backgroundColor: "rgba(255, 255, 255, 0.7)",

    elevation: 8,
  },
});
