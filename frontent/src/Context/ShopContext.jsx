/* import React, {createContext, useState } from "react";
import all_product from '.././assets/all_product';

export const ShopContext = createContext();

const ShopContextProvider =({children})=>{//delivry boy
    const contextValue = {all_product};//store data 
    
    return(
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider; */

//! Add To Cart

import React, { createContext, useState } from "react";
import all_product from ".././assets/all_product";

export const ShopContext = createContext();
const getDefaultCart = () => {
  let cart = {}; //array initialize
  for (let index = 0; index <= all_product.length; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = ({ children }) => {
  //delivry boy
  const [cartItems, setCartItems] = useState(getDefaultCart());
//   console.log(cartItems);

  const addToCart = (itemId) => {
    setCartItems((prevItem) => ({
      ...prevItem, // Spread operator to keep existing properties in the object
      [itemId]: (prevItem[itemId] || 0) + 1, // Updates the value of the specific itemId
    }));
    /*  Without parantheses above will throw an error because the arrow function thinks you're starting a function block but ends up confused by the spread operator ... (which is invalid as a statement). */
    /*  With Parentheses (()): Parentheses tell JavaScript that you are returning an expression, and if that expression is an object (i.e., { ... }), it correctly interprets the curly braces as an object literal, not a function body. */
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prevItem) => ({
      ...prevItem,
      [itemId]: (prevItem[itemId] || 1) - 1,
    }));
  };
  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
        if (cartItems[item]>0) {
            let itemInfo = all_product.find((product)=>product.id===Number(item));
            totalAmount +=itemInfo.new_price*cartItems[item]
        }
    }
    return totalAmount;
  }
  const getTotalCartItems = ()=>{
    let totalItem =0;
    for(const item in cartItems){
        if (cartItems[item]>0) {
            totalItem+=cartItems[item];
        }
    }
    return totalItem;
  }

  const contextValue = { all_product, cartItems, addToCart, removeFromCart,getTotalCartAmount, getTotalCartItems }; //store data

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
