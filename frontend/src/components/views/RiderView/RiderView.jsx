//Basic React Imports
import React, { Component } from 'react';
import InfoCard from '../../../utils/InfoCard';
import NavSideBar from '../../../utils/SideBar';
import TopHeader from '../../../utils/TopHeader';
import './RiderView.css';

class RiderView extends Component {
  constructor() {
    super();
    this.state = {
      menu: ["Summary", "Schedule"]
    };
  }

  render() {
    return (
      <div className="riderDetails">
        <TopHeader user="Rider"/>
        <NavSideBar navTabs={this.state.menu}/>
        <InfoCard header="Total Salary" details="$1000"/>
        <InfoCard header="Total Hours" details="24"/>
        <InfoCard header="Total Orders" details="100"/>
      </div>
    );
  }
}

export default RiderView;
