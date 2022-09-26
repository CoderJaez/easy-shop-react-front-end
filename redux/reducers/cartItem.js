import { cos } from "react-native-reanimated";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  EDIT_ITEM_FROM_CART,
} from "../contants";

const cartItems = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    // case EDIT_ITEM_FROM_CART:
    //   const i = action.index;
    //   let newItem = state[i];
    //   newItem.quantity = action.add
    //     ? newItem.quantity + 1
    //     : newItem.quantity - 1;
    //   if (newItem.quantity <= 0) {
    //     return [...state.slice(0, i), ...state.slice(i + 1)];
    //   }
    // return [...state.slice(0, i), { newItem }, ...state.slice(i + 1)];
    case REMOVE_FROM_CART:
      return state.filter((cartItem) => cartItem !== action.payload);
    case CLEAR_CART:
      return (state = []);
    default:
      return state;
  }
};

export default cartItems;
