//Basic React Imports
import React, { Component } from "react";

import { Card, Feed, Header } from "semantic-ui-react";

import axios from "axios";

var now = new Date(Date.now());

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rname: this.props.rname,
      monthSelected: now.getMonth() + 1,
      totalOrders: 0,
      totalRevenue: 0,
      top5Orders: [],
    };
  }

  componentDidMount() {
    axios.get("/staff/api/get/getTotalOrders", { //query to get total order for this month
      params: {
        rname: this.state.rname,
        monthSelected: this.state.monthSelected
      },
    }).then((res) => {
      this.setState({ totalOrders: res.data[0].count })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTotalRevenue", { //query to get total revenue for this month
      params: {
        rname: this.state.rname,
        monthSelected: this.state.monthSelected
      },
    }).then((res) => {
      this.setState({ totalRevenue: res.data[0].totalcost })
    }).catch((err) => console.log(err));

    axios.get("/staff/api/get/getTop5Orders", { //query to top 5 orders
      params: {
        rname: this.state.rname,
        monthSelected: this.state.monthSelected
      },
    }).then((res) => {
      this.setState({ top5Orders: res.data })
    }).catch((err) => console.log(err));

  }

  render() {
    let top5Orders = (this.state.top5Orders.length === 0) ? <Header>There are no orders placed yet for this month</Header>
      : this.state.top5Orders.map((item, i) =>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date content={i + 1} />
            <Feed.Summary>{item.fname} | {item.amount} </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      )

    return (
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
    );
  }
}

export default SummaryTab;
