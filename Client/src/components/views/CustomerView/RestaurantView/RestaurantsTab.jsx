//Basic React Imports
import React, { Component } from 'react';

//Search 
import SearchBar from './SearchBar'
import RestaurantMenu from './RestaurantMenu';
import RestaurantCardsGrid from './RestaurantCardsGrid';
import { Loader } from 'semantic-ui-react';

import axios from 'axios';

class RestaurantsTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRestaurant: '',
            restaurants: [],
            isLoading: true,
        }
        this.changeActiveRestaurant = this.changeActiveRestaurant.bind(this);
    }

    componentDidMount() {
        axios.get('/restaurant/api/get/restaurantsfromdb').then(res => {
            this.setState({ restaurants: res.data })
            this.setState({
                isLoading: false,
            })
        }).catch(err => console.log(err))
    }

    changeActiveRestaurant(restaurant) {
        this.setState({
            activeRestaurant: restaurant,
        });
    }

    render() {
        let view = (this.state.activeRestaurant === '') ?
            <>
                <SearchBar handleChangeActive={this.changeActiveRestaurant} restaurants={this.state.restaurants}></SearchBar>
                <RestaurantCardsGrid handleChangeActive={this.changeActiveRestaurant} restaurants={this.state.restaurants}></RestaurantCardsGrid>
            </>
            : <RestaurantMenu handleAddToCart={this.props.handleAddToCart} restaurant={this.state.activeRestaurant}></RestaurantMenu>

        let loadScreen = (this.state.isLoading) ? <Loader active inline='centered' />
            : ''
        return (
            <>
                {view}
                {loadScreen}
            </>
        )
    }
}

export default RestaurantsTab;
