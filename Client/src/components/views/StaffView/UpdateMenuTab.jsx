//Basic React Imports
import React, { Component } from "react";

import {
  Button,
  Divider,
  Segment,
  Grid,
  Header,
  Icon,
  Search
} from "semantic-ui-react";

class UpdateMenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  render() {
    return (
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="search" />
                Search food to edit
              </Header>

              <Search placeholder="Search foods..." />
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="food" />
                Add New Food
              </Header>
              <Button primary>Add</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
export default UpdateMenuTab;
