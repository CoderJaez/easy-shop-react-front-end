import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//screens
import Checkout from "../screens/cart/checkout/Checkout";
import Confirm from "../screens/cart/checkout/Confirm";
import Payment from "../screens/cart/checkout/Payment";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Checkout" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
