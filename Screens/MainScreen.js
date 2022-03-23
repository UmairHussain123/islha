import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import moment from "moment";
const MainScreen = () => {
  return (
    <View style={styles.mainView}>
      <ScrollView>
        <Card style={styles.cardStyle}>
          <Card.Title
            title="Namz Time"
            subtitle={
              "Pakistan" +
              " karachi" +
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
                "Pakistan" +
                " Karachi" +
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
