import React, { Component, ActivityIndicator, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import TypeWriter from "react-native-typewriter";
import * as Font from "expo-font";
import Spacer from "../components/Spacer";

const IOS_CLIENT_ID =
  "899650021977-127mp8q8ktn0m75iip4v28e1q3tgreia.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "899650021977-ref8rip9ua3bf0a31ku2v0g526ab8ta3.apps.googleusercontent.com";

const LoginScreen = (props) => {
  const [index, setIndex] = useState(1);
  const [text, setText] = useState("Stocks");
  const list = [
    "Stocks  ",
    "Market  ",
    "Graphs  ",
    "Analysis  ",
    "Candle Stick  ",
    "Line Chart  ",
    "News  ",
    "Portfolio  ",
  ];
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  const colors = ["#413075", "black"];
  const [color, setColor] = useState("black");
  if (!loaded) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/hypersonix.png")}
          style={styles.image}
        />
        <Text
          style={{
            fontFamily: "robotothin",
            fontSize: 60,
            alignSelf: "flex-start",
            paddingLeft: 30,
          }}
        >
          Easy, Peasy
        </Text>
        <Text
          style={{
            fontFamily: "roboto",
            fontSize: 40,
            alignSelf: "flex-start",
            paddingLeft: 35,
            color: "black",
          }}
        >
          Lemon Squeezy
        </Text>
        <Spacer />
        {/* <Button
        title="Login "
        onPress={() => props.navigation.navigate("ResolveAuth")}
      /> */}
        <TypeWriter
          typing={index}
          onTypingEnd={() => {
            if (index == 1) {
              setIndex(-1);
            } else {
              setText(
                list[Math.floor(Math.random() * (list.length - 0 + 1)) + 0]
              );
              setIndex(1);
              setColor(
                colors[Math.floor(Math.random() * (colors.length - 0 + 1)) + 0]
              );
            }
          }}
          minDelay={50}
          style={{
            fontFamily: "robotolight",
            fontSize: 30,
            alignSelf: "flex-start",
            paddingLeft: 35,
            fontWeight: "normal",
            color: "black",
            textDecorationLine: "underline",
          }}
        >
          {text}
        </TypeWriter>
        <Spacer />
        <Spacer />
        <Spacer />
        <TouchableOpacity
          onPress={() => props.navigation.navigate("ResolveAuth")}
        >
          <Image
            source={require("../../assets/google.png")}
            style={styles.googleimage}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

LoginScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 250,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderRadius: 2,
  },
  image: {
    alignSelf: "flex-start",
    width: 200,
    height: 130,
    resizeMode: "contain",
  },
  googleimage: {
    alignSelf: "center",
    width: 50,
    height: 50,
  },
});

export default LoginScreen;
