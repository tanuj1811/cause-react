import React from "react";

import Button from "./Button";
import './Jumbotron.css'

const Jumbotron = props => {

    let stackOverFlowDesign = props.stackOverFlow ? 'stackOverFlow' : ''; 
    return (
        <div 
            className={`${stackOverFlowDesign} jumbotron ${props.className}`} 
            style={{
                height:props.height, 
                width:props.width , 
                backgroundColor:props.backgroundColor, 
                backgroundImage:props.backgroundImage,
                clipPath:`url(#${props.curve})`,  
            }}>
            <h1>{props.mainText}</h1>
            <p>{props.subText}</p>
            {props.button && props.to && <Button className='jumbotron__button'  to={props.to} inverse>{props.button}</Button>}
            
            {props.curve && <svg width="0" height="0" className="ps-absolute"><defs>
                <clipPath id="curve" clipPathUnits="objectBoundingBox">
                    <path d="M0,0 H1 V0.988 a0.007,0.012,0,0,1,-0.009,0.011 C0.955,0.983,0.802,0.925,0.501,0.925 C0.2,0.925,0.045,0.984,0.009,1 A0.007,0.012,0,0,1,0,0.988"></path>
                </clipPath>
            </defs></svg>}
            <div className='jumbotron__content'>
            {props.children}
            </div>
      </div>
    )
}

export default Jumbotron;