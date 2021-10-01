import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Background from "../components/Background";
import { Config } from "../config/config";
import { PlanCard } from "../components/PlanCard";
import { theme } from "../core/theme";
const SavedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${Config.localhost}/user/getTravelPlans`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPlans(result.myPlans);
        setLoading(false);
      });
  }, []);
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
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator animating={true} size={80} theme={theme} />
        )}
      </View>
      {!isLoading && (
        <ScrollView>
          <Background>
            {!isLoading &&
              plans.map((plan, index) => {
                return (
                  <View key={plan._id} style={{ width: "100%" }}>
                    <PlanCard
                      _id={plan._id}
                      name={plan.name ? plan.name : `My plan ${index + 1}`}
                      days={plan.travelPlan[0].length}
                      createdDate={plan.createdAt}
                      travelPlan={plan.travelPlan}
                      onDelete={updatePlans}
                    />
                  </View>
                );
              })}

            {/* {plans && (
        <FlatList
          data={plans}
          renderItem={(item, index) => {
            item && (
              <PlanCard
                _id={item._id}
                name={item.name ? item.name : `My plan ${index + 1}`}
                days={item.travelPlan[0].length}
                createdDate={item.createdAt}
                travelPlan={item.travelPlan}
              />
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )} */}
          </Background>
        </ScrollView>
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
