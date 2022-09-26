import { StatusBar } from "expo-status-bar";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Navigators
import Main from "./navigators/Main";

//Screens
import Header from "./shared/Header";
// import ProductContainer from "./screens/products/ProductContainer";

export default function App() {
  return (
    <Provider store={store}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <NavigationContainer>
          <Header />
          {/* <ProductContainer /> */}
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </TouchableWithoutFeedback>
    </Provider>
  );
}
