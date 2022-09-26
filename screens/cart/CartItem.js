import React, { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/cartActions";

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.item.quantity);

  return (
    <ListItem style={styles.listItem} key={props.key} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.image
              ? data.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
        <Body style={styles.body}>
          <Left>
            <Text>{data.name}</Text>
          </Left>
          <Right>
            <Text>P{data.price}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="-"
                onPress={() => {
                  setQuantity(props.item.item.quantity);
                  props.editItemFromCart(props.item.index, false);
                }}
              />
              <Text style={{ margin: 5 }}>{props.item.item.quantity}</Text>
              <Button
                title="+"
                onPress={() => {
                  console.log(props.item.index);
                  // setQuantity(props.item.item.quantity);
                  props.editItemFromCart(props.item.index, true);
                }}
              />
            </View>
          </Right>
        </Body>
      </Left>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
    editItemFromCart: (index, add) =>
      dispatch(actions.editItemFromCart(index, add)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
// export default CartItem;
