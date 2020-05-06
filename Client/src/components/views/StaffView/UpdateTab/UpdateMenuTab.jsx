//Basic React Imports
import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Divider,
  Segment,
  Grid,
  Header,
  Icon,
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
      activeFood: {
        fname: "",
        sold: "",
        flimit: "",
        avail: "",
        category: "",
        price: "",
        fdescript: ""
      },
      open: false
    };
    this.changeActiveFood = this.changeActiveFood.bind(this);
    // this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount() {
    axios.get("/restaurant/api/get/restaurantmenu", {
      params: { rname: this.state.rname },
    }).then((res) => this.setState({ menu: res.data }))
      .catch((err) => console.log(err));
  }

  changeActiveFood(food) {
    this.setState({
      activeFood: food,
      open: true
    });
  }

  handleOpen = () => {
    this.setState({
      open: true,
      activeFood: {
        fname: "",
        sold: "",
        flimit: "",
        avail: "",
        category: "",
        price: "",
        fdescript: ""
      },
    });
  }

  handleClose = () => this.setState({ open: false })

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

              <SearchBar
                handleChangeActive={this.changeActiveFood}
                menu={this.state.menu}
              ></SearchBar>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="food" />
                Add New Food
              </Header>
              <Modal onClose={this.handleClose} open={this.state.open} trigger={<Button onClick={this.handleOpen} primary>Add</Button>} closeIcon>
                <Modal.Content>
                  <AddFood food={this.state.activeFood} rname={this.state.rname}></AddFood>
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
