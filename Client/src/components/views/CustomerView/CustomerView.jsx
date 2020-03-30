//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';

import RestaurantsTab from './RestaurantView/RestaurantsTab';
import CartTab from './CartView/CartTab';
import HistoryView from './HistoryView/HistoryView'


class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      menu: [
        { name: "Restaurants", icon: "food" },
        { name: "Cart", icon: "shopping cart" },
        { name: "History", icon: "history" }
      ],
      activeTab: 'Restaurants',
    };

    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(item) {
    const fname = item.fname;
    this.setState(prevState => {
      return {
        cartItems: prevState.cartItems.filter(function (obj) {
          return obj.fname !== fname;
        })
      }
    })
  }

  changeActiveTab(event) {
    this.setState({
      activeTab: event.currentTarget.id,
    })
  }

  handleAddToCart(food) {
    if (this.state.cartItems.some(obj => obj.rname != food.rname)) {
      alert("Please order only from one restaurant!");
    }

    if (this.state.cartItems.includes(food)) return;
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, food]
    }))
  }

  render() {
    let tab;
    switch (this.state.activeTab) {
      case 'Restaurants':
        tab = <RestaurantsTab handleAddToCart={this.handleAddToCart}></RestaurantsTab>;
        break;
      case 'Cart':
        tab = <CartTab handleDeleteItem={this.handleDeleteItem} cartItems={this.state.cartItems}></CartTab>;
        break;
      case 'History':
        tab = <HistoryView></HistoryView>;
        break;
    }
    return (
      <div>
        <TopHeader user="Customer" />
        <NavSideBar handleChangeTab={this.changeActiveTab} navTabs={this.state.menu} />
        <div style={{ marginLeft: '160px' }}>
          {tab}
        </div>
      </div>
    );
  }
}

export default CustomerView;
