import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Menu = props => {
  return (
    <div style={{ width: "100%", backgroundColor: "#ffc266" }}>
      <Nav>
        <NavItem style={{ margin: "0 40px 0 20px" }}>
          <Link style={{ color: "white" }} to="/board">
            board
          </Link>
        </NavItem>

        <NavItem style={{ marginRight: "20px", color: "white" }}>
          <span
            style={{
              marginRight: "20px",
              width: "100px",
              height: "30px"
            }}
            onClick={props.handleClickLogout}
          >
            Logout
          </span>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Menu;
