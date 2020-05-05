import React, { Component } from "react";
import { Button, Form, Select } from "semantic-ui-react";
import axios from "axios";

//var rname = "Chinese Kitchen"; //todo: change this later

const categoryOptions = [
  { key: "Western", value: "Western", flag: "Western", text: "Western" },
  { key: "Chinese", value: "Chinese", flag: "Chinese", text: "Chinese" },
  { key: "Malay", value: "Malay", flag: "Malay", text: "Malay" },
  { key: "Japanese", value: "Japanese", flag: "Japanese", text: "Japanese" },
  { key: "Korean", value: "Korean", flag: "Korean", text: "Korean" },
  { key: "Indian", value: "Indian", flag: "Indian", text: "Indian" },
  { key: "Thai", value: "Thai", flag: "Thai", text: "Thai" },
];

class AddFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rname: this.props.rname,
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

    this.handleDropdown = (event, data) => {
      this.setState({
        [data.name]: data.value,
      });
    };
  }

  handleSubmitClick() {
    console.log(this.state.rname);
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
            // selection
            control={Select}
            options={categoryOptions}
            name="category"
            onChange={this.handleDropdown}
            value={this.state.selectedCategory}
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
