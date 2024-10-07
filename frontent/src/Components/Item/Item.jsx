import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';
export default function Item(props) {
    const {image,name,new_price,old_price} =props;
  return (
    <>
     <div className="item">
        <Link to={`product/${props.id}`}>
        <img src={image} width="100%" height="auto" alt="" />
        </Link>
        <p>{name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${new_price}
            </div>
            <div className="item-price-old">
                ${old_price}
            </div>
        </div>
     </div>
    </>
  )
}
