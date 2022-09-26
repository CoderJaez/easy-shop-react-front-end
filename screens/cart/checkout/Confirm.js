import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Button } from "react-native";
import { Text, Left, Right, Body, ListItem, Thumbnail } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/cartActions";

const { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const confirm = props.route.params;
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confrim Order</Text>
      </View>
      {confirm ? (
        <View style={{ borderWidth: 1, borderColor: "orange" }}>
          <Text style={styles.shipping}>Shipping to:</Text>
          <View style={{ padding: 10 }}>
            <Text>Address 1: {confirm.order.order.shippingAddress}</Text>
            <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
            <Text>City: {confirm.order.order.city}</Text>
            <Text>Zip: {confirm.order.order.zip}</Text>
            <Text>Country: {confirm.order.order.country}</Text>
          </View>
          <Text style={styles.shipping}> Items: </Text>
          {confirm.order.order.orderItems.map((x, index) => {
            return (
              <ListItem style={styles.listItem} key={index} avatar>
                <Left>
                  <Thumbnail
                    source={{
                      uri: x.product.image
                        ? x.product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                </Left>
                <Body style={styles.body}>
                  <Left>
                    <Text>{x.product.name}</Text>
                  </Left>
                  <Right>
                    <Text>{x.product.price}</Text>
                  </Right>
                </Body>
              </ListItem>
            );
          })}
        </View>
      ) : null}
      <View style={{ alignItems: "center", margin: 20 }}>
        <Button title="Place Order" onPress={() => confirmOrder()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 10,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  shipping: {
    alignSelf: "center",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};
export default connect(null, mapDispatchToProps)(Confirm);
