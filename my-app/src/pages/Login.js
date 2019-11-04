import React from "react";
import { Label, Input, Button } from "reactstrap";

class Login extends React.Component {
  handleClick = e => {
    e.preventDefault();
    let body = {
      user_email: "onsddd2123@naver.com",
      user_password: "12300000"
    };
    fetch("http://localhost:3000/sign/signin", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        alert("로그인 완료");
      });
  };
  render() {
    return (
      <div>
        <div
          style={{
            width: "350px",
            height: "320px",
            border: "2px solid #FAFAFA",
            margin: "0 auto",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#FE9A2E",
            color: "#FFFFFF"
          }}
        >
          <h3>LOGIN</h3>
          <div style={{ marginTop: "25px" }}>
            <Label for="exampleId" style={{ fontSize: "18px" }}>
              User ID
            </Label>
            <Input
              type="id"
              name="id"
              id="exampleId"
              placeholder="ID를 입력하세요"
            />
          </div>
          <div style={{ margin: "25px 0 25px 0" }}>
            <Label for="examplePassword" style={{ fontSize: "18px" }}>
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password를 입력하세요"
            />
          </div>
          <span
            style={{
              fontStyle: "normal",
              color: "#E6E6E6",
              marginLeft: "5px"
            }}
          >
            Not registered?
            <span style={{ color: "#ffd700" }}> Create an account</span>
          </span>
        </div>
        <div
          style={{
            width: "350px",
            height: "45px",
            border: "2px solid #FAFAFA",
            margin: "0 auto"
          }}
        >
          <Button
            style={{
              width: "350px",
              height: "45px",
              border: "2px solid #FAFAFA",
              margin: "0 auto",
              marginTop: "20px",
              borderRadius: "10px",
              backgroundColor: "#FE9A2E",
              color: "#FFFFFF",
              fontSize: "23px",
              verticalAlign: "middle"
            }}
            onClick={this.handleClick}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
