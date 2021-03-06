import React, { Component } from "react";
import { Input, Button, InputGroup, InputGroupAddon } from "reactstrap";

class Addboard extends Component {
  constructor(props) {
    super(props);
  }

  hadleClickAddBoard = async () => {
    if (this.props.boardTitle !== "") {
      let body = {
        b_title: this.props.boardTitle,
        U_key: this.props.U_key
      };
      await fetch(`http://localhost:3000/boards/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          token: sessionStorage.getItem("token")
        }
      }).then(
        res => res.json(),
        this.props.handleClickAddboardBtnCancel(),
        alert("추가 되었습니다.")
      );
      this.props.fetchboard();
    } else {
      return alert("내용을 입력해주세요");
    }
  };
  render() {
    return (
      <div
        style={{
          float: "left",
          margin: "20px 40px 30px 0",
          width: "300px",
          backgroundColor: "#ffc266",
          padding: "5px",
          borderRadius: "5px"
        }}
      >
        <Input
          placeholder="Write your board"
          onChange={this.props.onChangeboardTitle}
        />
        <InputGroup>
          <InputGroupAddon addonType="append">
            <Button
              style={{
                background: "#FE9A2E",
                border: "0",
                marginLeft: "100px",
                width: "160px",
                borderRadius: "3px"
              }}
              onClick={this.hadleClickAddBoard}
            >
              Add Board
            </Button>
            <Button
              style={{
                background: "#FE9A2E",
                border: "0",
                width: "30px"
              }}
              onClick={this.props.handleClickAddboardBtnCancel}
            >
              X
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  }
}

export default Addboard;
