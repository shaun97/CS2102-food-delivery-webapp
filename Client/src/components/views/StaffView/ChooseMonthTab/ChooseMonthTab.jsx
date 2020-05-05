//Basic React Imports
import React, { Component } from "react";

import { Button, Divider, List } from "semantic-ui-react";

class ChooseMonthTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  render() {
    return (
      <div>
        <h1>Choose a month to view summary:</h1>

        <Button.Group>
          <Button size="huge">Jan</Button>
          <Button size="huge">Feb</Button>
          <Button size="huge">Mar</Button>
          <Button size="huge">Apr</Button>
        </Button.Group>
      </div>
    );
  }
}
export default ChooseMonthTab;
