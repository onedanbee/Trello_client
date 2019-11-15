import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import Addboard from "../components/Addboard";

class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = { boardlist: [], Bbtn: false, boardTitle: "" };
    console.log("boardTitle", this.state.boardTitle);
    console.log("pages props", this.props);
  }

  componentDidMount = async () => {
    await this.fetchboard();
  };
  fetchboard = async () => {
    let board = await fetch("http://localhost:3000/boards/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(res => res.json());

    this.setState({ boardlist: board });
  };

  handleClickAddboardBtn = () => {
    this.setState({ Bbtn: true });
  };
  handleClickAddboardBtnCancel = () => {
    this.setState({ Bbtn: false });
  };

  onChangeboardTitle = e => {
    this.setState({ boardTitle: e.target.value });
  };

  handleClickboardDelete = async e => {
    let body = {
      b_title: e.target.id
    };
    await fetch(`http://localhost:3000/boards/${e.target.id}`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ board_update: true }),
      alert("삭제가 완료")
    );
    this.fetchboard();
  };

  render() {
    console.log(this.state.boardTitle);
    return (
      <div>
        {!sessionStorage.getItem("token") && <Redirect to="/" />}
        <h4
          style={{
            paddingTop: "30px",
            color: "#6290B9",
            marginLeft: "5%"
          }}
        >
          Your Board List
        </h4>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            height: "100%"
          }}
        >
          {this.state.boardlist.map(val => (
            <ButtonGroup
              style={{
                width: "200px",
                margin: "20px 90px 0 0"
              }}
            >
              <Link to={`/board/${val.B_key}`}>
                <Button
                  style={{
                    width: "160px",
                    height: "60px",
                    backgroundColor: "#FE9A2E",
                    border: "0"
                  }}
                >
                  {val.b_title}
                </Button>
              </Link>
              <Button
                style={{ backgroundColor: "#FE9A2E", border: "0" }}
                id={val.b_title}
                onClick={this.handleClickboardDelete}
              >
                X
              </Button>
            </ButtonGroup>
          ))}

          {this.state.Bbtn ? (
            <Addboard
              handleClickAddboardBtnCancel={this.handleClickAddboardBtnCancel}
              onChangeboardTitle={this.onChangeboardTitle}
              boardTitle={this.state.boardTitle}
              fetchboard={this.fetchboard}
              U_key={this.props.U_key}
            />
          ) : (
            <Button
              onClick={this.handleClickAddboardBtn}
              style={{
                width: "150px",
                marginTop: "20px",
                backgroundColor: "#ffc266",
                border: "0"
              }}
            >
              Add Board
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Pages;
