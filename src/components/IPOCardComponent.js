import React from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Font from "expo-font";
import { SimpleLineIcons } from "@expo/vector-icons";
const IPOCardComponent = (props) => {
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
          height: 70,
          width: 380,
          marginLeft: 20,
          marginRight: 10,
          borderWidth: 0.5,
          borderColor: "#dddddd",
          //elevation: 4,
          backgroundColor: "white",
          borderRadius: 5,
          //paddingBottom: 0.2,
          //paddingRight: 0.2,
          elevation: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 2,
            paddingLeft: 10,

            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              alignSelf: "flex-start",
              fontFamily: "roboto",
            }}
          >
            All IPOs
          </Text>
          <Text
            style={{
              paddingTop: 5,
              paddingLeft: 0,
              fontSize: 12,
              alignSelf: "flex-start",
              fontFamily: "roboto",
              color: "grey",
            }}
          >
            Upcoming and Closed IPOs
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <SimpleLineIcons
            name="arrow-right"
            size={20}
            color="black"
            style={{ paddingVertical: 25, paddingHorizontal: 10 }}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default IPOCardComponent;
