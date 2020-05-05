//Basic React Imports
import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'

function OrderCardsGrid(props) {
    const orderCards = props.orders.map((item) =>
        <Grid.Column key={item.orid} mobile={16} tablet={8} computer={5} >
            {/* </Grid.Column><Card name={item.orid} onClick={() => props.handleChangeActive(item)}> */}
            <Card name={item.orid} >
                <Card.Content>
                    <Card.Header>Order #{item.orid}</Card.Header>
                    <Card.Meta>
                        <span className='cid'>{item.rname}</span>
                    </Card.Meta>
                    <Card.Description>
                        Delivery Location: {item.location}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color = 'green'>
                            Accept Delivery
                        </Button>
                        <Button basic color='red' onClick={() => props.handleDeclineOrder(item)}>
                            Decline Delivery
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
    return (
        <Grid padded container>
            {orderCards}
        </Grid >
    )
}

export default OrderCardsGrid;