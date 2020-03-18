//Basic React Imports
import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react'


function RestaurantCardsGrid(props) {

    const restaurantCards = props.restaurants.map((item) =>
        <Grid.Column mobile={8} tablet={4} computer={2} >
            <Card>
                <Card.Content>
                    <Card.Header>{item.restaurantName}</Card.Header>
                    <Card.Meta>
                        <span className='price'>{item.restaurantPrice}</span>
                    </Card.Meta>
                    <Card.Description>
                        {item.restaurantDesc}
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
    return (
        <Grid padded container>
            {restaurantCards}
        </Grid>
    )
}

export default RestaurantCardsGrid;