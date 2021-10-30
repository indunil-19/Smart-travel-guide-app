import React, { useEffect, useState, useContext } from "react";
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
import { getNearByHotels } from "../services/ViewPOIServices";
import { theme } from "../core/theme";
import { AppContext } from "../context/AppContext";
import { LocationInfoCard } from "../components/LocationInfoCard";

export const NearByHotels = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    getNearByHotels({ lat: 6.927079, lng: 79.85775 }).then((r) => {
      setData(r);
    });
  }, [state.accomodation_location]);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
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
          alignItems: "stretch",
          paddingHorizontal: 10,
          paddingTop: 10,
          height: "70%",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        {!data && (
          <>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../assets/img/traveller.png")}
            />
            <ActivityIndicator animating={true} size={80} theme={theme} />
          </>
        )}
        {data && (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.place_id + index}
            ListHeaderComponent={
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Title
                  style={{ color: theme.colors.primary, alignItems: "center" }}
                >
                  LOOK UP HOTELS
                </Title>
              </View>
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Location Detail", {
                    id: item.place_id,
                    name: item.name,
                  });
                }}
              >
                <LocationInfoCard
                  location={item}
                  photo={item.photos ? item.photos[0].photo_reference : ""}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};
