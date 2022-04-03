import React from "react";
import { StyleSheet } from "react-native";
import Route from "../Constants/NavigationStrings";
// stacking of Nevigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreen, NamzTime, RozaTime } from "../Navigations/index";
const Stack = createNativeStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Route.MainScreen}
        component={MainScreen}
        options={{
          // headerRight: () => <HeaderAvatar />,
          title: "",
        }}
      />
      <Stack.Screen
        name={Route.NamzTime}
        component={NamzTime}
        options={{
          // headerRight: () => <HeaderAvatar />,
          title: "",
        }}
      />
      <Stack.Screen
        name={Route.RozaTime}
        component={RozaTime}
        options={{
          // headerRight: () => <HeaderAvatar />,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};
export default Routes;
