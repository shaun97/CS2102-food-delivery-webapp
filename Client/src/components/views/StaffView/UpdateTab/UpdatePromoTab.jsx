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

import AddPromo from "./AddPromo";
import SearchBarPromo from "./SearchBarPromo";

class UpdatePromoTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rname: this.props.rname,
            query: "",
            promo: [],
            activePromo: {
                promoname: "",
                promotiontype: "",
                discount: "",
                pid: 0,
                promotiondescript: "",
                startd: "",
                endd: ""
            },
            open: false
        };
        this.changeActivePromo = this.changeActivePromo.bind(this);
        // this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        axios.get("/staff/api/get/getpromo", {
            params: { rname: this.state.rname },
        }).then((res) => this.setState({ promo: res.data }))
            .catch((err) => console.log(err));
    }

    changeActivePromo(promo) {
        this.setState({
            activePromo: promo,
            open: true
        });
    }

    handleOpen = () => {
        this.setState({
            open: true,
            activePromo: {
                promoname: "",
                promotiontype: "",
                discount: "",
                pid: 0,
                promotiondescript: "",
                startd: "",
                endd: ""
            },
        });
    }

    handleClose = () => this.setState({ open: false })

    render() {
        console.log(this.state);
        return (
            <Segment placeholder>
                <Grid columns={2} stackable textAlign="center">
                    <Divider vertical>Or</Divider>

                    <Grid.Row verticalAlign="middle">
                        <Grid.Column>
                            <Header icon>
                                <Icon name="search" />Search promotion to edit</Header>
                            <SearchBarPromo
                                handleChangeActive={this.changeActivePromo}
                                menu={this.state.promo}
                            ></SearchBarPromo>
                        </Grid.Column>
                        <Grid.Column>
                            <Header icon>
                                <Icon name="dollar sign" />Add New Promo</Header>
                            <Modal onClose={this.handleClose} open={this.state.open} trigger={<Button onClick={this.handleOpen} primary>Add</Button>} closeIcon>
                                <Modal.Content>
                                    <AddPromo promo={this.state.activePromo} rname={this.state.rname}></AddPromo>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}
export default UpdatePromoTab;
