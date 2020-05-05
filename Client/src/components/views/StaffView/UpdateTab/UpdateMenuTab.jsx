//Basic React Imports
import React, { Component } from "react";

import {
  Button,
  Divider,
  Segment,
  Grid,
  Header,
  Icon,
  Search,
  Modal,
} from "semantic-ui-react";

import AddFood from "./AddFood";
import SearchBar from "./SearchBar";

class UpdateMenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rname: this.props.rname,
      query: "",
      menu: [],
      isLoading: false,
    };
    console.log(this.props);
    this.changeActiveFood = this.changeActiveFood.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  changeActiveRestaurant(restaurant) {
    this.setState({
      activeRestaurant: restaurant,
    });
  }

  changeActiveFood(food) {
    this.setState({
      activeFood: food,
    });
  }

  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (!query) {
      this.setState({ query, menu: {}, message: "" });
    } else {
      this.setState({ query, loading: true, message: "" }, () => {
        this.fetchSearchResults(1, query);
      });
    }
  };

  // handleAdd = () {
  //   this.props.viewSelector("add");
  // }

  render() {
    console.log(this.state.rname);

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

              {/* <SearchBar
                handleChangeActive={this.changeActiveFood}
                food={this.state.food}
              ></SearchBar> */}

              <Search
                placeholder="Search foods..."
                fluid
                //results={this.handleOnInputChange}
                //resultRenderer={}
              />
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="food" />
                Add New Food
              </Header>
              <Modal trigger={<Button primary>Add</Button>} closeIcon>
                <Modal.Content>
                  <AddFood rname={this.state.rname}></AddFood>
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
export default UpdateMenuTab;
