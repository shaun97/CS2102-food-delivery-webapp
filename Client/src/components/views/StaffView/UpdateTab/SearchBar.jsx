import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";

var source;

const initState = { isLoading: false, results: [], value: "" };

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
    let initialState = initState;
    console.log(this.props.menu);
    source = this.props.menu.map((item) => {
      return {
        rname: item.title,
        fname: item.name,
        category: item.category,
        price: item.price,
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
    alert("You have selected smth");

    let food = {
      rname: result.title,
      fname: result.name,
      //   sold: result.qty,
      //   flimit: result.amt,
      category: result.category,
      price: result.price,
    };
    this.props.handleChangeActive(food);
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
