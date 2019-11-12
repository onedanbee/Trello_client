import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Button } from "reactstrap";

const Mypage = props => {
  console.log("mypage", props);
  return (
    <div>
      {sessionStorage.getItem("token") ? (
        <Redirect to="/mypage" />
      ) : (
        <Redirect to="/" />
      )}
      <h5>비밀번호 수정</h5>
      <Input onChange={props.onChangeUpdatePw} />
      <Button onClick={props.handleClickMypagePw}>변경하기</Button>
    </div>
  );
};

export default Mypage;
