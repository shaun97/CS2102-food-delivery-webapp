//Basic React Imports
import React, { Component } from "react";

//Semantic
import { Button, Form } from "semantic-ui-react";

import axios from "axios";

var rname = "Chinese Kitchen"; //todo: change this later

// const categoryOptions = [
//   { key: "Western", value: "Western", flag: "Western", text: "Western" },
//   { key: "chi", value: "Chinese", flag: "chi", text: "Chinese" },
//   { key: "mal", value: "Malay", flag: "mal", text: "Malay" },
//   { key: "jap", value: "Japanese", flag: "jap", text: "Japanese" },
//   { key: "kor", value: "Korean", flag: "kor", text: "Korean" },
//   { key: "ind", value: "Indian", flag: "ind", text: "Indian" },
//   { key: "tha", value: "Thai", flag: "tha", text: "Thai" },
// ];

const categoryOptions = [{ key: "Western", text: "Western", value: "Western" }];

class AddFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rname: rname,
      fname: "",
      sold: "",
      flimit: "",
      avail: "",
      category: "",
      price: "",
    };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    this.handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      });
    };
  }

  handleSubmitClick() {
    const newFood = {
      //   rname: "Chinese Kitchen",
      //   fname: "Food",
      //   sold: 0,
      //   flimit: "10",
      //   avail: true,
      //   category: "Western",
      //   price: "5",
      rname: this.state.rname,
      fname: this.state.fname,
      sold: 0,
      flimit: this.state.flimit,
      avail: true,
      category: this.state.category,
      price: this.state.price,
    };
    axios
      .post("staff/api/posts/addNewFood", newFood)
      .then((res) => alert("New Food Added"))
      .catch((err) => alert("Please fill in the form with the correct inputs"));
  }

  render() {
    return (
      <>
        <Form>
          <Form.Input
            fluid
            icon="food"
            iconPosition="left"
            placeholder="Food"
            required={true}
            name="fname"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="circle outline"
            iconPosition="left"
            placeholder="Quantity"
            required={true}
            name="flimit"
            onChange={this.handleChange}
          />
          <Form.Dropdown
            fluid
            placeholder="Select Category"
            required={true}
            selection
            options={categoryOptions}
            name="category"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            icon="dollar"
            iconPosition="left"
            placeholder="Price"
            required={true}
            name="price"
            onChange={this.handleChange}
          />
          <Button
            color="blue"
            fluid
            size="large"
            onClick={this.handleSubmitClick}
          >
            Add Food
          </Button>
        </Form>
      </>
    );
  }
}

export default AddFood;
