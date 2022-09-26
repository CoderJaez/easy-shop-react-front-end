import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Picker } from "native-base";
import FormContainer from "../../../shared/form/FormContainer";
import Input from "../../../shared/form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    return () => {
      setOrderItems();
    };
  });

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrder: Date.now(),
      orderItems,
      phone,
      shippingAddress: address,
      shippingAddress2: address2,
      zip,
    };

    props.navigation.navigate("Payment", { order: order });
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />

        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />

        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            height: 70,
            backgroundColor: "white",
            margin: 10,
            borderRadius: 20,
            padding: 10,
            borderWidth: 2,
            borderColor: "orange",
          }}
        >
          <Text style={{ color: "grey" }}>Select Country</Text>
          <Picker
            mode="dropdown"
            selectedValue={country}
            style={{
              height: 80,
              width: "100%",
              position: "absolute",
            }}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </View>

        <View style={{ width: "80%", alignItems: "center", marginTop: 10 }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
export default connect(mapStateToProps, null)(Checkout);
