import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer.jsx'
function App() {
  const [algorithm,setAlgorithm]=useState('bfs');
  const [visualize,setVisualize]=useState(false);
  const [clear,setClear]=useState(false);
  const [animated,setAnimated]=useState(false)
  
  useEffect(()=>{
    // console.log(algorithm);
    // console.log(visualize);
  },[algorithm])
  return (
    <div className="App">
      <Navbar className="navbar" setVis={setVisualize} algo={algorithm} setClear={setClear} setAlgo={setAlgorithm} setAnimated={setAnimated} />

      <PathfindingVisualizer className="visualizer" vis={visualize} setVis={setVisualize} algo={algorithm} clear={clear} setClear={setClear} animated={animated} setAnimated={setAnimated}></PathfindingVisualizer>
    </div>
  );
}

export default App;
