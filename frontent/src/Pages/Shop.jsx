import React, { useRef } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

export default function Shop() {
  // Create a ref in the parent component
  const newCollectionRef = useRef(null);

  // Scroll handler function
  const scrollToSection = () => {
    newCollectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
     <Hero onScroll={scrollToSection}/>
     <Popular/>
     <Offers/> 
     <NewCollections refProp={newCollectionRef}/>
     <NewsLetter/>
    </>
  )
}
