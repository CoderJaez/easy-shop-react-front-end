import { Platform } from "react-native";

let baseUrl = "";

{
  Platform.OS == "android"
    ? (baseUrl = "http://192.168.0.106:3000/api/v1/")
    : (baseUrl = "http://127.0.0.1/api/v1/");
}

export default baseUrl;
