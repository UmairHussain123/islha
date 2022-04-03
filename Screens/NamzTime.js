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

const NamzTime = () => {
  const [getDataToday, setGetDataToday] = useState(null);
  // redux code
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
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          Hijri
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          {item.date.hijri}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                    <Card
                      style={{
                        width: "48%",
                        backgroundColor: "lightgray",
                        borderRadius: 10,
                      }}
                    >
                      <Card.Content>
                        <Title
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          Date
                        </Title>
                        <Paragraph
                          style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                          }}
                        >
                          {item.date.gregorian}
                        </Paragraph>
                      </Card.Content>
                    </Card>
                  </View>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Fajr</Title>
                      <Title style={styles.tilesColor}>{item.times.Fajr}</Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Sunrise</Title>
                      <Title style={styles.tilesColor}>
                        {item.times.Sunrise}
                      </Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>

                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Dhuhr</Title>
                      <Title style={styles.tilesColor}>
                        {item.times.Dhuhr}
                      </Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Asr</Title>
                      <Title style={styles.tilesColor}>{item.times.Asr}</Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Sunset</Title>
                      <Title style={styles.tilesColor}>
                        {item.times.Sunset}
                      </Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Maghrib</Title>
                      <Title style={styles.tilesColor}>
                        {item.times.Maghrib}
                      </Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      backgroundColor: "#006cbe",
                      borderRadius: 20,
                      marginTop: 20,
                    }}
                  >
                    <Card.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Title style={styles.tilesColor}>Isha</Title>
                      <Title style={styles.tilesColor}>{item.times.Isha}</Title>
                      {/* <Paragraph>Card content</Paragraph> */}
                    </Card.Content>
                  </Card>
                </View>
              );
            }
          })
        )}
      </ScrollView>
    </View>
  );
};
export default NamzTime;

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
