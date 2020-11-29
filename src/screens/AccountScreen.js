import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const AccountScreen = (props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Image
        source={require("../../assets/profile.png")}
        style={{
          width: 200,
          height: 130,
          resizeMode: "contain",
        }}
      />

      <Text
        style={{
          paddingVertical: 20,
          fontSize: 40,
          fontWeight: "normal",
          fontFamily: "robotothin",
        }}
      >
        Hi
      </Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
        <Image
          source={require("../../assets/logout.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    header: () => false,
    title: "",
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome
        name="user"
        size={20}
        color={tintColor}
        style={{ paddingTop: 10 }}
      />
    ),
  };
};

const styles = StyleSheet.create({});

export default AccountScreen;
