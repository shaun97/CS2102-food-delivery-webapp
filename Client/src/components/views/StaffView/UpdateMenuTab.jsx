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

const fakeMenu = [
  {
    fname: "M&Ms",
    quantity: 20,
    price: 2
  },
  {
    fname: "Lays",
    quantity: 200,
    price: 20
  }
];

class UpdateMenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      menu: []
    };
  }

  render() {
    const resRender = ({ fname, quantity, price }) => (
      <span key="fname">
        {fname}: ${price}, {quantity}
      </span>
    );

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

              <Search
                placeholder="Search foods..."
                fluid
                results={fakeMenu}
                resultRenderer={resRender}
              />
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
