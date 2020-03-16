import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

function InfoCard(props) {
    return (
        <Card.Group>
            <Card centered style={{marginLeft: '150px'}}>
            <Card.Content>
                <Card.Header>{props.header}</Card.Header>
                <Card.Description style={{fontSize: '30px'}}>
                {props.details}
                </Card.Description>
            </Card.Content>
            </Card>
        </Card.Group>
    );
}

export default InfoCard;