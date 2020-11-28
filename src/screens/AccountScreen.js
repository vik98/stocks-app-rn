import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";
const AccountScreen = (props) => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View>
        <Text> Profile Screen </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Welcome, {props.navigation.getParam("username")}
        </Text>
        <Button
          title="Sign out"
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
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
