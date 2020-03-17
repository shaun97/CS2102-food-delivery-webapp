//Basic React Imports
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react'

//Search 
import _ from 'lodash'
import faker from 'faker'

import SearchBar from './SearchBar'



class RestaurantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'chinese'
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (
            <>
                <SearchBar></SearchBar>
                <Menu tabular style={{ marginLeft: '160px'}}>
                    <Menu.Item
                        name='chinese'
                        active={this.state.activeItem === 'chinese'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='malay'
                        active={this.state.activeItem === 'malay'}
                        onClick={this.handleItemClick}
                    />
                         <Menu.Item
                        name='western'
                        active={this.state.activeItem === 'western'}
                        onClick={this.handleItemClick}
                    />
                         <Menu.Item
                        name='indian'
                        active={this.state.activeItem === 'indian'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </>
        )
    }
}

export default RestaurantsTab;
