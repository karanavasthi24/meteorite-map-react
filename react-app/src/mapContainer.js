import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps"
import chroma from "chroma-js";
import Tooltip from 'rc-tooltip';

import 'rc-tooltip/assets/bootstrap_white.css';
import "./styles.css";

const colorScale = chroma.scale(["yellow", "red"]).mode("lch");

export default function MapContainer({data}) {
  const masses = data.map((item) => item.mass);
  const maxMass = Math.max(...masses);

  return (
    <div>
    <ComposableMap>
    <ZoomableGroup>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} style={{
              default: {
                fill:"#D3D3D3",
                stroke:"#000000",
                strokeWidth: 0.3
                
              },
              hover: {
                fill:"#C0C0C0",
                stroke:"#000000",
                strokeWidth: 0.7
              },
            }}/>
          ))
        }
      </Geographies>
      
      

      {data.map((item, index) => (
          <Marker key={index} coordinates={[item.reclong, item.reclat]} >
          
          <Tooltip placement="top" 
          trigger={['hover']}
          overlay={
            <div>
            <center><b><u>Meteorite Info</u></b></center>
            <ul>
            <li>Name: {item.name} </li>
            <li>Class: {item.recclass} </li>
            <li>Mass: {item.mass} Kg</li>
            <li>Year: {item.year} </li>
            </ul>
            </div>}
          mouseEnterDelay = {0.3}
          mouseLeaveDelay = {0.1}
          showArrow = {true}
          overlayStyle={{
            backgroundColor: "grey",
            borderRadius: "20px",
            padding: "5px",
          }}
          overlayInnerStyle={{
            backgroundColor: "white",
            color: "black",
            fontSize: "14px",
            borderRadius: "20px",
          }}
          >

            <circle
              class="icon"
              r={Math.log(item.mass) / (2.5* Math.log(10))}
              fill={colorScale(Math.log(item.mass)/Math.log(maxMass)).hex()}
            />

          </Tooltip>
          
            
        </Marker>
        ))}

       

      </ZoomableGroup>
    </ComposableMap>
  </div>
  )
}
