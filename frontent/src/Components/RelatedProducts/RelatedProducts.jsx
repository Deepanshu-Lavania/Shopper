/* import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
// import data_product from "../../assets/data";
import Item from "../Item/Item";

export default function RelatedProducts({product}) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  useEffect(() => {
    const fetchRealtedProducts = async () => {
      try {
        await fetch("http://localhost:8000/relatedproduct")
          .then((res) => res.json())
          .then((data) => {
            console.log("related data is ", data);
            //response
            setRelatedProduct(data);
          });
      } catch (error) {
        console.log("Error to fetching related Product ", error);
      }
    };
    fetchRealtedProducts();
  }, []);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}
 */

import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

export default function RelatedProducts({ product }) {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRealtedProducts = async () => {
      if (!product || !product.category) {
        console.log("Product or category is not defined.");
        setLoading(false);
        return;
      }
      
      try {
        console.log("Realted product in product is : ",product.category);
        const response = await fetch("http://localhost:8000/relatedproduct", {
          method: "POST", // Use POST to send the category dynamically
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category: product.category }), // Send the category in the request body
        });
        const data = await response.json();
        console.log("related data is ", data);
        setRelatedProduct(data);
      } catch (error) {
        console.log("Error fetching related products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealtedProducts();
  }, [product]); // Re-run the effect when `product` changes

  if (loading) {
    return <div>Loading related products...</div>;
  }
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProduct.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}
