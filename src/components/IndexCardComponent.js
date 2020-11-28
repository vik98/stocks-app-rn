import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
const IndexCardComponent = (props) => {
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    return (
      <View
        style={{
          height: 130,
          width: 170,
          marginLeft: 20,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "black",
          shadowOpacity: 0.1,
        }}
      >
        <View style={{ flex: 1.5 }}>
          <Text
            style={{
              paddingTop: 10,
              paddingLeft: 10,
              fontSize: 18,
              alignSelf: "flex-start",
              fontFamily: "roboto",
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              paddingTop: 6,
              paddingLeft: 12,
              fontSize: 10,
              alignSelf: "flex-start",
              fontFamily: "roboto",
              color: "grey",
            }}
          >
            {props.index}
          </Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text
            style={{
              fontSize: 14,
              alignSelf: "flex-start",
              fontFamily: "roboto",
            }}
          >
            $ {props.value}
          </Text>
          <Text
            style={{
              paddingTop: 5,
              paddingLeft: 3,
              fontSize: 12,
              alignSelf: "flex-start",
              fontFamily: "roboto",
              color: "red",
            }}
          >
            - {props.change}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default IndexCardComponent;
