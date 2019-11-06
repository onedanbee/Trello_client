import React from "react";
import { Link } from "react-router-dom";
import { Label, Input, Button } from "reactstrap";

class Login extends React.Component {
  render() {
    const { handleClick, handleClickEmail, handleClickPw } = this.props;

    return (
      <div style={{ margin: "130px 0 200px 0" }}>
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
            <Label for="exampleEmail" style={{ fontSize: "18px" }}>
              User Email
            </Label>
            <Input
              type="email"
              name="user_email"
              id="user_email"
              placeholder="Email를 입력하세요"
              onChange={handleClickEmail}
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
              onChange={handleClickPw}
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
            <span style={{ color: "#ffd700" }}>
              <Link to="/signup"> Create an account</Link>
            </span>
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
            onClick={handleClick}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
