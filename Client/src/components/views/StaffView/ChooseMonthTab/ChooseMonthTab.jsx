//Basic React Imports
import React, { Component } from "react";

import { Card, Feed, Header, Menu } from "semantic-ui-react";


class ChooseMonthTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      totalOrders: 0,
      totalRevenue: 0,
      top5Orders: [],
      activeItem: "May",
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

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
              Total Revenue of Completed Orders This Month (exc. delivery fees)
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
      </div>
    );
  }
}
export default ChooseMonthTab;
