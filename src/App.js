import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import LayoutComponent from "./components/Layout";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <LayoutComponent />
        </div>
      </Router>
    );
  }
}

export default App;
