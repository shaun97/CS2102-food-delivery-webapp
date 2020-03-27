import React, { Component } from 'react';

import { Grid, Item, Button } from 'semantic-ui-react';
import FoodCategoryBar from './FoodCategoryBar';
import MenuItem from './MenuItem';

import axios from 'axios';

class RestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant,
            menu: [],
            activeCategory: 'Chinese'
        }

        this.handleChangeActiveCategory = this.handleChangeActiveCategory.bind(this);
    }

    handleChangeActiveCategory(category) {
        this.setState({
            activeCategory: category,
        })
    }

    componentDidMount() {
        axios.get('/api/get/restaurantmenu', { params: { rname: this.state.restaurant.rname } }).then(res => this.setState({menu: res.data}))
            .catch(err => console.log(err))

        axios.get()
    }

    render() {
        console.log(this.state.menu);
        const menuItemsToShow = this.state.menu.filter(function (restaurant) {
            return restaurant.category === this.state.activeCategory;
        }, this);
        return (
            <Grid padded>
                <Grid.Row>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header as='a'>{this.state.restaurant.rname}</Item.Header>
                                <Item.Meta>{this.state.restaurant.descript}</Item.Meta>
                                {/* <Item.Description>
                                    Open?
                                </Item.Description>
                                <Item.Extra>Time?</Item.Extra> */}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Row>
                <Grid.Row>
                    <FoodCategoryBar handleChangeActiveCategory={this.handleChangeActiveCategory}></FoodCategoryBar>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign={'left'}>
                        <MenuItem isCart={false} menuItems={menuItemsToShow}></MenuItem>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default RestaurantMenu