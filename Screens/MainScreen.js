import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import Constants from "expo-constants";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shouldUpdateCache } from "../helper/CacheHelper";
import { useSelector, useDispatch } from "react-redux";
import * as Linking from "expo-linking";
import { updateNamzData } from "../Redux/mainCacheSlice";

import Route from "../Constants/NavigationStrings";

const MainScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  // state variable to store data received from Server or Cache
  const [namzData, setNamzData] = useState(null);
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
  // api call
  const getApiData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.pray.zone/v2/times/this_month.json?city=${address.city}&school=1&juristic=1&timeformat=1`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        var data1 = JSON.parse(result);
        dispatch(updateNamzData(data1));

        // now we need to get data from cache
        setLoadingFromServer(false);
        setLoadingFromCache(true);
        // console.log("JSON.parse(result).results.datetime", JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  };
  // redux code
  const dispatch = useDispatch();
  let mainCache = useSelector((state) => state.mainCache);
  // console.log(
  //   "mainCache.results",
  //   mainCache.namzData.results.datetime[0].date.gregorian
  // );
  // should load from Server or Cache?
  const [loadingFromServer, setLoadingFromServer] = useState(true);
  const [loadingFromCache, setLoadingFromCache] = useState(false);

  // for server logic
  useEffect(() => {
    if (loadingFromServer) {
      console.log("loadingFromServer");

      shouldUpdateCache(
        "PFundData",
        mainCache.namzData,
        mainCache.namzUpdateDateTime,
        100,
        true
      ).then((x) => {
        // console.log("response is", x);
        // if cache is not old (based on number of minutes)
        if (x[0] == !true) {
          // console.log("ShouldUpdateNamzData", x);
          // Alert.alert("Message", "Schedule Meetings are Loaded from chache");
          console.log("fetching from DB");
          setLoadingFromCache(true);
          setLoadingFromServer(false);
        }
        // if cache is old (based on number of minutes) then get data from server and update in redux
        else {
          getApiData();
        }
      });
    }
  }, [loadingFromServer, address]);

  // for cache logic
  useEffect(() => {
    if (loadingFromCache) {
      console.log("loadingFromCache");
      // console.log("mainCache.namzData", mainCache.namzData.results.datetime);
      setNamzData(mainCache.namzData.results);
      setLoadingFromCache(false);
      console.log("namzData", namzData);
    }
  }, [loadingFromCache]);
  // .datetime[0].times.Asr
  var datas = namzData && namzData.datetime[0].times.Asr;
  console.log("console.log(namzData", datas);

  const handleOpenWithLinking = () => {
    Linking.openURL("https://downloadthequran.com/download-pdf-arabic-quran/");
  };
  return (
    <View style={styles.mainView}>
      {loadingFromCache || loadingFromServer || namzData == null ? (
        <ActivityIndicator
          size="large"
          color="#006e51"
          style={{ marginTop: "50%" }}
        />
      ) : (
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Route.NamzTime);
            }}
          >
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
                {/* <Paragraph>
                Fajr: {namzData && namzData.datetime[0].times.Fajr}
              </Paragraph> */}
              </Card.Content>
              <Card.Cover source={require("../assets/image/musq.jpg")} />
              <Card.Actions></Card.Actions>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Route.RozaTime);
            }}
          >
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithLinking();
            }}
          >
            <Card style={styles.cardStyle}>
              <View style={{}}>
                <Card.Title
                  title="Download Holy Quran"
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
              <Card.Cover source={require("../assets/image/quran.jpg")} />
              <Card.Actions></Card.Actions>
            </Card>
          </TouchableOpacity>
        </ScrollView>
      )}
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
