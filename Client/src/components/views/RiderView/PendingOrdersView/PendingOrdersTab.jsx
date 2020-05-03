//Basic React Imports
import React, { Component } from "react";
import { Button, Divider, List, Loader } from "semantic-ui-react";

import OrderCardsGrid from './OrderCardsGrid';

import axios from 'axios';

class PendingOrdersTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrder:'',
      orders: [],
      isLoading: true,
    }
    this.declineOrder = this.declineOrder.bind(this);
  }

  componentDidMount() {
    axios.get('/rider/api/get/ordersfromdb').then(res => {
      this.setState({ orders: res.data })
      this.setState({
        isLoading: false,
      })
    }).catch(err => console.log(err))
  }
  
  declineOrder(order) {
    const { orders } = this.state;
    orders.splice(orders.indexOf(order), 1);
    this.setState({
      orders
    });
  }

  render() {
    let view = <OrderCardsGrid handleDeclineOrder ={this.declineOrder} orders = {this.state.orders}></OrderCardsGrid>
    let loadScreen = (this.state.isLoading) ? <Loader active inline = 'centered' /> : ''
    return (
      <>
        {view}
        {loadScreen}
      </>
    )
  }
}
export default PendingOrdersTab;
