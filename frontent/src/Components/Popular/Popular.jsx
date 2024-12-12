import React, { useEffect, useState } from "react";
// import data_product from '../../assets/data';
import Item from "../Item/Item";
import "./Popular.css";
import axios from "axios";

export default function Popular() {
  const [data_product, setData_Proudct] = useState([]);
  useEffect(() => {
    const fetch_PoplarInWomen = async (req, res) => {
      try {
        const fetchdata = await axios.get(
          " http://localhost:8000/popularinwomen"
        );
        console.log(fetchdata.data);
        setData_Proudct(fetchdata.data);
      } catch (error) {
        console.error("Error fetching New_collection_products:", error);
      }
    };
    fetch_PoplarInWomen();
  }, []);
  return (
    <>
      <div className="popular">
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
          {data_product.map((item, i) => {
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
    </>
  );
}
