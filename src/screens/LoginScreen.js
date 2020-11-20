import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import * as Google from "expo-google-app-auth";

const IOS_CLIENT_ID =
  "899650021977-127mp8q8ktn0m75iip4v28e1q3tgreia.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "899650021977-ref8rip9ua3bf0a31ku2v0g526ab8ta3.apps.googleusercontent.com";

const LoginScreen = (props) => {
  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        props.navigation.navigate("mainFlow", {
          username: result.user.givenName,
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("LoginScreen.js.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login " onPress={signInWithGoogle} />
    </View>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
