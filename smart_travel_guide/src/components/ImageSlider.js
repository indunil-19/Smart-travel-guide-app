import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { scrollInterpolator, animatedStyles } from "../core/animation";
import { Card } from "react-native-paper";
import { Button } from "react-native-paper";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const ImageSlider = (props) => {
  const [imgRef, setImgRef] = useState([]);

  const [refLoading, setRefLoading] = useState(true);
  useEffect(() => {
    setImgRef((cur) => props.photos);
    setRefLoading(false);
  }, [props.photos]);

  const render = ({ item, index }) => {
    return (
      <>
        {!refLoading && (
          <View style={styles.itemContainer}>
            <Image
              fadeDuration={2000} //* image fade in duration on 1st load after that image is cached in memory used in networkloaded images can be also used in loacl images
              source={{
                uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${imgRef[index]}&key=AIzaSyCB9FiwGVeEmdfBAwxiQpPuz0fsDMiwPWY`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      </>
    );
  };
  return (
    <>
      {!refLoading && (
        <View style={{ width: "100%" }}>
          <Carousel
            data={props.photos}
            layout={"stack"}
            renderItem={render}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    width: 250,
  },
  carouselContainer: {
    marginVertical: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    width: " 100%",
    height: "100%",
    borderRadius: 5,
  },
  itemLabel: {
    color: "white",
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ImageSlider;
