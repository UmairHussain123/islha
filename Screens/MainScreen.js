import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import Constants from "expo-constants";
import * as Location from "expo-location";

const MainScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log("location", location);
      let { coords } = await Location.getCurrentPositionAsync();
      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        console.log("city  name>>>", regionName[0].city, regionName[0].country);
      }
      // console.log(coords.city);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Card style={styles.cardStyle}>
          <Card.Title
            title="Namz Time"
            subtitle={
              address &&
              address.country +
                "  " +
                address.city +
                "      " +
                moment(Date.now()).format("YYYY-MMM-DD")
            }
          />
          {/* <Title>Card title</Title> */}

          <Card.Content>
            {/* <Paragraph>Card content</Paragraph> */}
          </Card.Content>
          <Card.Cover source={require("../assets/image/musq.jpg")} />
          <Card.Actions></Card.Actions>
        </Card>
        <Card style={styles.cardStyle}>
          <View style={{}}>
            <Card.Title
              title="Ramadan Timing"
              subtitle={
                address &&
                address.country +
                  "  " +
                  address.city +
                  "      " +
                  moment(Date.now()).format("YYYY-MMM-DD")
              }
            />
            {/* <Title>Card title</Title> */}
          </View>
          <Card.Content>
            {/* <Paragraph>Card content</Paragraph> */}
          </Card.Content>
          <Card.Cover source={require("../assets/image/roza1.jpg")} />
          <Card.Actions></Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: Dimensions.get("screen").width - 20,
    alignSelf: "center",
    // backgroundColor: "red",
  },
  cardStyle: {
    marginTop: 10,
  },
});
