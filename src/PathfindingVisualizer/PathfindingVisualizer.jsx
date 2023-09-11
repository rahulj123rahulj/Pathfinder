import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import Node from './Node/Node.jsx';
import {dijkstra} from './algorithms/dijkstra.jsx';
import {bfs, bidirectionalBFS} from './algorithms/bfs.jsx';
import {dfs} from './algorithms/dfs.jsx'
import './pathfindingVisualizer.css';
import { AStar } from './algorithms/astar.jsx';
let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 40;


const updateGridWithWalls = (grid, nodesWithWalls) => {
  for (const nodeWithWall of nodesWithWalls) {
    const { row, col } = nodeWithWall;
    grid[row][col].isWall = true;
  }
};


let getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 23; row++) {
      const currentRow = [];
      for (let col = 0; col < 59; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      prevNode: null,
    };
  };

  


  const getNewGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  
  const getNewStart=(grid,row,col)=>{
      const newGrid=grid.slice();
      const node=newGrid[row][col];
      const newNode={
        ...node,
        isStart:!node.isStart
      };
      newGrid[row][col]=newNode;
      return newGrid;
  }

  const getNewEnd=(grid,row,col)=>{
    const newGrid=grid.slice();
    const node=newGrid[row][col];
    const newNode={
      ...node,
      isFinish:!node.isFinish
    };
    newGrid[row][col]=newNode;
    return newGrid;
}


