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
            <Card.Header>Top 5 Food Items</Card.Header>
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
      // return (
      //   <Segment.Group horizontal>
      //     <Segment textAlign="center">
      //       {" "}
      //       <Statistic>
      //         <Statistic.Label>Total Number of Completed Orders</Statistic.Label>
      //         <Statistic.Value>550</Statistic.Value>
      //       </Statistic>
      //     </Segment>
      //     <Segment textAlign="center">
      //       {" "}
      //       <Statistic>
      //         <Statistic.Label>
      //           Total Cost of Completed Orders <br />
      //           Excluding Delivery Fees
      //         </Statistic.Label>
      //         <Statistic.Value>$5,550</Statistic.Value>
      //       </Statistic>
      //     </Segment>
      //     <Segment textAlign="center">
      //       {" "}
      //       <Statistic size="small">
      //         <Statistic.Label>Top 5 Favourite Food Items</Statistic.Label>
      //         <Statistic.Value>
      //           {" "}
      //           <ol>
      //             <li>horse</li>
      //             <li>monkey</li>
      //             <li>cat</li>
      //             <li>frog</li>
      //             <li>donkey</li>
      //           </ol>
      //         </Statistic.Value>
      //       </Statistic>
      //     </Segment>
      //   </Segment.Group>
    );
  }
}

export default SummaryTab;
