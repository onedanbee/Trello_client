import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ backgroundColor: "", padding: "180px 0  250px 0" }}>
          <Router>
            <Route exact path="/" component={Login} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
