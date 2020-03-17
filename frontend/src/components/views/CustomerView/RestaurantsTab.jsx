//Basic React Imports
import React, { Component } from 'react';

import { Search, Grid, Header, Segment } from 'semantic-ui-react'

//Search 
import _ from 'lodash'
import faker from 'faker'

import SearchBar from './SearchBar'



class RestaurantsTab extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <SearchBar></SearchBar>
        )
    }
}

export default RestaurantsTab;
