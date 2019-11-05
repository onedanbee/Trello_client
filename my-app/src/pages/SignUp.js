import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

class SignUp extends Component {
  render() {
    return (
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
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleId">ID</Label>
            <Input
              type="id"
              name="id"
              id="exampleId"
              placeholder="with a placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </FormGroup>
          <Button style={{ marginLeft: "108px" }}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
