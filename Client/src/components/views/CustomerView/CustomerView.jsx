//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';

import RestaurantsTab from './RestaurantView/RestaurantsTab';


class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      cart: {
        restaurantName: '',
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
    this.setState({
      activeTab: event.target.id
    })
  }

  render() {
    let tab;
    switch (this.state.activeTab) {
      case 'Restaurants':
        tab = <RestaurantsTab></RestaurantsTab>;
        break;
      case 'Cart':
        tab = '';
        break;
      case 'History':
        tab = '';
        break;
    }
    return (
      <div className="riderDetails">
        <TopHeader user="Customer" />
        <NavSideBar handleChangeTab={this.changeActiveTab} navTabs={this.state.menu} />
        {tab}
      </div>
    );
  }
}

export default CustomerView;
