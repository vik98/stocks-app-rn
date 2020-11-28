import React from "react";
import { Linking, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";

const NewsCardComponent = (props) => {
  return (
    <Card
      containerStyle={{
        elevation: 0,
        borderColor: "black",
        borderWidth: 0.2,
        padding: 10,
        paddingBottom: 20,
      }}
    >
      <Card.Image
        source={{
          uri: props.data.urlToImage,
        }}
      />
      <Text
        style={{
          marginVertical: 5,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {props.data.title}
      </Text>
      <Text
        style={{
          textAlign: "center",
          paddingBottom: 10,
          fontSize: 10,
        }}
      >
        {props.data.author}
      </Text>

      <Button
        buttonStyle={{
          borderColor: "black",
        }}
        title="READ"
        type="outline"
        onPress={() => Linking.openURL(props.data.url)}
      />
    </Card>
  );
};

const styles = StyleSheet.create({});

export default NewsCardComponent;
