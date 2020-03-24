//Basic React Imports
import React, { Component } from "react";

import InfoCard from "../../utils/InfoCard";
import NavSideBar from "../../utils/SideBar";
import TopHeader from "../../utils/TopHeader";
// import './RiderView.css';

import UpdateMenuTab from "./UpdateMenuTab";
import SummaryTab from "./SummaryTab";
import ChooseMonthTab from "./ChooseMonthTab";

class StaffView extends Component {
  constructor() {
    super();
    this.state = {
      menu: [
        { name: "Update Menu Info", icon: "edit" },
        { name: "This Month's Summary", icon: "calendar" },
        { name: "Other Month's Summary", icon: "calendar alternate" }
      ],
      activeTab: "This Month's Summary"
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
      case "Update Menu Info":
        tab = <UpdateMenuTab></UpdateMenuTab>;
        break;
      case "This Month's Summary":
        tab = <SummaryTab></SummaryTab>;
        break;
      case "Other Month's Summary":
        tab = <ChooseMonthTab></ChooseMonthTab>;
        break;
    }
    return (
      <div className="summaryDetails">
        <TopHeader user="Staff" />
        <NavSideBar
          handleChangeTab={this.changeActiveTab}
          navTabs={this.state.menu}
        />
        <div style={{ marginLeft: "160px" }}>{tab}</div>
      </div>
    );
  }
}

export default StaffView;
