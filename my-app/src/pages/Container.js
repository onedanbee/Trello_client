import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CardText
} from "reactstrap";

class Container extends Component {
  constructor({ match, props }) {
    super({ match, props });
    console.log("match!!", match);
    console.log("history", this.props.history);

    this.state = {
      containerlist: [],
      modal: false,
      card_modify: "",
      card_n: "",
      card_update: false
    };

    // , click: "false", title: "", container_key:""
  }

  componentDidMount = async () => {
    await this.fetchcontainer();
    // this.setState({ containerlist: container });
    console.log(this.state);
  };

  fetchcontainer = async () => {
    let container = await fetch(
      `http://localhost:3000/containers/${this.props.match.params.B_key}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          token: sessionStorage.getItem("token")
        }
      }
    ).then(res => res.json());

    this.setState({ containerlist: container });
  };

  toggle = e => {
    this.setState({ modal: true, card_n: e.target.id });
  };

  togglecancel = () => {
    this.setState({ modal: false });
  };

  handleClickTitle = e => {
    e.preventDefault();
    this.setState({
      card_modify: e.target.value
    });
  };

  handleClickTest = async e => {
    console.log(e.target);
    await fetch(`http://localhost:3000/cards/${e.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ modal: false, card_update: true }),
      alert("삭제가 완료")
    );
    this.fetchcontainer();
  };

  handleClickTitleFetch = async () => {
    let body = { card_text: this.state.card_modify };
    await fetch(`http://localhost:3000/cards/${this.state.card_n}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ modal: false, card_update: true }),
      alert("수정이 완료되었습니다.")
    );
    this.fetchcontainer();
    console.log("내 옆 바보래요");
  };
  render() {
    console.log("state :", this.state);
    return (
      <div>
        <div style={{ margin: "50px 0 0 30px" }}>
          {this.state.containerlist.map(val => (
            <div
              style={{
                float: "left",
                margin: "0 40px 30px 0",
                width: "300px"
              }}
            >
              <CardHeader onClick={this.handleClciktitle}>
                {val.c_title}
              </CardHeader>

              <span>
                {val.cards.map(card => (
                  <Card>
                    <CardBody>
                      <CardText
                        id={card.card_key}
                        onClick={this.toggle}
                        style={{ width: "89%", float: "left" }}
                      >
                        {card.card_text}
                      </CardText>

                      <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.togglecancel}>
                          Modify TODO
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            onChange={this.handleClickTitle}
                            onClick={this.handleClickTitle}
                          ></Input>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={this.toggle}
                            onClick={this.handleClickTitleFetch}
                          >
                            Do Something
                          </Button>{" "}
                          <Button color="secondary" onClick={this.togglecancel}>
                            Cancel
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <Button
                        close
                        aria-label="Cancel"
                        onClick={this.handleClickTest}
                        style={{
                          float: "left",
                          width: "10%"
                        }}
                        id={card.card_key}
                        onClick={this.handleClickTest}
                      ></Button>
                    </CardBody>
                  </Card>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Container;
