import React, { Component } from 'react';

import { Grid, Item, Header, Rating, Divider, Segment } from 'semantic-ui-react';
import FoodCategoryBar from './FoodCategoryBar';
import MenuItem from './MenuItem';

import axios from 'axios';

class RestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurant: this.props.restaurant,
            menu: [],
            reviews: [],
            activeCategory: this.props.restaurant.category,
        }
        this.handleChangeActiveCategory = this.handleChangeActiveCategory.bind(this);
    }

    handleChangeActiveCategory(category) {
        this.setState({
            activeCategory: category,
        })
    }

    componentDidMount() {
        axios.get('/restaurant/api/get/restaurantmenu', { params: { rname: this.state.restaurant.rname } }).then(res => this.setState({ menu: res.data }))
            .catch(err => console.log(err))

        axios.get('/restaurant/api/get/getrestreviews', { params: { rname: this.state.restaurant.rname } }).then(res => this.setState({ reviews: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        const reviewsToShow = (this.state.reviews.length == 0) ? <Header>There are no reviews yet!</Header>
            : this.state.reviews.map((item) =>
            <Grid.Column width={16}>
                    <Segment>
                        <Item>
                            <Item.Content style={{ textAlign: 'left' }}>
                            <Item.Header as='h3'>{item.name}</Item.Header>
                                <Item.Header as='h4'>Delivery Rating</Item.Header>
                                <Rating icon='star' disabled defaultRating={item.deliveryrating} maxRating={5} />
                                <Item.Header as='h4'>Food Review</Item.Header>
                                <Item.Description >
                                    <div>
                                        {item.foodreview}
                                    </div>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Segment>
                </Grid.Column>
            )

        const menuItemsToShow = this.state.menu.filter(function (restaurant) {
            return restaurant.category === this.state.activeCategory;
        }, this);
        return (
            <Grid padded>
                <Grid.Row >
                    <Item.Group>
                        <Item>
                            <Item.Content float='left'>
                                <Item.Header style={{ fontSize: '50px' }} as='h1'>{this.state.restaurant.rname}</Item.Header>
                                <Item.Meta style={{ textAlign: 'left' }}>{this.state.restaurant.descript}</Item.Meta>
                                {/* <Item.Description>
                                    Open?
                                </Item.Description>
                                <Item.Extra>Time?</Item.Extra> */}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Row>
                <Grid.Row>
                    <FoodCategoryBar activeCategory={this.state.activeCategory} handleChangeActiveCategory={this.handleChangeActiveCategory}></FoodCategoryBar>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign={'left'}>
                        <MenuItem handleAddToCart={this.props.handleAddToCart} isCart={false} menuItems={menuItemsToShow}></MenuItem>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Header as='h1'>What people are saying</Header>
                </Grid.Row>
                {reviewsToShow}
            </Grid>
        )
    }
}

export default RestaurantMenu