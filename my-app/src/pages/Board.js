import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Board extends Component {
  render() {
    console.log(this.props.state);
    return (
      <div>
        {this.props.state.boardlist.map(val => (
          <Link to={`/board/${val.B_key}`}>
            <Button>{val.b_title}</Button>
          </Link>
        ))}
      </div>
    );
  }
}

export default Board;
