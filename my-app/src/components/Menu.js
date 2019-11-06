import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Menu = () => {
  return (
    <div>
      <Nav>
        <NavItem>
          <Link>Link</Link>
        </NavItem>
        <NavItem>
          <Link>Link</Link>
        </NavItem>
        <NavItem>
          <Link>Another Link</Link>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Menu;
