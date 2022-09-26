import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  LogBox,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Text, Icon, Item, Input, Header } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

LogBox.ignoreAllLogs(true);

//screens
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../shared/Banner";
import CategoryFilter from "./CategoryFilter";
const numColumns = 2;
const { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [productsCtg, setProductsCtg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);
      //products
      axios
        .get(`${baseUrl}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setProductsFiltered(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      //Categories
      axios
        .get(`${baseUrl}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setInitialState([]);
        setActive();
        setCategories([]);
        setProductsCtg([]);
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <>
      {loading === false ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header>
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item, index) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={index}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Image
                      resizeMode="contain"
                      source={require("../../assets/no-products.png")}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
