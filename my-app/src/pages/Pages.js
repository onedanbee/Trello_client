import React, { Component } from "react";
import Menu from "../components/Menu";
import Board from "../pages/Board";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
class Pages extends Component {
  constructor(props) {
    super(props);
    console.log("로그아웃 할거야", props);
  }
  render() {
    return (
      <div>
        <Menu handleClickLogout={this.props.handleClickLogout} />
        <Router>
          <Route path="/board" component={Board} />
        </Router>
      </div>
    );
  }
}

export default Pages;
