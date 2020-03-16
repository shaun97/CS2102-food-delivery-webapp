import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

function InfoCard(props) {
    const cardItems = props.info.map((item) =>
        <Card>
            <Card.Content>
                <Card.Header>{item.header}</Card.Header>
                <Card.Description style={{fontSize: '30px'}}>
                {item.details}
                </Card.Description>
            </Card.Content>
        </Card>
    );      
    return (
        <Card.Group itemsPerRow={3} style={{marginLeft: '150px', marginRight: '10px'}}>
            {cardItems}
        </Card.Group>
    );
}

export default InfoCard;