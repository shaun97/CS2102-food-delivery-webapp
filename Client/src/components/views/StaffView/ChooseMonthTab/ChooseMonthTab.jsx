//Basic React Imports
import React, { Component } from "react";

import { Card, Feed, Header, Menu } from "semantic-ui-react";
import axios from "axios";

class ChooseMonthTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      totalOrders: 0,
      totalRevenue: 0,
      top5Orders: [],
      activeItem: "May",
      rname: this.props.rname
    };

    this.getMonthFromString = this.getMonthFromString.bind(this);
  }

  componentDidMount() {
    axios.get("/staff/api/get/getTotalOrders", { //query to get total order for this month
      params: {
        rname: this.state.rname,
        monthSelected: this.getMonthFromString(this.state.activeItem) + 1
      },
    }).then((res) => {
      this.setState({ totalOrders: res.data[0].count })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTotalRevenue", { //query to get total revenue for this month
      params: {
        rname: this.state.rname,
        monthSelected: this.getMonthFromString(this.state.activeItem) + 1
      },
    }).then((res) => {
      this.setState({ totalRevenue: res.data[0].totalcost })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTop5Orders", { //query to top 5 orders
      params: {
        rname: this.state.rname,
        monthSelected: this.getMonthFromString(this.state.activeItem) + 1
      },
    }).then((res) => {
      this.setState({ top5Orders: res.data })
    }).catch((err) => console.log(err));

  }

  getMonthFromString(mon) {
    var d = Date.parse(mon + "1, 2012");
    if (!isNaN(d)) {
      return new Date(d).getMonth();
    }
    return -1;
  }

  handleItemClick = (e, { name }) => {
    const monthSelected = this.getMonthFromString(name) + 1;
    this.setState({ activeItem: name })
    axios.get("/staff/api/get/getTotalOrders", { //query to get total order for this month
      params: {
        rname: this.state.rname,
        monthSelected: monthSelected
      },
    }).then((res) => {
      // console.log(res);
      this.setState({ totalOrders: res.data[0].count })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTotalRevenue", { //query to get total revenue for this month
      params: {
        rname: this.state.rname,
        monthSelected: monthSelected
      },
    }).then((res) => {
      //console.log(res);
      this.setState({ totalRevenue: res.data[0].totalcost })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTop5Orders", { //query to top 5 orders
      params: {
        rname: this.state.rname,
        monthSelected: monthSelected
      },
    }).then((res) => {
      //console.log(res);
      this.setState({ top5Orders: res.data })
    }).catch((err) => console.log(err));
  };

  render() {
    console.log(this.state)
    const { activeItem } = this.state;
    let top5Orders = (this.state.top5Orders.length === 0) ? <Header as='h5'>There are no orders placed yet for this month</Header>
      : this.state.top5Orders.map((item, i) =>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content={i + 1} />
            <Feed.Summary>{item.fname} | {item.amount} </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      )
    return (
      <div>
        <h1>Choose a month to view summary:</h1>
        <Menu center pointing fluid secondary widths={12}>
          <Menu.Item
            name="Jan"
            active={activeItem === "Jan"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Feb"
            active={activeItem === "Feb"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Mar"
            active={activeItem === "Mar"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Apr"
            active={activeItem === "Apr"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="May"
            active={activeItem === "May"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="June"
            active={activeItem === "June"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="July"
            active={activeItem === "July"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Aug"
            active={activeItem === "Aug"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sep"
            active={activeItem === "Sep"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Oct"
            active={activeItem === "Oct"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Nov"
            active={activeItem === "Nov"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Dec"
            active={activeItem === "Dec"}
            onClick={this.handleItemClick}
          />
        </Menu>

        <Card.Group>
          <Card>
            <Card.Content>
              <Card.Header>
                Total Number of Completed Orders This Month
            </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Header size="huge" textAlign="center">
                      {this.state.totalOrders}
                    </Header>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>
                Total Revenue from Orders This Month (exc. delivery fees)
            </Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Header size="huge" textAlign="center">
                      ${this.state.totalRevenue}
                    </Header>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Top 5 Food Items This Month</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                {top5Orders}
              </Feed>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}
export default ChooseMonthTab;
