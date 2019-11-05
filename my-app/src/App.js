import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
