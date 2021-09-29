import React, { useState, useEffect } from "react";
import { Chip, Card, Button, ActivityIndicator } from "react-native-paper";

import { View, StyleSheet, ScrollView } from "react-native";

import { getPoiData, getNearByPlaces } from "../services/ViewPOIServices";

import ImageSlider from "../components/ImageSlider";
import { camelCase } from "../core/utils";
import Background from "../components/Background";
import { ReviewSlider } from "../components/ReviewSlider";

import { theme } from "../core/theme";

const LocationDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState({});
  const [location, setLocation] = useState({});
  const [nearByPlaces, setNearByPlaces] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [photos, setPhotos] = useState();

  useEffect(() => {
    getPoiData(id).then((r) => {
      setData(r);
      setLocation(r.geometry.location);
      setPhotos((cur) => {
        var arr = [];

        for (let i = 0; i < r.photos.length; i++) {
          arr.push(r.photos[i].photo_reference);
        }
        // console.log(arr);
        return arr;
      });
    });
  }, [id]);

  useEffect(() => {
    getNearByPlaces(location).then((r) => {
      setNearByPlaces(r);
      // setA(true)
      // console.log(photos.length);
    });
    setLoading(false);
  }, [location]);

  const renderTypes = (types) => {
    return (
      <View style={styles.chipContainer}>
        {types &&
          types.map((type, index) => {
            return (
              <Chip key={index} style={{ margin: 5 }}>
                {camelCase(type)}
              </Chip>
            );
          })}
      </View>
    );
  };

  return (
    <Background>
      <ScrollView>
        {isLoading && (
          <ActivityIndicator animating={true} size={80} theme={theme} />
        )}
        {!isLoading && (
          <View style={styles.container}>
            <ImageSlider photos={photos} />
            {renderTypes(data.types)}
            <Card style={styles.card} elevation={8}>
              <Card.Title title={data.name} subtitle={data.formatted_address} />
              <Card.Content
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {data.opening_hours && (
                  <Chip
                    style={{ maxWidth: "30%" }}
                    icon={
                      data.opening_hours.open_now ? "check-circle" : "close"
                    }
                  >
                    {data.opening_hours.open_now ? "OPEN" : "CLOSED"}
                  </Chip>
                )}
                <Button
                  mode="contained"
                  icon="delete"
                  onPress={() => {
                    console.log(data.reviews);
                  }}
                  color="red"
                  style={{ borderRadius: 20 }}
                >
                  REMOVE
                </Button>
              </Card.Content>
            </Card>
            <ReviewSlider reviews={data.reviews} />
          </View>
        )}
      </ScrollView>
    </Background>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  chipContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-evenly",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 12,
    borderRadius: 10,
  },
});
export default LocationDetail;
