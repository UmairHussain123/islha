import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./Routes";
import { Provider as ReduxProvider } from "react-redux";
import store from "../Redux/store";

const NavigationContainers = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ReduxProvider>
  );
};

export default NavigationContainers;
