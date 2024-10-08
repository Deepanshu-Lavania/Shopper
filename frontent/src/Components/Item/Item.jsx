import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
export default function Item(props) {
  const { image, name, new_price, old_price } = props;
   // Smooth scroll to top function
   const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",  // This enables smooth scrolling
    });
  };
  return (
    <>
      <div className="item">
      {/* The issue you're encountering is related to how you're constructing the URL for the Link component in your Item component. Specifically, when you click on a product image in the RelatedProducts component, the Link to the product page is appending product/1 to the existing path (which already contains product/2), leading to the incorrect URL http://localhost:5173/product/2/product/1. */}

      {/* To fix this, you need to ensure that the Link always navigates to the root level of the /product/:productId path, rather than appending the product ID to the current URL. You can do this by prepending a / to the path in the Link component to make it an absolute path. */}
        {/* <Link to={`product/${props.id}`} onClick={window.scrollTo(0, 0)}> */}
        <Link to={`/product/${props.id}`} onClick={handleScrollToTop}>
          <img src={image} width="100%" height="auto" alt="" />
        </Link>
        {/* By using /product/${id} instead of product/${id}, you ensure that React Router treats the path as absolute, not relative, which prevents the incorrect URL nesting behavior. This should fix the issue, so clicking any related product will correctly navigate to the path http://localhost:5173/product/:id */}
        <p>{name}</p>
        <div className="item-prices">
          <div className="item-price-new">${new_price}</div>
          <div className="item-price-old">${old_price}</div>
        </div>
      </div>
    </>
  );
}
