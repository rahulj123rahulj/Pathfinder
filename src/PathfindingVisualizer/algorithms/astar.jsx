export const AStar = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistanceWithHeuristic(unvisitedNodes, finishNode);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighborsAStar(closestNode, grid, finishNode);
    }
    return visitedNodesInOrder;
  };
  
  const sortNodesByDistanceWithHeuristic = (unvisitedNodes, finishNode) => {
    unvisitedNodes.sort((nodeA, nodeB) => {
      const distanceA = nodeA.distance + calculateHeuristic(nodeA, finishNode);
      const distanceB = nodeB.distance + calculateHeuristic(nodeB, finishNode);
      return distanceA - distanceB;
    });
  };
  
  const calculateHeuristic = (node, finishNode) => {
    const { row: rowA, col: colA } = node;
    const { row: rowB, col: colB } = finishNode;
    // Manhattan distance 
    return Math.abs(rowA - rowB) + Math.abs(colA - colB);
  };
  
  const updateUnvisitedNeighborsAStar = (node, grid, finishNode) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
      const tentativeDistance = node.distance + 1; //Uniform edge weight
      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.prevNode = node;
      }
    }
  };


  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };
  
  const getNeighbors = (node, grid) => {
    const { row, col } = node;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const neighbors = [];
  
    const dr = [-1, 0, 1, 0];
    const dc = [0, 1, 0, -1];
  
    for (let i = 0; i < dr.length; i++) {
      const newRow = row + dr[i];
      const newCol = col + dc[i];
  
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
        neighbors.push(grid[newRow][newCol]);
      }
    }
  
    return neighbors;
  };
  
  
