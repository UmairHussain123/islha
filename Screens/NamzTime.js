import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const NamzTime = () => {
  return (
    <View style={styles.mainView}>
      <Card style={{ backgroundColor: "#00aeaf" }}>
        <Card.Content
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Title>Fajr</Title>
          <Title>Fajr</Title>
          {/* <Paragraph>Card content</Paragraph> */}
        </Card.Content>
      </Card>
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
});
