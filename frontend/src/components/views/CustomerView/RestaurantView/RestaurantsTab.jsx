//Basic React Imports
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react'

//Search 
import SearchBar from './SearchBar'
import RestaurantCardsGrid from './RestaurantCardsGrid';

class RestaurantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'chinese',
            restaurants: [
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
                { restaurantName: 'Macs', restaurantPrice: '$$', restaurantDesc: 'im lovin it' }
            ]
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (
            <>
                <SearchBar></SearchBar>
                <Menu tabular style={{ marginLeft: '160px' }}>
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
                    <Menu.Item
                        name='japanese'
                        active={this.state.activeItem === 'japanese'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <div style={{ marginLeft: '160px' }}>
                    <RestaurantCardsGrid restaurants={this.state.restaurants}></RestaurantCardsGrid>
                </div>
            </>
        )
    }
}

export default RestaurantsTab;
