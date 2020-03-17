//Basic React Imports
import React, { Component } from 'react';

import InfoCard from '../../../components/utils/InfoCard';
import NavSideBar from '../../../components/utils/SideBar';
import TopHeader from '../../../components/utils/TopHeader';
// import './RiderView.css';


class RiderView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Summary", icon: "home" },
        { name: "Schedule", icon: "calendar"}
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
      <div className="riderDetails">
        <TopHeader user="Rider" />
        <NavSideBar navTabs={this.state.menu} />
        <InfoCard info={this.state.info} />
      </div>
    );
  }
}

export default RiderView;
