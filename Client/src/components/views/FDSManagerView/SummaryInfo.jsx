import React, { Component } from 'react'
import { Grid, Segment, Statistic } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react';
import axios from 'axios';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalOrders: '',
            newCustomers: '',
            orderDetails: '',
            totalSales: 0,
            isLoading: true,
        }
    }

    componentDidMount() {
        axios.get('/api/get/getMonthTotalOrders').then(res => {
            this.setState({ totalOrders: res.data.length })
            this.setState({ orderDetails: res.data })
            this.setState({
                isLoading: false,
            })
            //calculate total sales
            let orders = this.state.orderDetails.map(item => {
                return {
                    orid: item.orid,
                    cost: item.cartcost,
                    deliveredTime: item.deliveredtime
                }
            })
            let sum = 0;
            for(let i = 0; i < orders.length; i++) {
                sum += orders[i].cost;
            }
            this.setState({ totalSales: sum })
        }).catch(err => console.log(err))

        axios.get('/api/get/getNewCustomers').then(res => {
            this.setState({ newCustomers: res.data.length })
            this.setState({
                isLoading: false,
            })
        }).catch(err => console.log(err))
    }

    render() {
        let loadScreen = (this.state.isLoading) ? <Loader active inline='centered' />
            : ''
        return(
            <Grid columns={3} divided>
                <Grid.Row stretched>
                <Grid.Column>
                <Segment.Group>
                    <Segment textAlign='left'>{this.props.month}</Segment>
                    <Segment.Group>
                    <Segment>
                    <Statistic size='tiny'>
                        <Statistic.Label>Total Orders</Statistic.Label>
                        <Statistic.Value>{this.state.totalOrders}</Statistic.Value>
                    </Statistic>
                    </Segment>
                    <Segment>
                    <Statistic size='tiny'>
                        <Statistic.Label>Total New Customers</Statistic.Label>
                        <Statistic.Value>{this.state.newCustomers}</Statistic.Value>
                    </Statistic>
                    </Segment>
                    <Segment>
                    <Statistic size='tiny'>
                        <Statistic.Label>Total Sales from Orders</Statistic.Label>
                        <Statistic.Value>${this.state.totalSales}</Statistic.Value>
                    </Statistic>
                    </Segment>
                    </Segment.Group>
                </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                    <Segment>1</Segment>
                    <Segment>2</Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>1</Segment>
                </Grid.Column>
                </Grid.Row>
                {loadScreen}
            </Grid>
        )
    }
}

export default Summary