import React, { Component } from 'react';

import { Grid, Item } from 'semantic-ui-react';
import FoodCategoryBar from './FoodCategoryBar';
import MenuItem from './MenuItem';

class RestaurantMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: this.props.restaurantName,
            test: [
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
            ]
        }
        console.log(this.state.restaurantName);
    }


    render() {
        return (
            <Grid padded>
                <Grid.Row>
                    <Item.Group>
                        <Item>
                            {/* <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
                            <Item.Content>
                                <Item.Header as='a'>Macs</Item.Header>
                                <Item.Meta>I'm Loving it</Item.Meta>
                                <Item.Description>
                                    Open?
                                </Item.Description>
                                <Item.Extra>Time?</Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Row>
                <Grid.Row>
                    <FoodCategoryBar></FoodCategoryBar>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <MenuItem isCart={false} menuItems={this.state.test}></MenuItem>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default RestaurantMenu