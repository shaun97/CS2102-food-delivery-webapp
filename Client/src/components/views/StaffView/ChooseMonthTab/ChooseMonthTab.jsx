//Basic React Imports
import React, { Component } from "react";

import { Tab, Menu, List } from "semantic-ui-react";

var d = new Date();

class ChooseMonthTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      // activeItem: d.getMonth(),
      activeItem: "May",
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <h1>Choose a month to view summary:</h1>
        <Menu pointing vertical>
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
      </div>
    );
  }
}
export default ChooseMonthTab;
