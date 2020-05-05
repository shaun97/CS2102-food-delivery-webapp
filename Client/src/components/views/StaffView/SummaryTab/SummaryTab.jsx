//Basic React Imports
import React, { Component } from "react";

import { Card, Feed, Header } from "semantic-ui-react";

import axios from "axios";

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      // menu: []
      month: d.getMonth(),
      totalOrders: "0",
      totalCost: "0",
      topOrder: "",
      secOrder: "",
      thirdOrder: "",
      fourthOrder: "",
      fifthOrder: "",
    };
  }

  componentDidMount() {
    axios
      .get("/staff/api/get/getTotalOrders", {
        params: {
          monthSelected: 4,

          //monthSelected: this.state.month + 1,
          rname: "Chinese Kitchen",
        },
      })
      .then((res) => {
        this.setState({ totalOrders: res.data.length });
        this.setState({ orderDetails: res.data });
        this.setState({
          isLoading: false,
        });
        //calculate total sales **need to remove the delivery charges
        let orders = this.state.orderDetails.map((item) => {
          return {
            orid: item.orid,
            cost: item.cartcost,
            fee: item.fee,
          };
        });
        let sum = 0;
        for (let i = 0; i < orders.length; i++) {
          sum += orders[i].cost;
          sum -= orders[i].fee; //need to remove deliveryfees
        }
        this.setState({ totalCost: sum });
      })
      .catch((err) => console.log(err));
  }

  render() {
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
              Total Cost of Completed Orders This Month (exc. delivery fees)
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Header size="huge" textAlign="center">
                    ${this.state.totalCost}
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
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="1st" />
                  <Feed.Summary>Yoghurt | *num of orders* </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="2nd" />
                  <Feed.Summary>Omlette | *num of orders*</Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="3rd" />
                  <Feed.Summary>Macdonner | *num of orders* </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="4th" />
                  <Feed.Summary>Hannok | *num of orders* </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content="5th" />
                  <Feed.Summary>GFC | *num of orders* </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </Card.Group>
    );
  }
}

export default SummaryTab;
