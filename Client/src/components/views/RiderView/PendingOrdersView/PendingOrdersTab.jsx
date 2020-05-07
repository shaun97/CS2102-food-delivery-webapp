//Basic React Imports
import React, { Component } from "react";
import { Loader, Grid, Header } from "semantic-ui-react";

import OrderCardsGrid from './OrderCardsGrid';

import axios from 'axios';
import { LoginContext } from '../../../LoginContext';
import AcceptedOrders from "./AcceptedOrders";

class PendingOrdersTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOrder:[],
      orders: [],
      isLoading: true,
    }

    this.changeActiveOrder = this.changeActiveOrder.bind(this);
    this.clearActiveOrder = this.clearActiveOrder.bind(this);
  }

  componentDidMount() {
    axios.get('/rider/api/get/ordersfromdb').then(res => {
      this.setState({ orders: res.data })
      this.setState({
        isLoading: false,
      })
    }).catch(err => console.log(err))

    axios.get('/rider/api/get/activeOrders', { params: { rid: this.context.user.id }}).then(res => {
      this.setState({ activeOrder: res.data })
    }).catch(err => console.log(err))
  }
  
  changeActiveOrder() {
    axios.get('/rider/api/get/activeOrders', { params: { rid: this.context.user.id }}).then(res => {
      this.setState({ activeOrder: res.data })
    }).catch(err => console.log(err))

    axios.get('/rider/api/get/ordersfromdb').then(res => {
      this.setState({ orders: res.data })
      this.setState({
        isLoading: false,
      })
    }).catch(err => console.log(err)) 
  }
  clearActiveOrder() {
    axios.get('/rider/api/get/activeOrders', { params: { rid: this.context.user.id }}).then(res => {
      this.setState({ activeOrder: res.data })
    }).catch(err => console.log(err))  
  };
  render() {
    console.log(this.state.activeOrder);
    let acceptedOrders = this.state.activeOrder.map((item) => <AcceptedOrders handleRemoveActive={this.clearActiveOrder} order ={item} />)
    console.log(acceptedOrders)
    let view = this.state.orders.map((item) => <OrderCardsGrid handleActiveOrder={this.changeActiveOrder} rid={this.context.user.id} order = {item}></OrderCardsGrid>)
    let loadScreen = (this.state.isLoading) ? <Loader active inline = 'centered' /> : ''
    return (
      <>
        <Grid padded container divided='vertically'>
          <Grid.Row>
            <Header>Orders you are delivering</Header>
          </Grid.Row>
          <Grid.Row>
            {acceptedOrders}
          </Grid.Row>
          <Grid.Row>
            <Header>Orders Available</Header>
          </Grid.Row>
          <Grid.Row>
            {view}
          </Grid.Row>
        </Grid>
        {loadScreen}
      </>
    )
  }
}
PendingOrdersTab.contextType = LoginContext;
export default PendingOrdersTab;
