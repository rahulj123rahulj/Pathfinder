import { useState} from "react";
import { MenuData } from "./MenuData.js";
import "./NavbarStyles.css";
export const Navbar=({setVis,algo,setAlgo,setClear,setAnimated})=>{
    const [clicked,setClicked]=useState(false);
    const options = [
        { label:'BFS',value:'bfs' },
        { label:'Bidirectional BFS',value:'bibfs' },
        { label:'DFS',value:'dfs' },
        { label:'Dijkstra',value:'dij' },
        { label:'A* Algorithm',value:'astar' },

      ];
      const handleChange = (event) => {
        setAlgo(event.target.value);
      };
    return (<>
        <nav className="NavbarItems">
                <h1 className="logo">
                    PathFinding Visualizer <i className="fab fa-react"></i></h1>
                    <div className="menu-icons"
                    // onClick={setClicked(!clicked)}
                    >
                        <i className={clicked? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                <li key={"Button"}>
                            <a href='' className="nav-links main" onClick={(e)=>{
                                e.preventDefault();
                                setVis(true)}}>
                                Visualize
                            </a>
                    </li>
                    <li key={"algorithm"}>
                        <select className="dropdown" value={algo} onChange={handleChange}>
                            {options.map((option,key) => (
                                <option key={key} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                            
                    </li>
                    
                    <li key={"clearPath"}>
                            <a href='' className="nav-links" onClick={(e)=>{
                                e.preventDefault();
                                setClear(true)
                                setAnimated(false);
                            }
                            }>
                                Clear Path
                            </a>
                    </li>
                    <li key={"clearBoard"}>
                            <a href='' className="nav-links">
                                Clear Board
                            </a>
                    </li>
                    
                </ul>
            </nav>
            </>
        );
}
export default Navbar;