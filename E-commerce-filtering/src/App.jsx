import React, { useState } from 'react'
import Navigation from './Navigation/Nav'
import Products from './Products/Products'
import Recommended from './Recommended/Recommended'
import Sidebar from './Sidebar/Sidebar'

import "./index.css"
//import database
import products from './db/data'
import Card from './components/Card'
const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  //----------input filter----------

  //funtn to handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const filteredItems = products.filter(
    (product) =>
     product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);


  //----------radio filter----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }


  //---------- buttons filter----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }



  //----------render function----------
  function filteredData(products, selected, query) {
    let filteredProdcts = products;

    //filtetring input items
    if (query) {
      filteredProdcts = filteredItems
    }

    //filtering by category
    if (selected) {
      filteredProdcts = filteredProdcts.filter(({ category, color,
        company, newPrice, title }) => 
        category === selected ||
         color === selected ||
          company === selected ||
           newPrice === selected ||
          title === selected
      );
    }
// console.log(filteredProdcts)
    return filteredProdcts.map(
      ({img, title, star, reviews, newPrice, prevPrice})=>(
    <Card 
    key = {Math.random()}
    img= {img}
    title= {title}
    star = {star}
    reviews = {reviews}
    newPrice = {newPrice}
    prevPrice = {prevPrice}/>
  ));
  }

  const result =  filteredData(products, selectedCategory, query);



  return <>
    <Sidebar handleChange={handleChange} />
    <Navigation query={query} handleInputChange={handleInputChange}/>
    <Recommended handleClick={handleClick}/>
    <Products result={result}/>
  </>

}

export default App