
const dfsRecursion=(grid,node,visitedNodesInOrder,finishNode)=>{
    const {col,row,dist} = node;
    node.isVisited=true;
    if(node===finishNode)  return true; 
    visitedNodesInOrder.push(node);
    const dr=[0,1,0,-1];
    const dc=[1,0,-1,0];

    for(let i=0;i<4;i++){
        let newr=row+dr[i];
        let newc=col+dc[i];

        if(newr>=0 && newc>=0 && newr<23 && newc<59 && grid[newr][newc].isVisited===false && grid[newr][newc].isWall===false){
            grid[newr][newc].prevNode=node;
            grid[newr][newc].distance=dist+1;

            if(dfsRecursion(grid,grid[newr][newc],visitedNodesInOrder,finishNode)===true)  return true; 
        }
    }
    return false;
}

export const dfs=(grid,startNode,finishNode)=>{
    const visitedNodesInOrder = [];
    dfsRecursion(grid,startNode,visitedNodesInOrder,finishNode)
    return visitedNodesInOrder;
}
