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
          marginRight: 10,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          borderRadius: 5,

          //elevation: 4,
          //backgroundColor: "grey",
          //paddingBottom: 0.2,
          //paddingRight: 0.2,
          elevation: 3,
        }}
      >
        <View style={{ flex: 1.5, backgroundColor: "white" }}>
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
        <View style={{ flex: 1, paddingLeft: 10, backgroundColor: "white" }}>
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
