import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const StockCardComponent = (props) => {
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  let color = "red";
  let sign = "-";
  if (props.change > 0) {
    color = "green";
    sign = "+";
  }
  if (!loaded) {
    return null;
  } else {
    return (
      <View
        style={{
          height: 130,
          width: 130,
          marginLeft: 20,
          marginRight: 10,
          borderWidth: 0.7,
          borderColor: "#dddddd",
          borderRadius: 2,
          //elevation: 4,
          //backgroundColor: "grey",
          //paddingBottom: 0.2,
          //paddingRight: 0.2,
          elevation: 3,
        }}
      >
        <View style={{ flex: 1.5, backgroundColor: "white" }}>
          {/* <SimpleLineIcons
            name="organization"
            size={24}
            color="black"
            style={{ paddingTop: 15, paddingLeft: 10 }}
          /> */}
          <FontAwesome
            name="building-o"
            size={24}
            color="black"
            style={{ paddingTop: 15, paddingLeft: 10 }}
          />
          <Text
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              fontSize: 13,
              alignSelf: "flex-start",
              fontFamily: "roboto",
            }}
          >
            {props.name}
          </Text>
        </View>
        <View style={{ flex: 1, paddingLeft: 10, backgroundColor: "white" }}>
          <Text
            style={{
              fontSize: 13,
              alignSelf: "flex-start",
              fontFamily: "roboto",
            }}
          >
            $ {props.value}
          </Text>
          <Text
            style={{
              paddingTop: 3,
              paddingLeft: 2,
              fontSize: 12,
              alignSelf: "flex-start",
              fontFamily: "roboto",
              color: color,
            }}
          >
            {sign} {Math.abs(props.change)}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default StockCardComponent;
