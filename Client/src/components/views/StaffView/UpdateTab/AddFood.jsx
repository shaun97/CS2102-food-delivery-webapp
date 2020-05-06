import React, { Component } from "react";
import { Button, Form, Select } from "semantic-ui-react";
import axios from "axios";

const categoryOptions = [
  { key: "Western", value: "Western", text: "Western" },
  { key: "Chinese", value: "Chinese", text: "Chinese" },
  { key: "Malay", value: "Malay", text: "Malay" },
  { key: "Japanese", value: "Japanese", text: "Japanese" },
  { key: "Korean", value: "Korean", text: "Korean" },
  { key: "Indian", value: "Indian", text: "Indian" },
  { key: "Thai", value: "Thai", text: "Thai" },
];

class AddFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rname: this.props.rname,
      food: this.props.food
    };

    console.log(this.state.rname);

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
    const newFood = {
      rname: this.state.rname,
      fname: this.state.food.fname,
      sold: 0, // check logic for this
      flimit: this.state.food.flimit,
      avail: true, // check logic for this
      category: this.state.food.category,
      price: this.state.food.price,
      fdescript: this.state.food.fdescript
    };

    axios
      .post("staff/api/posts/addNewFood", newFood)
      .then((res) => alert("New Food Added")) //can put trigger if got fname conflict
      .catch((err) => alert("Please fill in the form with the correct inputs"));
  }

  render() {
    console.log(this.state.food);
    return (
      <Form>
        <Form.Input
          fluid
          icon="food"
          iconPosition="left"
          placeholder="Food"
          required={true}
          name="food.fname"
          value={this.state.food.fname}
          onChange={this.handleChange}
        />
         <Form.Input
          fluid
          icon="food"
          iconPosition="left"
          placeholder="Food Description"
          required={true}
          name="food.fdescript"
          value={this.state.food.fdescript}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          icon="circle outline"
          iconPosition="left"
          placeholder="Quantity"
          required={true}
          name="food.flimit"
          value={this.state.food.flimit}
          onChange={this.handleChange}
        />
        <Form.Dropdown
          fluid
          placeholder="Select Category"
          required={true}
          control={Select}
          options={categoryOptions}
          name="food.category"
          value={(this.state.selectedCategory) ? this.state.selectedCategory : this.state.food.category}
          onChange={this.handleDropdown}
        />
        <Form.Input
          fluid
          icon="dollar"
          iconPosition="left"
          placeholder="Price"
          required={true}
          name="food.price"
          value={this.state.food.price}
          onChange={this.handleChange}
        />
        <Button
          color="blue"
          fluid
          size="large"
          onClick={this.handleSubmitClick}>
            {(this.props.food.fname) ? "Update Food" : "Add Food"}
        </Button>
      </Form>
    );
  }
}

export default AddFood;
