import React, { useContext, useState, useEffect } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { AppContext } from "../context/AppContext";
import MapView, { Marker, Polyline, Callout } from "react-native-maps";

export const Route = () => {
  const { state, dispatch } = useContext(AppContext);
  const [plan, setPlan] = useState([[[]], []]);

  useEffect(() => {
    setPlan(state.travelPlan);
  }, [state.travelPlan]);

  const path = [{ latitude: 6.927079, longitude: 79.85775 }];
  return (
    <MapView
      maxZoomLevel={8}
      style={styles.container}
      initialRegion={{
        latitude: 7.291418,
        longitude: 80.636696,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        pinColor={"#000000"}
        coordinate={{ latitude: 6.927079, longitude: 79.85775 }}
      />
      {plan &&
        plan[0].map((item = [], index) => {
          return (
            <>
              {item.map((subitem, index) => {
                path.push({
                  latitude: subitem.geometry.location.lat,
                  longitude: subitem.geometry.location.lng,
                });

                return (
                  <>
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: subitem.geometry.location.lat,
                        longitude: subitem.geometry.location.lng,
                      }}
                    >
                      <Callout
                        onPress={() => {
                          console.log(subitem.photos[0].photo_reference);
                        }}
                      >
                        <CompactLocationInfo
                          name={subitem.name}
                          imgRef={subitem.photos[0].photo_reference}
                        />
                      </Callout>
                    </Marker>
                  </>
                );
              })}
              {console.log(path)}
            </>
          );
        })}
      <Polyline coordinates={path} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  item: {
    padding: 10,
    maxWidth: 120,
    height: 100,
  },
  image: {
    borderRadius: 10,
    width: 120,
    height: 100,
    resizeMode: "cover",
  },
});

const CompactLocationInfo = ({ name, imgRef }) => {
  return (
    <Card>
      <Card.Cover
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${imgRef}&key=AIzaSyChMTwAb_hWwYdvcM_gSGcx84k_al-EtIA`,
        }}
      />
      <Card.Title title={name} />
    </Card>
  );
};
