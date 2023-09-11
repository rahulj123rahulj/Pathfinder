import React from 'react';

import './Node.css';


const Node=(props)=>{
    const {col,
        isFinish,
        isStart,
        isWall,
        row,
        prevNode,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseUp} = props;
    
    let specialNode ='';
    
    if(isFinish){
        specialNode='node-finish'
    }else if(isStart){
        specialNode='node-start'
    }else if(isWall){ 
        specialNode='node-wall'
    }

    return (
        <>
        <div
        id={`node-${row}-${col}`}
        className={`node ${specialNode}`}
        onMouseDown={()=>onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseLeave={()=>onMouseLeave(row,col)}
        onMouseUp={()=>onMouseUp(row,col)}
        ></div>
        </>
    )
}

export default Node;
