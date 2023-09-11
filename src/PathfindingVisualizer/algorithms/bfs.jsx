export const bfs=(grid,node,finishNode)=>{
	
    const visitedNodesInOrder=[];
	let queue=[];
    queue.push(node);
    node.isVisited=true;
	while(queue.length>0)
	{
		const currNode=queue[0];
        queue.shift();

        const {col,row}=currNode;
        visitedNodesInOrder.push(currNode);


        if(currNode === finishNode)  return visitedNodesInOrder; 

        
	    const dr=[-1,0,1,0];
	    const dc=[0,1,0,-1];
		for(let i=0;i<4;i++)
		{
			let newr=row+dr[i];
			let newc=col+dc[i];

			if(newr>=0 && newc>=0 && newr<23 && newc<59 && grid[newr][newc].isVisited===false && grid[newr][newc].isWall===false)
			{
                grid[newr][newc].prevNode=currNode;
                grid[newr][newc].isVisited=true;
				queue.push(grid[newr][newc]);
			}
		}
	}
    return visitedNodesInOrder;
}

export const bidirectionalBFS = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  const startQueue = [];
  const finishQueue = [];

  startQueue.push(startNode);
  startNode.isVisited = true;
  startNode.startVis=true;

  finishQueue.push(finishNode);
  finishNode.isVisited = true;
  finishNode.finishVis=true;

  let startGrid = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
	startGrid[i] = new Array(grid[0].length).fill(false);
  }


  let finishGrid = new Array(grid.length);
  for (let i = 0; i < grid.length; i++) {
	finishGrid[i] = new Array(grid[0].length).fill(false);
  }

  while (startQueue.length > 0 && finishQueue.length > 0) {
    const startCurrNode = startQueue.shift();
    const finishCurrNode = finishQueue.shift();

    visitedNodesInOrder.push(startCurrNode);
    visitedNodesInOrder.push(finishCurrNode);
    if (finishGrid[startCurrNode.row][startCurrNode.col]===true || startGrid[finishCurrNode.row][finishCurrNode.col]===true) {
		console.log("Here")
		return [visitedNodesInOrder];
    }

	
	finishGrid[finishCurrNode.row][finishCurrNode.col]=true;

    const startNeighbors = getNeighbors(grid, startCurrNode,false);
    const finishNeighbors = getNeighbors(grid, finishCurrNode,true);

    for (let i = 0; i < startNeighbors.length; i++) {
      const startNeighbor = startNeighbors[i];

      if (!startNeighbor.startVis && !startNeighbor.isWall) {
        startNeighbor.isVisited = true;
		startNeighbor.startVis=true;
        startNeighbor.prevNode = startCurrNode;
        startQueue.push(startNeighbor);
      }
    }

    for (let i = 0; i<finishNeighbors.length ; i++) {
      const finishNeighbor = finishNeighbors[i];
		
      if (!finishNeighbor.finishVis && !finishNeighbor.isWall) {
        finishNeighbor.isVisited = true;
		finishNeighbor.finishVis=true;
        finishNeighbor.prevNode = finishCurrNode;
        finishQueue.push(finishNeighbor);
      }
    }
  }

  return [visitedNodesInOrder,"here2"];
};

const getNeighbors = (grid, node,finish) => {
  const { row, col } = node;
  let dr ;
  let dc;

  if(finish===true){
	dr = [ 0, 1, 0, -1 ];
 	dc = [ -1, 0, 1, 0 ];
  }else{
	dr = [ 0, 1, 0, -1];
  	dc = [ 1, 0, -1, 0];
  }
  const neighbors = [];

  for (let i = 0; i < 4; i++) {
    const newRow = row + dr[i];
    const newCol = col + dc[i];

    if (
      newRow >= 0 &&
      newCol >= 0 &&
      newRow < grid.length &&
      newCol < grid[0].length
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors;
};
