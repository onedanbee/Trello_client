import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AddTitle from "../components/AddTitle";
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
  CardText,
  InputGroup,
  InputGroupAddon,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
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
      card_update: false,
      addBtn: false,
      addcontainer: "",
      addfx: this.onChangeTitle,
      clickMd: false,
      c_title: ""
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

  handleClickTitle = e => {
    e.preventDefault();
    this.setState({
      card_modify: e.target.value
    });
  };

  handleClickTest = async e => {
    console.log("event", e.target);
    await fetch(`http://localhost:3000/cards/${e.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ card_update: true }),
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
  };

  hadleClickAddtodo = async e => {
    console.log(e.target.id);
    let body = {
      card_text: this.state.card_modify,
      C_key: e.target.id
    };
    await fetch(`http://localhost:3000/cards/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ modal: false, card_update: true }),
      alert("추가 되었습니다.")
    );
    this.fetchcontainer();
  };

  handleClickAddBtn = () => {
    this.setState({
      addBtn: true
    });
  };

  handleClickCancelBtn = () => {
    this.setState({
      addBtn: false
    });
  };

  onChangeTitle = e => {
    this.setState({
      addcontainer: e.target.value
    });
  };

  handleClickContainerDelete = async e => {
    console.log("event", e.target);
    let body = {
      C_key: e.target.id
    };
    await fetch(`http://localhost:3000/containers/${e.target.id}`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ card_update: true }),
      alert("삭제가 완료")
    );
    this.fetchcontainer();
  };

  handleClickContainerModify = async e => {
    console.log("event", e.target);
    let body = { c_title: this.state.c_title };
    await fetch(`http://localhost:3000/containers/${e.target.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ card_update: true }),
      alert("수정완료")
    );
    this.fetchcontainer();
  };

  handleClickC_title = e => {
    e.preventDefault();
    this.setState({
      c_title: e.target.value
    });
  };

  render() {
    console.log("state :", this.state);
    return (
      <div>
        {!sessionStorage.getItem("token") && <Redirect to="/" />}
        <div style={{ margin: "50px 0 0 30px" }}>
          {this.state.containerlist.map(val => (
            <div
              style={{
                float: "left",
                margin: "0 40px 30px 0",
                width: "300px"
              }}
            >
              <CardHeader>
                <UncontrolledDropdown>
                  <DropdownToggle
                    style={{
                      backgroundColor: "#F7F7F7",
                      color: "black",
                      border: "0"
                    }}
                  >
                    {val.c_title}
                  </DropdownToggle>

                  <DropdownMenu>
                    <Input
                      id={val.C_key}
                      placeholder="수정할 내용을 입력해주세요"
                      onChange={this.handleClickC_title}
                    ></Input>
                    <DropdownItem
                      id={val.C_key}
                      onClick={this.handleClickContainerModify}
                    >
                      Modify
                    </DropdownItem>
                    <DropdownItem
                      id={val.C_key}
                      onClick={this.handleClickContainerDelete}
                    >
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
                          What's your Todo?
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
                        id={card.card_key}
                        style={{
                          float: "left",
                          width: "5%",
                          height: "5%",
                          backgroundColor: "white",
                          color: "black",
                          border: "0px"
                        }}
                        onClick={this.handleClickTest}
                      >
                        x
                      </Button>
                    </CardBody>
                  </Card>
                ))}
                {/* <Button
                  onClick={this.toggle}
                  isOpen={this.state.modal}
                  container_key={val.C_key}
                >
                  Add card
                </Button> */}
                <InputGroup>
                  <Input onChange={this.handleClickTitle} />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="secondary"
                      id={val.C_key}
                      onClick={this.hadleClickAddtodo}
                    >
                      Add Todo
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </span>
            </div>
          ))}
        </div>
        {this.state.addBtn ? (
          <AddTitle
            value={this.props.match.params.B_key}
            addcontainer={this.state.addcontainer}
            addBtn={this.state.addBtn}
            addfx={this.state.addfx}
            fetchcontainer={this.fetchcontainer}
            handleClickCancelBtn={this.handleClickCancelBtn}
          />
        ) : (
          <button onClick={this.handleClickAddBtn}>Add title</button>
        )}
      </div>
    );
  }
}

export default Container;
