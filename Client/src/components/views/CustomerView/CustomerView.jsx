//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';

import RestaurantsTab from './RestaurantView/RestaurantsTab';


class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Restaurants", icon: "food" },
        { name: "cart", icon: "shopping cart" },
        { name: "history", icon: "history" }
      ],
    };
  }

  render() {
    return (
      <div className="riderDetails">
        <TopHeader user="Customer" />
        <NavSideBar navTabs={this.state.menu} />
        <RestaurantsTab></RestaurantsTab>
      </div>
    );
  }
}

export default CustomerView;
