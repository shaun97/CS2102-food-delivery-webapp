//Basic React Imports
import React, { Component } from 'react';

import { Search, Grid, Header, Segment, Container } from 'semantic-ui-react'

//Search 
import _ from 'lodash'


var source;

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            results: [],
            value: ''
        }
    }

    handleResultSelect = (e, { result }) => {
        let restaurant = {
            rname: result.title,
            descript: result.description,
            minOrder: result.price
        }
        this.props.handleChangeActive(restaurant);
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        let initialState = { isLoading: false, results: [], value: '' };

        source = this.props.restaurants.map(item => {
            return {
                title: item.rname,
                description: item.descript,
                price: item.minOrder
            }
        })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 200)
    }

    render() {
        return (
            <Search
                fluid
                input={{ fluid: true }}
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                })}
                results={this.state.results}
                value={this.state.value}
                style={{ margin: '10px' }}
            />

        )
    }
}

export default SearchBar;
