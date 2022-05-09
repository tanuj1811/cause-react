import React from 'react'
import './EmptySpacs.scss'


const EmptySpace = props => {
    return (
        <div className={`${props.className} emptySpace`} style={{height:props.height}}></div>
    )
}

export default EmptySpace
