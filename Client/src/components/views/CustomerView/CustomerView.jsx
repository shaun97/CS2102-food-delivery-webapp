//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';

import RestaurantsTab from './RestaurantView/RestaurantsTab';
import CartTab from './CartView/CartTab'


class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      cart: {
        restaurantName: 'Macs',
        cartItems: [//foodname
        ]
      },
      menu: [
        { name: "Restaurants", icon: "food" },
        { name: "Cart", icon: "shopping cart" },
        { name: "History", icon: "history" }
      ],
      activeTab: 'Restaurants',
    };

    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  changeActiveTab(event) {
    console.log(event.currentTarget.id)
    this.setState({
      activeTab: event.currentTarget.id
    })
  }

  render() {
    let tab;
    switch (this.state.activeTab) {
      case 'Restaurants':
        tab = <RestaurantsTab></RestaurantsTab>;
        break;
      case 'Cart':
        tab = <CartTab cart={this.state.cart}></CartTab>;
        break;
      case 'History':
        tab = '';
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
