import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import * as Google from "expo-google-app-auth";
LogBox.ignoreAllLogs();

const IOS_CLIENT_ID =
  "899650021977-127mp8q8ktn0m75iip4v28e1q3tgreia.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "899650021977-ref8rip9ua3bf0a31ku2v0g526ab8ta3.apps.googleusercontent.com";

const ResolveAuthScreen = (props) => {
  useEffect(() => {
    signInWithGoogle();
  });

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("ResolveAuth.js 24 | ", result.user.givenName);
        props.navigation.navigate("mainFlow", {
          username: result.user.givenName,
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("ResolveAuth.js 30 | Error with login", e);
      return { error: true };
    }
  };

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

ResolveAuthScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default ResolveAuthScreen;
