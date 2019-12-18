import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Button, Label, CustomInput } from "reactstrap";

const Mypage = props => {
  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        marginTop: "60px"
      }}
    >
      {sessionStorage.getItem("token") ? (
        <Redirect to="/mypage" />
      ) : (
        <Redirect to="/" />
      )}

      <Label style={{ width: "100%", fontSize: "18px" }}>
        비밀번호를 변경하겠습니까?
      </Label>
      <Input
        onChange={props.onChangeUpdatePw}
        style={{
          width: "70%",
          float: "left",
          height: "10%",
          marginBottom: "40px"
        }}
        type="password"
        placeholder="password를 입력하세요"
      ></Input>
      <Button
        onClick={props.handleClickMypagePw}
        style={{
          width: "30%",
          float: "left",
          fontSize: "14px",
          height: "10%",
          marginBottom: "40px"
        }}
      >
        Modify
      </Button>

      <Label style={{ fontSize: "18px" }}>회원탈퇴를 하시겠습니까?</Label>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          padding: "10px"
        }}
      >
        <p>사유를 골라주세요</p>
        <CustomInput
          type="checkbox"
          id="exampleCustomCheckbox"
          label="서비스가 마음에 안듭니다."
        />
        <CustomInput
          type="checkbox"
          id="exampleCustomCheckbox2"
          label="개인사유입니다."
        />
        <CustomInput
          type="checkbox"
          id="exampleCustomCheckbox3"
          label="더이상 사용하지 않습니다."
        />
        <CustomInput
          type="checkbox"
          id="exampleCustomCheckbox4"
          label="해킹을 당했습니다."
        />
        <Button
          onClick={props.handleClickUserDelete}
          style={{ marginTop: "20px" }}
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );
};

export default Mypage;
