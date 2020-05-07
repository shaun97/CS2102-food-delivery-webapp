import React from 'react';
import { Card, Grid } from 'semantic-ui-react'

function RestaurantCardsGrid(props) {
    const restaurantCards = props.restaurants.map((item) =>
        <Grid.Column key={item.rname} mobile={8} tablet={4} computer={3} >
            <Card name={item.rname} onClick={() => props.handleChangeActive(item)}>
                <Card.Content>
                    <Card.Header>{item.rname}</Card.Header>
                    <Card.Meta>
                        <span className='minorder'>Minimum: ${item.minorder}</span>
                    </Card.Meta>
                    <Card.Description>
                        {item.descript}
                    </Card.Description>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
    return (
        <Grid padded container>
            {restaurantCards}
        </Grid >
    )
}

export default RestaurantCardsGrid;