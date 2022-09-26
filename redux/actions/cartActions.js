import {
  ADD_TO_CART,
  EDIT_ITEM_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../contants";

const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

const editItemFromCart = (index, add) => {
  return {
    type: EDIT_ITEM_FROM_CART,
    index,
    add,
  };
};
const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};

const clearCart = (payload) => {
  return {
    type: CLEAR_CART,
  };
};

export { addToCart, removeFromCart, clearCart, editItemFromCart };
