import React, { useEffect, useState } from "react";
import "./NewCollections.css";
import axios from "axios";
// import new_collection from "../../assets/new_collections";
import Item from "../Item/Item";


export default function NewCollections({refProp}) {
  const [new_collection, setNew_collection]  = useState([]);
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const res = await axios.get(" http://localhost:8000/newcollection");
        const data = res.data;
        console.log("getNew_collection_product  :", data);
        setNew_collection(data);
      } catch (error) {
        console.error("Error fetching New_collection_products:", error);
      }
    };
    fetchNewProducts();
  }, []);
  return (
    <div className="new-collections" ref={refProp}>
      <h1>LATESTS COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
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
