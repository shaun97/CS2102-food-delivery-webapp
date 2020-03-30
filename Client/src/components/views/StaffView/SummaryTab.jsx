//Basic React Imports
import React, { Component } from "react";

import { Card, Feed, Header, Segment, List } from "semantic-ui-react";

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
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
                    1000
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
                    $30,000
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
