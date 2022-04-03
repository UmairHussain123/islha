import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { updateNamzData } from "../Redux/mainCacheSlice";
const RozaTime = () => {
  const [flag, setFlag] = useState(false);
  let mainCacheToday = useSelector(
    (state) => state.mainCache.namzData.results.datetime
  );
  console.log("mainCache.results.datetime", mainCacheToday);
  // var data = mainCache.results.datetime;

  var date1 = moment(Date.now()).format("YYYY-MM-DD");
  console.log(date1);

  return (
    <View style={styles.mainView}>
      <ScrollView>
        {mainCacheToday == null ? (
          <ActivityIndicator
            size="large"
            color="#006e51"
            style={{ marginTop: "50%" }}
          />
        ) : (
          mainCacheToday.map((item, index) => {
            if (item.date.gregorian == date1) {
              return (
                <View key={index}>
                  <Card
                    style={{
                      //   width: "48%",
                      backgroundColor: "lightgray",
                      borderRadius: 10,
                      margin: 10,
                      backgroundColor: "#006cbe",
                    }}
                  >
                    <Card.Content>
                      <Title
                        style={{
                          textAlign: "center",
                          textAlignVertical: "center",
                          color: "white",
                        }}
                      >
                        Today{"    "}
                        {item.date.gregorian}
                      </Title>
                      <Title
                        style={{
                          textAlign: "center",
                          textAlignVertical: "center",
                          color: "white",
                        }}
                      >
                        Hijri: {"    "}
                        {item.date.hijri}
                      </Title>
                    </Card.Content>
                  </Card>
                  <View
                    style={{
                      margin: 5,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Card
                      style={{
                        width: "48%",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                        backgroundColor: "#006cbe",
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          Sehri Time
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          {item.times.Fajr}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                    <Card
                      style={{
                        width: "48%",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                        backgroundColor: "#006cbe",
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          Iftar Time
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          {item.times.Maghrib}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              );
            }
          })
        )}
        <Button
          onPress={() => {
            if (flag == false) {
              setFlag(true);
            } else if (flag == true) {
              setFlag(false);
            }
          }}
        >
          {flag ? "less" : "Complete Month"}
        </Button>
        {flag ? (
          <View>
            {mainCacheToday.map((item, index) => {
              return (
                <View key={index}>
                  <Card
                    style={{
                      //   width: "48%",
                      backgroundColor: "lightgray",
                      borderRadius: 10,
                      margin: 10,
                      backgroundColor: "#006cbe",
                    }}
                  >
                    <Card.Content>
                      <Paragraph
                        style={{
                          alignContent: "space-between",
                          justifyContent: "space-between",
                        }}
                      >
                        <Paragraph style={{ color: "white" }}>
                          {" "}
                          Date:
                          {item.date.gregorian}
                        </Paragraph>

                        <Paragraph
                          style={{
                            color: "white",
                            marginLeft: 20,
                            marginLeft: 20,
                          }}
                        >
                          {"                    "}
                          Hijri:
                          {item.date.hijri}
                        </Paragraph>
                      </Paragraph>
                    </Card.Content>
                  </Card>
                  <View
                    style={{
                      margin: 5,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Card
                      style={{
                        width: "48%",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                        backgroundColor: "#006cbe",
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          Sehri Time
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          {item.times.Fajr}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                    <Card
                      style={{
                        width: "48%",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                        backgroundColor: "#006cbe",
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          Iftar Time
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: "white",
                          }}
                        >
                          {item.times.Maghrib}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default RozaTime;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: Dimensions.get("screen").width - 20,
    alignSelf: "center",
    // backgroundColor: "red",
    margin: 5,
  },
  tilesColor: {
    color: "white",
  },
});
