import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = { boardlist: [] };

    this.componentDidMount = async () => {
      let board = await this.fetchboard();
      this.setState({ boardlist: board });
    };
    this.fetchboard = async () => {
      return await fetch("http://localhost:3000/boards/", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: sessionStorage.getItem("token")
        }
      }).then(res => res.json());
    };
    console.log("로그아웃 할거야", props);
  }
  render() {
    return (
      <div>
        {!sessionStorage.getItem("token") && <Redirect to="/" />}

        {this.state.boardlist.map(val => (
          <Link to={`/board/${val.B_key}`}>
            <Button>{val.b_title}</Button>
          </Link>
        ))}
      </div>
    );
  }
}

export default Pages;
