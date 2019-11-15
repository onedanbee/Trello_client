import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
class SignUp extends Component {
  state = {
    user_id: "",
    user_email: "",
    user_password: "",
    isSignup: ""
  };

  handleClickId = e => {
    e.preventDefault();
    this.setState({
      user_id: e.target.value
    });
  };

  handleClickEmail = e => {
    e.preventDefault();
    this.setState({
      user_email: e.target.value
    });
  };

  handleClickPw = e => {
    e.preventDefault();
    this.setState({
      user_password: e.target.value
    });
  };

  handleClickJoin = async () => {
    let body = {
      user_id: this.state.user_id,
      user_email: this.state.user_email,
      user_password: this.state.user_password
    };
    let result = await fetch("http://localhost:3000/users/signUp", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      return res.json();
    });
    if (result.isSignup) {
      alert("회원가입 완료");
      this.setState({ isSignup: result.isSignup });
    } else {
      alert("다시 작성해주세요");
    }
  };
  render() {
    return (
      <div>
        {this.state.isSignup && <Redirect to="/" />}

        <div style={{ marginTop: "50px" }}>
          <h4 style={{ textAlign: "center", marginBottom: "40px" }}>SIGN UP</h4>
          <Form style={{ width: "300px", margin: "0 auto" }}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
                onChange={this.handleClickEmail}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleId">ID</Label>
              <Input
                type="id"
                name="id"
                id="exampleId"
                placeholder="with a placeholder"
                onChange={this.handleClickId}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password placeholder"
                onChange={this.handleClickPw}
              />
            </FormGroup>
            <Button
              style={{ marginLeft: "108px" }}
              onClick={this.handleClickJoin}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUp;
