import React, { Component } from "react";
import { Button, Form, Select } from "semantic-ui-react";
import axios from "axios";

const categoryOptions = [
    { key: "fixed", value: "fixed", text: "Fixed Discount" },
    { key: "percentage", value: "percentage", text: "Percentage Off" },
];

class AddPromo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rname: this.props.rname,
            promoname: this.props.promo.promoname,
            promotiontype: this.props.promo.promotiontype,
            discount: this.props.promo.discount,
            pid: this.props.promo.pid,
            promotiondescript: this.props.promo.promotiondescript,
            startd: this.props.promo.startd,
            endd: this.props.promo.endd
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
        const newPromo = {
            rname: this.state.rname,
            promoname: this.state.promoname,
            promotiontype: this.state.promotiontype,
            discount: this.state.discount,
            pid: this.state.pid,
            promotiondescript: this.state.promotiondescript,
            startd: this.state.startd,
            endd: this.state.endd
        }
        axios
          .post("staff/api/posts/addNewPromo", newPromo)
          .then((res) => {
            console.log(res);
            if (res.data != 'nok') { 
              alert((this.props.promo.pid) ? "Promo Updated" : "New Promo Added"); 
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
                    icon="clipboard list"
                    iconPosition="left"
                    placeholder="Promotion Name"
                    required={true}
                    name="promoname"
                    value={this.state.promoname}
                    onChange={this.handleChange}
                />
                <Form.Input
                    fluid
                    icon="file outline"
                    iconPosition="left"
                    placeholder="Promotion Description"
                    required={true}
                    name="promotiondescript"
                    value={this.state.promotiondescript}
                    onChange={this.handleChange}
                />
                <Form.Dropdown
                    fluid
                    placeholder="Select Promotion Type"
                    required={true}
                    control={Select}
                    options={categoryOptions}
                    name="promotiontype"
                    value={(this.state.selectedType) ? this.state.selectedType : this.state.promotiontype}
                    onChange={this.handleDropdown}
                />
                <Form.Input
                    fluid
                    icon="dollar sign"
                    iconPosition="left"
                    placeholder="Amount of discount"
                    required={true}
                    name="discount"
                    value={this.state.discount}
                    onChange={this.handleChange}
                />
                <Form.Input
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    placeholder="Start Date DD/MM/YYY"
                    required={true}
                    name="startd"
                    value={this.state.startd}
                    onChange={this.handleChange}
                />
                <Form.Input
                    fluid
                    icon="calendar outline"
                    iconPosition="left"
                    placeholder="End Date DD/MM/YYY"
                    required={true}
                    name="endd"
                    value={this.state.endd}
                    onChange={this.handleChange}
                />
                <Button
                    color="blue"
                    fluid
                    size="large"
                    onClick={this.handleSubmitClick}>
                    {(this.props.promo.pid) ? "Update Promotion" : "Add Promotion"}
                </Button>
            </Form>
        );
    }
}

export default AddPromo;
