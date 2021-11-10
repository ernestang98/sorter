import './App.css';

import VisualizerComponent from "./components/VisualizerComponent";
import React from "react";

class App extends React.Component {
  render() {
    return(
        <div className="App">
          <VisualizerComponent/>
        </div>
    )
  }
}

export default App;