const PathfindingVisualizer=({vis,setVis,algo,clear,setClear,animated,setAnimated})=> {


    const [startPressed,isStartPressed]=useState(false);
    const [finishPressed,isFinishPressed]=useState(false);
    const [grid,setGrid]=useState(getInitialGrid);
    const [mouseIsPressed,setMouseIsPressed]=useState(false);
    // const [animated,setAnimated]=useState(false)
    // console.log(grid);


    // useEffect(() => {
    //   console.log("Changed")
    //   if(animated)
    //   visualizeAlgorithm()
    // }, [grid])
    

    const getFreshGrid=(grid)=>{
      for (let row = 0; row < 23; row++) {
        for (let col = 0; col < 59; col++) {
            const temp=document.getElementById(`node-${row}-${col}`)
            temp.classList.remove('node-shortest-path')
            temp.classList.remove('node-visited')
            grid[row][col].distance=Infinity
            grid[row][col].isVisited=false;
            grid[row][col].prevNode=null;
        }
      }
    }

  const handleMouseDown=(row,col)=>{
    if(row===START_NODE_ROW && col===START_NODE_COL) {
      isStartPressed(true);
      console.log("start is presssed");
      return;
    }

    if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
      console.log("Finish pressed",finishPressed)
      console.log("Start pressed",startPressed)
      console.log("Mouse pressed",mouseIsPressed)
      isFinishPressed(true);
      console.log("Goal Node pressed");
      return;
    }
    if(startPressed===true || finishPressed===true){
      return;
    }
    const newGrid=getNewGridWithWall(grid,row,col);
    console.log("here");
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter=(row, col)=>{
    if( startPressed===true){
      const newGrid = getNewStart(grid, row, col);
      setGrid(newGrid)
      console.log("Entered")
      return ;
    }
    if( finishPressed === true){
      const newGrid = getNewEnd(grid, row, col);
      setGrid(newGrid)
      console.log("Entered")
      return ;
    }
    if (mouseIsPressed === false) return;
    console.log("here2");
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid)
  }
  

  const handleMouseLeave=(row,col)=>{
    if(startPressed===true){
      const newGrid = getNewStart(grid, row, col);
      setGrid(newGrid)
      console.log("left");
      return ;
    }
    if(finishPressed===true){
      const newGrid = getNewEnd(grid, row, col);
      setGrid(newGrid)
      console.log("left");
      return ;
    }
  }

  const handleMouseUp=(row,col) =>{
    if(startPressed===true){
      START_NODE_ROW=row;
      START_NODE_COL=col;
      console.log("release");
      console.log(row);
      console.log(col)
      if(animated===true){

        getFreshGrid(grid)

        visualizeAlgorithm()
        // setAnimated(false);
      }
      
      isStartPressed(false);
      return;
    }
    if(finishPressed === true){
      FINISH_NODE_ROW=row;
      FINISH_NODE_COL=col;
      console.log("release");
      console.log(row);
      console.log(col)
      if(animated===true){
        console.log("reanimating bruh")
        getFreshGrid(grid)
        visualizeAlgorithm()
        // setAnimated(false);
      }
      isFinishPressed(false);
      return;
    }
    setMouseIsPressed(false);
  }
 
  const animateShortestPath=(nodesInShortestPathOrder)=>{
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const temp=document.getElementById(`node-${node.row}-${node.col}`)
        if(!node.isStart || !node.isFinish)
          temp.className='node node-shortest-path';
        if(node.isStart){
          temp.classList.remove('node-shortest-path')
          temp.classList.add('node-start')
        }
        if(node.isFinish){
          temp.classList.remove('node-shortest-path')
          temp.classList.add('node-finish')
        }
      }, animated?0:10 * i);

    }
  }


  const animateAlgorithm=(visitedNodesInOrder, nodesInShortestPathOrder)=>{
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, animated?0:5 * i);
        
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if(!node.isStart && !node.isFinish)
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
      }, animated?0:5 * i);
    }
  }


  function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode != null) {
      nodesInShortestPathOrder.unshift(currentNode);
      // console.log(currentNode)
      currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
  }
  

  const getNodesWithWalls = (grid) => {
    const nodesWithWalls = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const node = grid[row][col];
        if (node.isWall) {
          nodesWithWalls.push({ row, col });
        }
      }
    }
    return nodesWithWalls;
  };
  

  const visualizeAlgorithm=()=>{
    console.log(getNodesWithWalls(grid))
    const newGrid = grid;
    const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
    let finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder=[]
    let nodesInShortestPathOrder=[];
    switch (algo) {
      case 'bfs':
        visitedNodesInOrder = bfs(newGrid, startNode,finishNode);
        break;
      case 'bibfs':
        const ans = bidirectionalBFS(newGrid, startNode,finishNode);
        console.log(ans)
        visitedNodesInOrder=ans[0];
        nodesInShortestPathOrder.push(...getNodesInShortestPathOrder(ans[1]));
        break;
      case 'dfs':
        visitedNodesInOrder = dfs(newGrid, startNode,finishNode);
        break;
      case 'astar':
        visitedNodesInOrder = AStar(newGrid, startNode,finishNode);
        break;
      case 'dij':
        visitedNodesInOrder = dijkstra(newGrid, startNode,finishNode);
        break;
      default:
        break;
    }

    nodesInShortestPathOrder.push(...getNodesInShortestPathOrder(finishNode));

    // console.log(nodesInShortestPathOrder)
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    
  }


  useEffect(()=>{
    if(vis===true){
      visualizeAlgorithm()
      setAnimated(true);
      setVis(false)
    }
  
  
    if(clear===true){
      getFreshGrid(grid)
      setClear(false);
    }
  },[vis,clear])

  

    return (
        
        <>
        <div className="grid">
          <div className='temp'>
          {grid.map((i, rowIdx) => {
            return (
              <div key={rowIdx} style={{height:"25px"}}>
                {i.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row,col)=>handleMouseDown(row, col)}
                      onMouseEnter={(row,col)=>handleMouseEnter(row, col)}
                      onMouseLeave={(row,col)=>handleMouseLeave(row,col)}
                      onMouseUp={(row,col)=>handleMouseUp(row,col)}
                      row={row}></Node>
                  );
                })}
                
              </div>
            );
          })}
          </div>
        </div>
        </>
    )
   
}



export default PathfindingVisualizer;