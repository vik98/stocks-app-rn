import React from "react";
import { Dimensions, StyleShee0t, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Circle, Rect } from "react-native-svg";
import ContentLoader from "rn-content-loader";
import LinearGradient from "react-native-linear-gradient";
export const deviceWidth = Dimensions.get("window").width;
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

const TrendingStockComponent = (props) => {
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
        activeScale={0.95}
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
        }}
        onPress={props.onPress}
      >
        <Ionicons name="ios-trending-up" size={24} color="black" />

        <ListItem.Content>
          <ListItem.Title
            style={{
              color: "black",
            }}
          >
            <Text style={{ fontFamily: "roboto" }}>{props.name}</Text>
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "grey" }}>
            <Text style={{ fontFamily: "roboto" }}>{props.symbol}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>
    );
  }
};

export default TrendingStockComponent;
