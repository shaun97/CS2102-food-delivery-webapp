//Basic React Imports
import React, { Component } from 'react';

import InfoCard from '../../../components/utils/InfoCard';
import NavSideBar from '../../../components/utils/SideBar';
import TopHeader from '../../../components/utils/TopHeader';
// import './RiderView.css';


class StaffView extends Component {
  constructor() {
    super();
    this.state = {
      menu: ["Summary", "Schedule"],
      info: [
        {header: "Total Salary", details: "$1000"},
        {header: "Total Hours", details: "24"},
        {header: "Total Orders", details: "100"}
      ]
    };
  }

  render() {
    return (
      <div className="riderDetails">
        <TopHeader user="Staff"/>
        <NavSideBar navTabs={this.state.menu}/>
        <InfoCard info={this.state.info}/>
      </div>
    );
  }
}

export default StaffView;
