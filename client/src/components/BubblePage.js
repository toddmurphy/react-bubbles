import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [isFetching, setIsFetching] = useState(false)


  useEffect(() => {
      axiosWithAuth()
        .get('/colors')
        .then(response => {
          console.log(response.data)

          setColorList(response.data)
        })
        .catch(error => {
          console.log('Sorry, No colors found!', error)
        })

  },[isFetching])

  return (
    <>
      <ColorList 
        colors={colorList} 
        updateColors={setColorList} 
        isFetching={isFetching} 
        setIsFetching={setIsFetching} 
       />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

/* Data structure from api
color: "aliceblue"
code: {hex: "#f0f8ff"}
id: 1 
*/