import React, { Component } from "react";

class Container extends Component {
  constructor({ match }) {
    super({ match });
    console.log(match);
  }
  render() {
    return (
      <div>
        <h2>난 컨테이너이다.</h2>
      </div>
    );
  }
}

export default Container;
