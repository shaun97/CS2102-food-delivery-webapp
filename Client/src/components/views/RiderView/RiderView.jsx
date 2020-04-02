//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';

import PendingOrdersTab from './PendingOrdersView/PendingOrdersTab';
import DeliveryScheduleTab from './DeliveryScheduleView/DeliveryScheduleTab';
import SummaryTab from './SummaryView/SummaryTab';

class RiderView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Pending Orders", icon: "home" },
        { name: "Delivery Schedule", icon: "calendar"},
        { name: "Summary", icon: "calendar"}
      ],
      activeTab: "Pending Orders"
    };
    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  changeActiveTab(event) {
    console.log(event.currentTarget.id);
    this.setState({
      activeTab: event.currentTarget.id
    });
  }

  render() {
    let tab;
    switch (this.state.activeTab) {
      case "Pending Orders":
        tab = <PendingOrdersTab></PendingOrdersTab>;
        break;
      case "Delivery Schedule":
        tab = <DeliveryScheduleTab></DeliveryScheduleTab>;
        break;
      case "Summary":
        tab = <SummaryTab></SummaryTab>;
        break;
    }
    return (
      <div>
        <TopHeader user="Rider" />
        <NavSideBar 
          handleChangeTab={this.changeActiveTab}
          navTabs={this.state.menu}
        />
        <div style={{ marginLeft: "160px" }}>{tab}</div>
      </div>
    );
  }
}

export default RiderView;
