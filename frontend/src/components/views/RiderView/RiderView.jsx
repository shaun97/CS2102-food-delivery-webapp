//Basic React Imports
import React, { Component } from 'react';
import InfoCard from '../../../utils/InfoCard';
import NavSideBar from '../../../utils/SideBar';
import TopHeader from '../../../utils/TopHeader';
// import './RiderView.css';

class RiderView extends Component {
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
        <TopHeader user="Rider"/>
        <NavSideBar navTabs={this.state.menu}/>
        <InfoCard info={this.state.info}/>
      </div>
    );
  }
}

export default RiderView;
