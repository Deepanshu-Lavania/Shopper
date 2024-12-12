import React, { createContext, useEffect, useState } from "react";
// import all_product from ".././assets/all_product";
import axios from "axios";

//! Add To Cart
export const ShopContext = createContext();

const getDefaultCart = () => {
  let cart = {}; //array initialize
  for (let index = 0; index <= 300; index++) {
    cart[index] = 0;
  }
  // console.log("Array-like object to track item quantities : " ,JSON.stringify(cart));
  return cart;
};

const ShopContextProvider = ({ children }) => {
  //delivry boy
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  //   console.log(cartItems);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        /* fetch("http://localhost:8000/getallproduct")
          .then((response) => response.json())
          .then((data) => setAll_product(data.product)); */
        const res = await axios.get("http://localhost:8000/getallproduct");
        const Data = res.data.product;
        console.log("getallproduct in shopContext is:", Data);
        setAll_product(Data);

        //* getAll_CartNum : getall total number of cart Item
        if (localStorage.getItem("auth-token")) {
          try {
            await fetch("http://localhost:8000/getcart", {
              method: "POST",
              headers: {
                Accept: "application/form-data",
                "auth-token": `${localStorage.getItem("auth-token")}`,
                "Content-Type": "application/json",
              },
              body:"",
            })
              .then((response) => response.json())
              .then((data) =>setCartItems(data));
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  //! AddToCart with authentication
  const addToCart = async (itemId) => {
    setCartItems((prevItem) => ({
      ...prevItem, // Spread operator to keep existing properties in the object
      [itemId]: (prevItem[itemId] || 0) + 1, // Updates the value of the specific itemId
    }));
    /*  Without parantheses above will throw an error because the arrow function thinks you're starting a function block but ends up confused by the spread operator ... (which is invalid as a statement). */
    /*  With Parentheses (()): Parentheses tell JavaScript that you are returning an expression, and if that expression is an object (i.e., { ... }), it correctly interprets the curly braces as an object literal, not a function body. */
    console.log("itemId  in addtoCart is : ", itemId);

    if (localStorage.getItem("auth-token")) {
      try {
        await fetch("http://localhost:8000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log("data by addtocart : ", data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prevItem) => ({
      ...prevItem,
      [itemId]: (prevItem[itemId] || 1) - 1,
    }));
    if (localStorage.getItem("auth-token")) {
      try {
        await fetch("http://localhost:8000/removetocart", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log("data by removetocart : ", data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  }; //store data
  //Context Value contains the array of an object
  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
