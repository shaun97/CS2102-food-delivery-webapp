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
      fname: this.props.food.fname,
      flimit: this.props.food.flimit,
      category: this.props.food.category,
      price: this.props.food.price,
      fdescript: this.props.food.fdescript
    };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);

    this.handleChange = (event) => {
      console.log(event.target.name);
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
      fname: this.state.fname,
      flimit: this.state.flimit,
      category: this.state.category,
      price: this.state.price,
      fdescript: this.state.fdescript
    }
    axios
      .post("staff/api/posts/addNewFood", newFood)
      .then((res) => {
        console.log(res);
        if (res.data != 'nok') { 
          alert((this.props.food.fname) ? "Food Updated" : "New Food Added"); 
        } else {
          alert("Please fill in the inputs correctly!");
        } 
      });
  }

  render() {
    return (
      <Form>
        <Form.Input
          fluid
          icon="food"
          iconPosition="left"
          placeholder="Food"
          required={true}
          name="fname"
          value={this.state.fname}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          icon="food"
          iconPosition="left"
          placeholder="Food Description"
          required={true}
          name="fdescript"
          value={this.state.fdescript}
          onChange={this.handleChange}
        />
        <Form.Input
          fluid
          icon="circle outline"
          iconPosition="left"
          placeholder="Quantity"
          required={true}
          name="flimit"
          value={this.state.flimit}
          onChange={this.handleChange}
        />
        <Form.Dropdown
          fluid
          placeholder="Select Category"
          required={true}
          control={Select}
          options={categoryOptions}
          name="category"
          value={(this.state.selectedCategory) ? this.state.selectedCategory : this.state.category}
          onChange={this.handleDropdown}
        />
        <Form.Input
          fluid
          icon="dollar"
          iconPosition="left"
          placeholder="Price"
          required={true}
          name="price"
          value={this.state.price}
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
