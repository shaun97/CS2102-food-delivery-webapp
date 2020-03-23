//Basic React Imports
import React, { Component } from "react";

import { Segment, Statistic, List } from "semantic-ui-react";

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }

  render() {
    return (
      <Segment.Group horizontal>
        <Segment textAlign="center">
          {" "}
          <Statistic>
            <Statistic.Label>Total Number of Completed Orders</Statistic.Label>
            <Statistic.Value>550</Statistic.Value>
          </Statistic>
        </Segment>
        <Segment textAlign="center">
          {" "}
          <Statistic>
            <Statistic.Label>
              Total Cost of Completed Orders <br />
              Excluding Delivery Fees
            </Statistic.Label>
            <Statistic.Value>$5,550</Statistic.Value>
          </Statistic>
        </Segment>
        <Segment textAlign="center">
          {" "}
          <Statistic size="small">
            <Statistic.Label>Top 5 Favourite Food Items</Statistic.Label>
            <Statistic.Value>
              {" "}
              <ol>
                <li>horse</li>
                <li>monkey</li>
                <li>cat</li>
                <li>frog</li>
                <li>donkey</li>
              </ol>
            </Statistic.Value>
          </Statistic>
        </Segment>
      </Segment.Group>
    );
  }
}

export default SummaryTab;
