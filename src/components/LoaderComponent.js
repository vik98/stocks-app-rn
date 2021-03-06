import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Circle, Rect } from "react-native-svg";
import ContentLoader from "rn-content-loader";
import LinearGradient from "react-native-linear-gradient";
export const deviceWidth = Dimensions.get("window").width;
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";

const LoaderComponent = (props) => {
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    return (
      <ListItem
        key={props.unique}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
        }}
        onPress={props.onPress}
      >
        <FontAwesome
          name="building-o"
          size={24}
          color="black"
          style={{ paddingTop: 15, paddingLeft: 10 }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ color: "black" }}>
            <Text style={{ fontFamily: "roboto" }}>
              {props.data["2. name"]}
            </Text>
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "black" }}>
            <Text style={{ fontFamily: "roboto" }}>
              {props.data["1. symbol"]}
            </Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>
    );
  }
};

export default LoaderComponent;
