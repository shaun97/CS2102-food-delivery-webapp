import React, { Component } from "react";
import axios from "axios";

import NavSideBar from "../../utils/SideBar";
import TopHeader from "../../utils/TopHeader";

import UpdateMenuTab from "./UpdateTab/UpdateMenuTab";
import SummaryTab from "./SummaryTab/SummaryTab";
import ChooseMonthTab from "./ChooseMonthTab/ChooseMonthTab";

import { LoginContext } from "../../LoginContext";

var rname;

class StaffView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rname: "",
      menu: [
        { name: "Update Menu Info", icon: "edit" },
        { name: "This Month's Summary", icon: "calendar" },
        { name: "View Summary", icon: "calendar alternate" },
      ],
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

    axios
      .get("/restaurant/api/get/restaurantmenu", {
        params: { rname: rname },
      })

      // this.setState({ menu: res.data })

      .then((res) => console.log(res.data[0]))
      .catch((err) => console.log(err));
  }

  changeActiveTab(event) {
    console.log(event.currentTarget.id);
    this.setState({
      activeTab: event.currentTarget.id,
    });
  }

  render() {
    console.log(this.context.user.id);
    let tab;
    switch (this.state.activeTab) {
      case "Update Menu Info":
        tab = <UpdateMenuTab>rname={this.state.rname}</UpdateMenuTab>;
        break;
      case "This Month's Summary":
        tab = <SummaryTab></SummaryTab>;
        break;
      case "View Summary":
        tab = <ChooseMonthTab></ChooseMonthTab>;
        break;
    }

    return (
      <div className="summaryDetails">
        <h1>{this.context.rname} hello </h1>
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
