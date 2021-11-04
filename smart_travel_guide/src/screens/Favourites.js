import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { Config } from "../config/config";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { PublicPlanCard } from "../components/PublicPlansCard";

const Favourites = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${Config.localhost}/user/getPublicTravelPlans`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPlans(result.myPlans);
        setLoading(false);
      });
  }, []);
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
          <ScrollView>
            {plans &&
              plans.map((plan, index) => {
                return (
                  <View
                    key={plan._id}
                    style={{
                      width: "100%",
                      backgroundColor: "#fff",
                      minHeight: 650,
                    }}
                  >
                    <PublicPlanCard
                      _id={plan._id}
                      name={plan.name ? plan.name : "Travel Sri Lanka"}
                      days={plan.travelPlan[0].length}
                      createdDate={plan.createdAt}
                      travelPlan={plan.travelPlan}
                    />
                  </View>
                );
              })}
          </ScrollView>

          {plans && plans.length == 0 ? (
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
                Seems there aren't any shared plans
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

export default Favourites;
