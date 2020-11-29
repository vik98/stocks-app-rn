import React from "react";
import { Linking, StyleSheet } from "react-native";
import { Text, Card, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const NewsCardComponent = (props) => {
  return (
    <TouchableOpacity
      key={props.unique}
      onPress={() => Linking.openURL(props.data.url)}
    >
      <Card
        containerStyle={{
          //elevation: 0,
          //borderColor: "grey",
          //borderWidth: 0.2,
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
            textAlign: "center",
            fontFamily: "roboto",
          }}
        >
          {props.data.title}
        </Text>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 10,
            fontSize: 10,
            fontFamily: "robotolight",
          }}
        >
          {props.data.author}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default NewsCardComponent;
