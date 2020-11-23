import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-navigation";

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

const styles = StyleSheet.create({});

export default AccountScreen;
