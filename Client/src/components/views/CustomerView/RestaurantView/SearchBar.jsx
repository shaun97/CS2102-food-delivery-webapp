//Basic React Imports
import React, { Component } from 'react';

import { Search, Grid, Header, Segment, Container } from 'semantic-ui-react'

//Search 
import _ from 'lodash'
import faker from 'faker'


const source = _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            results: [],
            value: ''
        }
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        let initialState = { isLoadin: false, results: [], value: '' };

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState(initialState)

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(source, isMatch),
            })
        }, 300)
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
                    {...this.props}
                    style={{margin: '10px', marginLeft: '160px'}}
                />
  
        )
    }
}

export default SearchBar;
