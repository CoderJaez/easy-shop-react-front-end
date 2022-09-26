import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Toast from "react-native-toast-message";

import FormContainer from "../../shared/form/FormContainer";
import Error from "../../shared/form/Error";
import Input from "../../shared/form/Input";
import baseUrl from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      name === ""
    ) {
      setError("Please fill up all the fields.");
    } else {
      if (password === confirmPassword) {
        let user = {
          email: email,
          name: name,
          password: password,
          phone: phone,
        };

        axios
          .post(`${baseUrl}users/register`, user)
          .then((res) => {
            if (res.status == 200) {
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Registration Successfull",
              });
              setTimeout(() => {
                props.navigation.navigate("Login");
              }, 500);
            }
          })
          .catch((e) => {});
      } else {
        setError("Password did not match.");
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Name"}
          name={"name"}
          value={name}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          id={"phone"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Email"}
          name={"email"}
          value={email}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />

        <Input
          placeholder={"Passsword"}
          name={"password"}
          value={password}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <Input
          placeholder={"Confirm Password"}
          name={"confirmPassword"}
          value={confirmPassword}
          secureTextEntry={true}
          id={"confirmPassword"}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <Button title="Register" onPress={() => register()} />
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Button
            title="Back to Login"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Register;
