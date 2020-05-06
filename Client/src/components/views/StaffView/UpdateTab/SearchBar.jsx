import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";

var source;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
    };
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    let initialState = { isLoading: false, results: [], value: "" };

    source = this.props.menu.map((item) => {
      return {
        title: item.fname,
        description: item.fdescript,
        price: item.price.toString()
      };
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);
      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.title);
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      });
    }, 200);
  };

  handleResultSelect = (e, { result }) => {

    let food = this.props.menu.filter(food => food.fname === result.title);
    this.props.handleChangeActive(food[0]);
  };

  render() {
    return (
      <Search
        fluid
        placeholder="Search foods..."
        input={{ fluid: true }}
        loading={this.state.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true,
        })}
        results={this.state.results}
        value={this.state.value}
        style={{ margin: "10px" }}
      />
    );
  }
}

export default SearchBar;
