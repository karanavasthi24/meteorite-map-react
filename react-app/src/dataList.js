import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './mapContainer';

function processData(data){
  let filteredArray = data.filter((item) => {return !isNaN(item.mass) && !isNaN(item.reclong) &&!isNaN(item.reclat) && item.mass >= 1 && typeof item.year == 'string'})
  filteredArray = filteredArray.filter((item) => {return typeof(item.year)})
  return filteredArray.map((item) => {
    item.year = item.year.split('-')[0];
    return item;
  });

}

export default function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://data.nasa.gov/resource/y77d-th95.json');
      const filteredArray = processData(response.data);
      
      setData(filteredArray);
    }
    fetchData();
  }, []);

  
  return (
    <MapContainer data={data}/>
  );
}