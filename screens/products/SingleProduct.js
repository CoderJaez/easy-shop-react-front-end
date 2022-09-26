import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";
import { Image } from "react-native-elements";
import { Left, Right, Container, H1 } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../redux/actions/cartActions";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <Container>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View styles={styles.imageContainer}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <H1 style={styles.contentHeader}>{item.brand}</H1>
            <Text style={styles.contentText}> {item.name}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}> P {item.price.toFixed(2)}</Text>
        </Left>
        <Right>
          <Button
            title="Add To Cart"
            onPress={() => props.addItemToCart(props)}
          />
        </Right>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    height: 250,
    width: "100%",
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 20,
    margin: 20,
    color: "red",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};
export default connect(null, mapDispatchToProps)(SingleProduct);
