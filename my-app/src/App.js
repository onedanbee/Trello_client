import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Pages from "./pages/Pages";
import Menu from "./components/Menu";
import Container from "./pages/Container";
import Mypage from "./pages/Mypage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      isLogin: "",
      user_email: "",
      user_password: "",
      U_key: "",
      board_update: false,
      user_password_update: "",
      leave: false
    };
    console.log("sessionStorage", sessionStorage);
    console.log(this.state);
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
          this.setState({
            isLogin: json.isLogin,
            user_id: json.user_id,
            U_key: json.U_key
          });
          console.log(this.state);
          alert("로그인 완료");
        } else {
          alert("다시 로그인을 시도해주세요");
        }
      });
  };

  handleClickMypagePw = async () => {
    if (this.state.user_password_update !== "") {
      let body = {
        user_id: this.state.user_id,
        user_email: this.state.user_email,
        user_password: this.state.user_password_update
      };
      await fetch(`http://localhost:3000/sign/${this.state.U_key}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
          token: sessionStorage.getItem("token")
        }
      }).then(
        res => res.json(),

        this.setState({ card_update: true }),
        alert("수정완료"),
        this.handleClickLogout()
      );
    } else {
      alert("수정할 비밀번호를 입력해주세요.");
    }
  };

  onChangeUpdatePw = e => {
    this.setState({
      user_password_update: e.target.value
    });
  };

  handleClickUserDelete = async () => {
    await fetch(`http://localhost:3000/sign/${this.state.U_key}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        token: sessionStorage.getItem("token")
      }
    }).then(
      res => res.json(),

      this.setState({ leave: true }),
      alert("회원탈퇴가 완료되었습니다."),
      this.handleClickLogout()
    );
  };

  render() {
    console.log("token아 있니", this.state.isLogin);
    return (
      <div>
        <Header />

        <div>
          <Router>
            {sessionStorage.getItem("token") ? (
              <Menu handleClickLogout={this.handleClickLogout} />
            ) : null}

            {/* {sessionStorage.getItem("token") ? (
              <Redirect to="/pages" />
            ) : (
              <Redirect to="/" />
            )} */}
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
                <Pages
                  handleClickLogout={this.handleClickLogout}
                  U_key={this.state.U_key}
                />
              )}
            />
            <Route path="/signup" component={SignUp} />
            <Route path="/board/:B_key" component={Container} />
            <Route
              path="/mypage"
              // component={Mypage}
              // handleClickMypagePw={this.handleClickMypagePw}
              // onChangeUpdatePw={this.onChangeUpdatePw}
              render={() => (
                <Mypage
                  handleClickMypagePw={this.handleClickMypagePw}
                  onChangeUpdatePw={this.onChangeUpdatePw}
                  handleClickUserDelete={this.handleClickUserDelete}
                  leave={this.state.leave}
                />
              )}
            />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
