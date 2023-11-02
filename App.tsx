import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider } from "./src/context/AppCotext";
import AppNavigator from "./src/context/AppNavigator";


const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;