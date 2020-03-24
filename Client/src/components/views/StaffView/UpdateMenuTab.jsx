//Basic React Imports
import React, { Component } from "react";

import { Button, Divider, Segment, Input } from "semantic-ui-react";

class UpdateMenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  render() {
    return (
      <Segment basic textAlign="center">
        <Input
          action={{ color: "blue", content: "Search" }}
          icon="search"
          iconPosition="left"
          placeholder="Food Name"
        />

        <Divider horizontal>Or</Divider>

        <Button
          color="teal"
          content="Create New Food"
          icon="add"
          labelPosition="left"
        />
      </Segment>
    );
  }
}
export default UpdateMenuTab;
