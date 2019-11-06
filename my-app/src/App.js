import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Pages from "./pages/Pages";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      isLogin: "",
      user_email: "",
      user_password: ""
    };
    console.log("sessionStorage", sessionStorage);
  }

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

  handleClickLogout = () => {
    sessionStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    this.setState({
      isLogin: false
    });
    console.log(sessionStorage.getItem("token"));
  };

  handleClick = e => {
    e.preventDefault();
    let body = {
      user_email: this.state.user_email,
      user_password: this.state.user_password
    };
    console.log(body);
    fetch("http://localhost:3000/sign/signin", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .then(json => {
        if (json.isLogin) {
          console.log(json.token);
          sessionStorage.setItem("token", json.token);
          console.log(sessionStorage.getItem("token"));
          this.setState({ isLogin: json.isLogin, user_id: json.user_id });
          alert("로그인 완료");
        } else {
          alert("다시 로그인을 시도해주세요");
        }
      });
  };

  // this.setState({
  //   user_id: e.target.value,
  //   login: localStorajsone.token !== undefined
  // });

  render() {
    console.log("자지마아~~~", this.state.isLogin);
    return (
      <div>
        <Header />
        <div>
          <Router>
            {sessionStorage.getItem("token") ? (
              <Redirect to="/pages" />
            ) : (
              <Redirect to="/" />
            )}
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  handleClick={this.handleClick}
                  value={this.state}
                  handleClickEmail={this.handleClickEmail}
                  handleClickPw={this.handleClickPw}
                />
              )}
            />
            <Route
              path="/pages"
              render={() => (
                <Pages handleClickLogout={this.handleClickLogout} />
              )}
            />
            <Route path="/signup" component={SignUp} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
