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
      fname: "",
      sold: "",
      flimit: "",
      avail: "",
      category: "",
      price: "",
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
    console.log(this.state.rname);
    const newFood = {
      rname: this.state.rname,
      fname: this.state.fname,
      sold: 0,
      flimit: this.state.flimit,
      avail: true,
      category: this.state.category,
      price: this.state.price,
    };
    console.log(this.state.rname);

    axios
      .post("staff/api/posts/addNewFood", newFood)
      .then((res) => alert("New Food Added")) //can put trigger if got fname conflict
      .catch((err) => alert("Please fill in the form with the correct inputs"));
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
    );
  }
}

export default AddFood;
