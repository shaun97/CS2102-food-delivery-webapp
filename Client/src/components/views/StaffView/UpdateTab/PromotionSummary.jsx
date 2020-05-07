//Basic React Imports
import React, { Component } from "react";
import axios from "axios";

import {
    Table
} from "semantic-ui-react";

class PromotionSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rname: this.props.rname,
            promo: [],
        };
    }

    componentDidMount() {
        axios.get("/staff/api/get/getPromoSummary", {
            params: { rname: this.state.rname },
        }).then((res) => this.setState({ promo: res.data }))
            .catch((err) => console.log(err));
    }

    render() {
        console.log(this.state);
        let displaypromo = this.state.promo.map((item, i) =>
            <Table.Row>
                <Table.Cell>{(item.status) ? 'Active' : 'Inactive'}</Table.Cell>
                <Table.Cell>{item.promoname}</Table.Cell>
                <Table.Cell>{item.promotiondescript}</Table.Cell>
                <Table.Cell>{item.duration}</Table.Cell>
                <Table.Cell>{item.totalorders}</Table.Cell>
            </Table.Row>
        )
        return (
            <>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Promotion Name</Table.HeaderCell>
                            <Table.HeaderCell>Promotion Description</Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>Average Number Of Orders Per Day</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {displaypromo}
                    </Table.Body>
                </Table>
            </>
        );
    }
}
export default PromotionSummary;
