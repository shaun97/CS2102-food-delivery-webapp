//Basic React Imports
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react'

//Search 
import SearchBar from './SearchBar'
import RestaurantMenu from './RestaurantMenu';
import RestaurantCardsGrid from './RestaurantCardsGrid';

class RestaurantsTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRestaurant: '',
            restaurants: [
                { restaurantName: 'Macs1', restaurantPrice: '$$', restaurantDesc: 'im lovin it' },
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
        this.changeActiveRestaurant = this.changeActiveRestaurant.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    changeActiveRestaurant(name) {
        // console.log(e);
        this.setState({
            activeRestaurant: name,
          });
    }

    render() {
        let view = (this.state.activeRestaurant == '') ?
            <RestaurantCardsGrid handleChangeActive={this.changeActiveRestaurant} restaurants={this.state.restaurants}></RestaurantCardsGrid>
            : <RestaurantMenu restaurantName={this.state.activeRestaurant}></RestaurantMenu>

        return (
            <>
                <SearchBar></SearchBar>
                <div style={{ marginLeft: '160px' }}>
                    {view}
                </div>
            </>
        )
    }
}

export default RestaurantsTab;
