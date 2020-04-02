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
    this.changeActiveOrder = this.changeActiveOrder.bind(this);
  }

  componentDidMount() {
    axios.get('/api/get/ordersfromdb').then(res => {
      this.setState({ orders: res.data })
      this.setState({
        isLoading: false,
      })
    }).catch(err => console.log(err))
  }

  changeActiveOrder(order) {
    this.setState({
      activeOrder: order,
    });
  }

  render() {
    let view = <OrderCardsGrid handleChangeActive ={this.changeActiveOrder} orders = {this.state.orders}></OrderCardsGrid>
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
