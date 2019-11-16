import React, { Component } from "react";
import { Input, Button, InputGroup, InputGroupAddon } from "reactstrap";

class AddTitle extends Component {
  constructor(props) {
    super(props);
  }

  hadleClickAddContainer = async () => {
    if (this.props.addcontainer !== "") {
      let body = {
        c_title: this.props.addcontainer,
        B_key: this.props.value
      };
      await fetch(`http://localhost:3000/containers/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          token: sessionStorage.getItem("token")
        }
      }).then(
        res => res.json(),

        this.props.handleClickCancelBtn(),
        alert("추가 되었습니다.")
      );
      this.props.fetchcontainer();
      this.props.T_reset();
    } else {
      alert("내용을 다시 입력해 주세요");
    }
  };

  render() {
    return (
      <div
        style={{
          float: "left",
          margin: "0 40px 30px 0",
          width: "300px",
          backgroundColor: "#F5C475",
          padding: "5px",
          borderRadius: "5px"
        }}
      >
        <Input placeholder="Write your todo" onChange={this.props.addfx} />
        <InputGroup>
          <InputGroupAddon addonType="append">
            <Button
              style={{
                background: "#F09F48",
                border: "0",
                marginLeft: "167px"
              }}
              onClick={this.hadleClickAddContainer}
            >
              Add Todo
            </Button>
            <Button
              style={{
                background: "#F09F48",
                border: "0",
                width: "30px"
              }}
              onClick={this.props.handleClickCancelBtn}
            >
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default AddTitle;
