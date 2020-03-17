//Basic React Imports
import React, { Component } from 'react';

import InfoCard from '../../../components/utils/InfoCard';
import NavSideBar from '../../../components/utils/SideBar';
import TopHeader from '../../../components/utils/TopHeader';
import RestaurantsTab from './RestaurantView/RestaurantsTab';
// import './RiderView.css';
import { Grid, Container } from 'semantic-ui-react'


class CustomerView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Restaurants", icon: "food" },
        { name: "Cart", icon: "shopping cart" },
        { name: "History", icon: "history" }
      ],
      info: [
        { header: "Total Salary", details: "$1000" },
        { header: "Total Hours", details: "24" },
        { header: "Total Orders", details: "100" }
      ]
    };
  }

  render() {
    return (
      <>
        <TopHeader user="Customer" />
        <NavSideBar navTabs={this.state.menu} />

        <RestaurantsTab></RestaurantsTab>
       

      </>
    );
  }
}

export default CustomerView;
