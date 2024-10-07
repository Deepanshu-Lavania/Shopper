import React, {createContext } from "react";
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
export default ShopContextProvider;