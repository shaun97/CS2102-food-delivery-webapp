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

import axios from "axios";
import AddFood from "./AddFood";
import SearchBar from "./SearchBar";

var rname = ""; //get this from the sign in
const id = 5;

class UpdateMenuTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      menu: [],
      isLoading: false,
    };
    this.changeActiveFood = this.changeActiveFood.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    axios
      .get("/staff/api/get/getRestaurant", { params: { staffID: id } })
      .then((res) => {
        this.setState({ rname: res.data });
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("/staff/api/get/getRestaurantFood", { params: { rname: rname } })
      .then((res) => {
        this.setState({ food: res.data });
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
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
    const menuItemsToShow = this.state.menu.filter(function (restaurant) {
      return restaurant.rname === this.state.activeCategory;
    }, this);

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
                results={this.handleOnInputChange}
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
                  <AddFood></AddFood>
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
