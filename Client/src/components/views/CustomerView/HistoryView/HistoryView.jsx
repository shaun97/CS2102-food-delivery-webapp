import React, { Component } from 'react'

import axios from 'axios';

import { Header, Form, Grid, Button, Segment, Divider } from 'semantic-ui-react'
import Orders from './Orders';

class HistoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
            // cartItems: this.props.cartItems.map(item => {
            //     return {
            //         fname: item.fname,
            //         price: item.price,
            //         category: item.category,
            //         rname: item.rname,
            //         qty: 0,
            //     }
            // })
        }
    }

    componentDidMount() {
        let cid = 4;
        axios.get('customer/api/get/getorderhistory', { params: { cid: cid } })
            .then(res => {
                this.setState({
                    orders: res.data.map(item => {
                        console.log(item.rname);
                        return {
                            cartCost: item.cartcost,
                            deliveredTime: item.deliveredtime,
                            location: item.location,
                            orid: item.orid,
                            rname: item.rname
                        }
                    })
                });
            }
            );
        // this.setState({
        //     orders: orderGet
        // })

    }
    render() {
        const orders = this.state.orders.map((item) =>
            <Orders order={item}></Orders>
        )
        return (
            <Grid textAlign='left' padded>
                <Grid.Column width={16}>
                    <Grid.Row>
                        <Header as='h1'>History</Header>
                        <Divider />
                    </Grid.Row>
                    <Grid.Row fluid padded>
                        {orders}
                    </Grid.Row>
                </Grid.Column>
            </Grid >
        )
    }

}

export default HistoryView;