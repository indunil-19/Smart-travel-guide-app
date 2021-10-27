import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import {
  ActivityIndicator,
  Title,
  Button,
  FAB,
  Portal,
  Provider,
} from "react-native-paper";
import { AppContext } from "../context/AppContext";
import { theme } from "../core/theme";
import { findPois, addPoiToPlan } from "../services/EditPlanServices";
import { LocationInfoCard } from "../components/LocationInfoCard";

export const AddPlace = ({ route, navigation }) => {
  const { day, message } = route.params;
  const { state, dispatch } = useContext(AppContext);
  const [pois, setPois] = useState([]);
  const [travelRoute, setTravelRoute] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    findPois(day, state.travelPlan, state.allpois).then((res) => {
      //   console.log(res);
      setPois(res[0]);
      setTravelRoute(res[1]);
      setLoading(false);
    });
  }, [state]);

  const addPoi = (day, poi, travelRoute) => {
    addPoiToPlan(day, poi, travelRoute, state.travelPlan).then((res) => {
      console.log(res);
      dispatch({ type: "set_travelPlan", payload: { travelPlan: res } });
      navigation.pop();
    });
    // navigation.pop();
  };

  const renderLocationCard = (pois) => {
    return (
      <FlatList
        data={pois}
        ListHeaderComponent={
          <Title style={{ color: theme.colors.primary, alignItems: "center" }}>
            ADD A PLACE
          </Title>
        }
        initialNumToRender={10}
        keyExtractor={({ item, index }) => index}
        renderItem={({ item, index }) => (
          <View style={{ marginVertical: 10 }}>
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
            <FAB
              icon="plus"
              onPress={() => {
                addPoi(day, item, travelRoute[index]);
              }}
              style={styles.fab}
            />
          </View>
        )}
      />
    );
  };

  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <Pressable
        style={[StyleSheet.absoluteFill]}
        onPress={navigation.goBack}
      />
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "space-evenly",
          alignItems: pois.length == 0 ? "center" : "stretch",
          paddingHorizontal: 10,
        }}
      >
        {isLoading && (
          <>
            {message && (
              <>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={require("../assets/img/travel.png")}
                />
                <Title>{message}</Title>
              </>
            )}
            {!message && (
              <>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={require("../assets/img/traveller.png")}
                />
                <ActivityIndicator animating={true} size={80} theme={theme} />
              </>
            )}
          </>
        )}
        {!isLoading && (
          <>
            {pois.length == 0 && (
              <>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={require("../assets/img/holidays.png")}
                />
                <Title>
                  Day {day} is already busy. Add places to another day if you
                  want to explore more.
                </Title>
              </>
            )}
            {pois.length != 0 && (
              <View styles={{ width: "100%" }}>{renderLocationCard(pois)}</View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    zIndex: 1,
    margin: 16,
    right: 140,
    bottom: 285,
  },
});
