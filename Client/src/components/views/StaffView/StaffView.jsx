import React, { Component } from "react";
import axios from "axios";

import NavSideBar from "../../utils/SideBar";
import TopHeader from "../../utils/TopHeader";

import UpdateMenuTab from "./UpdateTab/UpdateMenuTab";
import SummaryTab from "./SummaryTab/SummaryTab";
import ChooseMonthTab from "./ChooseMonthTab/ChooseMonthTab";

import { LoginContext } from "../../LoginContext";

class StaffView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        { name: "Update Menu Info", icon: "edit" },
        { name: "This Month's Summary", icon: "calendar" },
        { name: "View Summary", icon: "calendar alternate" },
      ],
      rname: "",
      food: [],
      activeTab: "Update Menu Info",
    };
    this.changeActiveTab = this.changeActiveTab.bind(this);
  }

  componentDidMount() {
    let stid = this.context.user.id;
    axios
      .get("/staff/api/get/getRestaurant", {
        params: { stid: stid },
      })
      .then((res) => this.setState({ rname: res.data[0].rname }))
      .catch((err) => console.log(err));

      console.log(this.state.rname);
    axios
      .get("/restaurant/api/get/restaurantmenu", {
        params: { rname: this.state.rname },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  changeActiveTab(event) {
    this.setState({
      activeTab: event.currentTarget.id,
    });
  }

  render() {
    //console.log(this.state.food);
    let tab;
    switch (this.state.activeTab) {
      case "Update Menu Info":
        tab = <UpdateMenuTab key={this.state.rname} rname={this.state.rname}></UpdateMenuTab>;
        break;
      case "This Month's Summary":
        tab = <SummaryTab rname={this.state.rname}></SummaryTab>;
        break;
      case "View Summary":
        tab = <ChooseMonthTab rname={this.state.rname}></ChooseMonthTab>;
        break;
    }

    return (
      <div className="summaryDetails">
        <TopHeader signOut={this.context.signOut} user="Staff" />
        <NavSideBar
          handleChangeTab={this.changeActiveTab}
          navTabs={this.state.menu}
        />
        <div style={{ marginLeft: "160px" }}>{tab}</div>
      </div>
    );
  }
}
StaffView.contextType = LoginContext;
export default StaffView;
