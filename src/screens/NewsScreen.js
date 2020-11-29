import React, { useState } from "react";
import {
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  LogBox,
} from "react-native";
import {
  ListItem,
  Text,
  Card,
  Button,
  Icon,
  Divider,
} from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import NewsCardComponent from "../components/NewsCardComponent";
import useNews from "../hooks/useNews";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
LogBox.ignoreAllLogs();

const NewsScreen = () => {
  const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, results, error] = useNews();
  const repeatCard = () => {
    return (
      <Card
        containerStyle={{
          elevation: 0,
          borderColor: "white",

          padding: null,
          paddingBottom: 20,
        }}
      >
        <Card.Image
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          }}
        />
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
      </Card>
    );
  };
  const repeat = () => {
    return (
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
          borderColor: "black",
          borderWidth: 2,
        }}
      >
        <ListItem.Content>
          <Card containerStyle={{ elevation: 0, borderColor: "white" }}>
            <Card.Image
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW NOW"
            />
          </Card>
        </ListItem.Content>
      </ListItem>
    );
  };
  const [loaded] = Font.useFonts({
    roboto: require("../../assets/Roboto-Regular.ttf"),
    robotothin: require("../../assets/Roboto-Thin.ttf"),
    robotolight: require("../../assets/Roboto-Light.ttf"),
  });
  if (!loaded) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 80,
              backgroundColor: "white",
              //borderBottomWidth: 1,
              //borderBottomColor: "#dddddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                //padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                // shadowOffset: { width: 0, height: 0 },
                // shadowColor: "black",
                // shadowOpacity: 0.2,
                // elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null,
              }}
            >
              <Ionicons
                name="ios-paper"
                size={24}
                color="black"
                style={{ paddingTop: 10, alignSelf: "center" }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <Animated.View
              style={{
                flex: 1,
                backgroundColor: "white",
              }}
            >
              <SafeAreaView
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Animated.ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.scrollview}
                  contentContainerStyle={styles.content}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                    { useNativeDriver: true },
                    () => {} // Optional async listener
                  )}
                  contentInsetAdjustmentBehavior="automatic"
                >
                  {results != null
                    ? results.map((item) => (
                        <NewsCardComponent
                          data={item}
                          unique={Math.floor(Math.random() * 999999)}
                        />
                      ))
                    : null}
                </Animated.ScrollView>
              </SafeAreaView>
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  // const [loaded] = Font.useFonts({
  //   roboto: require("../../assets/Roboto-Regular.ttf"),
  //   robotothin: require("../../assets/Roboto-Thin.ttf"),
  //   robotolight: require("../../assets/Roboto-Light.ttf"),
  // });
  // if (!loaded) {
  //   return null;
  // } else {
  //   return (
  //     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
  //       <View style={{ flex: 1 }}>
  //         <View
  //           style={{
  //             height: 80,
  //             backgroundColor: "white",
  //             //borderBottomWidth: 1,
  //             //borderBottomColor: "#dddddd",
  //           }}
  //         >
  //           <View
  //             style={{
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               //padding: 10,
  //               backgroundColor: "white",
  //               marginHorizontal: 20,
  //               // shadowOffset: { width: 0, height: 0 },
  //               // shadowColor: "black",
  //               // shadowOpacity: 0.2,
  //               // elevation: 1,
  //               marginTop: Platform.OS == "android" ? 30 : null,
  //             }}
  //           >
  //             <Ionicons
  //               name="ios-paper"
  //               size={35}
  //               color="black"
  //               style={{ paddingTop: 10, alignSelf: "center" }}
  //             />
  //           </View>
  //         </View>
  //         <ScrollView scrollEventThrottle={16}>
  //           {/* <Animated.View
  //             style={{
  //               flex: 1,
  //               backgroundColor: "white",
  //             }}
  //           >
  //             <SafeAreaView
  //               style={{
  //                 backgroundColor: "white",
  //                 flex: 1,
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Animated.ScrollView
  //                 showsVerticalScrollIndicator={false}
  //                 style={styles.scrollview}
  //                 contentContainerStyle={styles.content}
  //                 onScroll={Animated.event(
  //                   [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
  //                   { useNativeDriver: true },
  //                   () => {} // Optional async listener
  //                 )}
  //                 contentInsetAdjustmentBehavior="automatic"
  //               >
  //                 {results != null
  //                   ? results.map((item) => <NewsCardComponent data={item} />)
  //                   : null}
  //               </Animated.ScrollView>
  //             </SafeAreaView>
  //           </Animated.View> */}
  //         </ScrollView>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView
        style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}
      >
        <Text h4 style={{ paddingVertical: 10 }}>
          News
        </Text>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}
          contentContainerStyle={styles.content}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
            { useNativeDriver: true },
            () => {} // Optional async listener
          )}
          contentInsetAdjustmentBehavior="automatic"
        >
          {results != null
            ? results.map((item) => <NewsCardComponent data={item} />)
            : null}
        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

NewsScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: "white",
    // paddingTop: 55,
    // borderColor: "red",
    // borderWidth: 2,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default NewsScreen;
