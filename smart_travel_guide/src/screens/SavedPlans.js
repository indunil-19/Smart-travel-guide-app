import React, { useState, useEffect, useContext } from "react";
import {
  RefreshControl,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { ActivityIndicator, Title } from "react-native-paper";
import Background from "../components/Background";
import { Config } from "../config/config";
import { PlanCard } from "../components/PlanCard";
import { theme } from "../core/theme";
import { AppContext } from "../context/AppContext";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const SavedPlans = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Config.localhost}/user/getTravelPlans`)
      .then((res) => res.json())
      .then((result) => {
        setPlans(result.myPlans);
        setLoading(false);
      });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(`${Config.localhost}/user/getTravelPlans`)
      .then((res) => res.json())
      .then((result) => {
        setPlans(result.myPlans);
        setLoading(false);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const showDeleteAlert = () => {
    dispatch({
      type: "set_notification",
      payload: {
        notification: {
          message: "Deleted Successfully",
          icon: "delete-outline",
        },
      },
    });
  };

  const updatePlans = (result) => {
    setPlans((curPlans) => {
      const newPlans = curPlans.filter((plan) => {
        return plan._id != result._id;
      });
      return newPlans;
    });
  };
  return (
    <>
      {isLoading && (
        <View style={styles.container}>
          <ActivityIndicator animating={true} size={80} theme={theme} />
        </View>
      )}

      {!isLoading && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {!isLoading &&
              plans.map((plan, index) => {
                return (
                  <View
                    key={plan._id}
                    style={{ width: "100%", backgroundColor: "#fff" }}
                  >
                    <PlanCard
                      _id={plan._id}
                      name={plan.name ? plan.name : `My plan ${index + 1}`}
                      days={plan.travelPlan[0].length}
                      createdDate={plan.createdAt}
                      travelPlan={plan.travelPlan}
                      onDelete={updatePlans}
                      displayAlert={showDeleteAlert}
                    />
                  </View>
                );
              })}
          </ScrollView>
          {plans.length == 0 ? (
            <View
              style={{
                height: "100%",
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingTop: 10,
              }}
            >
              <Image
                style={{ width: 250, height: 250 }}
                source={require("../assets/img/travel.png")}
              />
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Seems like you dont have any saved plans
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default SavedPlans;
