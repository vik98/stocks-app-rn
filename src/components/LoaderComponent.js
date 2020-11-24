import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Circle, Rect } from "react-native-svg";
import ContentLoader from "rn-content-loader";
import LinearGradient from "react-native-linear-gradient";
export const deviceWidth = Dimensions.get("window").width;

const LoaderComponent = (props) => {
  return (
    //   <ContentLoader
    //     height={200}
    //     width={(deviceWidth - 70) / 2}
    //     speed={2}
    //     primaryColor="#f3f3f3"
    //     secondaryColor="#ecebeb"
    //     {...props}
    //   >
    //     <Rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" />
    //     <Rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
    //     <Rect x="0" y="80" rx="3" ry="3" width="250" height="6.4" />
    //     <Rect x="0" y="100" rx="3" ry="3" width="250" height="6.4" />
    //     <Rect x="0" y="120" rx="3" ry="3" width="250" height="6.4" />
    //     <Circle cx="30" cy="30" r="30" />
    //   </ContentLoader>
    <ListItem
      Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} //
      // linearGradientProps={{
      //   colors: ["#348F50", "#56B4D3"],
      //   start: { x: 1, y: 0 },
      //   end: { x: 0.2, y: 0 },
      // }}
      style={{
        flexDirection: "row",
        alignSelf: "flex-start",
      }}
      onPress={props.onPress}
    >
      <Avatar
        rounded
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
          {props.data["2. name"]}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: "black" }}>
          {props.data["1. symbol"]}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="black" />
    </ListItem>
  );
};

export default LoaderComponent;
