
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import React, { useState } from 'react'
import AppDownoad from '../../components/AppDownload/AppDownoad'

const Home = () => {

const [category, setCategory] = useState("ALL");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      <AppDownoad />

     
     
    </div>
  )
}

export default Home
