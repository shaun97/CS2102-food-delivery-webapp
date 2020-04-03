//Basic React Imports
import React, { Component } from 'react';

import NavSideBar from '../../utils/SideBar';
import TopHeader from '../../utils/TopHeader';
import Summary from './SummaryTab/SummaryInfo';
import Customer from './CustomerInfoTab/CustomerInfo';


class FDSManagerView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Summary", icon: "home" },
        { name: "Customer Info", icon: "home" },
        { name: "Rider Info", icon: "home" }
      ],
      info: [
        { header: "Total Salary", details: "$1000" },
        { header: "Total Hours", details: "24" },
        { header: "Total Orders", details: "100" }
      ],
      activeTab: 'Summary',
      currentMonth: '',
    };
    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  changeActiveTab(event) {
    this.setState({
      activeTab: event.currentTarget.id,
    })
  };

  render() {
    let tab;
    switch (this.state.activeTab) {
      case 'Summary':
        tab = <Summary></Summary>
        break;
      case 'Customer Info':
        tab = <Customer></Customer>
        break;
      case 'Rider Info':
        tab = <Summary></Summary>
        break;
    }
    return (
      <div className="riderDetails">
        <TopHeader user="Manager" />
        <NavSideBar handleChangeTab={this.changeActiveTab} navTabs={this.state.menu}/>
        <div style={{ marginLeft: '160px' }}>
          {tab}
        </div>
      </div>
    );
  }
}

export default FDSManagerView;

