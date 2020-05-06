//Basic React Imports
import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react'
import OrderItems from './OrderItemsDetail'
import Axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
function AcceptedOrders(props) {
    const [ status, setStatus ] = useState(0);

    let buttonText = "";
    switch (status) {
        case 0:
            buttonText = "Arrive at restaurant"
            break;
        case 1:
            buttonText = "Depart from restaurant"
            break;
        case 2: 
            buttonText = "Complete delivery"
            break;
    }

    function handleChangeStatus() {
        const info = {
            status: status,
            orid: props.order.orid
        }
        Axios.post('/rider/api/posts/deliveryStatus', info)
        .then(res => {
            if (res.data.message !== "Failure") {
                setStatus(status + 1)
                if (res.data.message === "Completed") {
                    props.handleRemoveActive()
                }
            } else {
                window.alert("Status update failed :( Try again!")
            }
        })   
        .catch(err => console.log(err));
    }
    const orderCards =
        <Grid.Column key={props.order.orid} mobile={16} tablet={8} computer={5} >
            <Card name={props.order.orid} >
                <Card.Content>
                    <Card.Header>Order #{props.order.orid}</Card.Header>
                    <Card.Meta>
                        <span className='cid'>{props.order.rname}</span>
                    </Card.Meta>
                    <Card.Description>
                        Delivery Location: {props.order.location}
                        <OrderItems orid={props.order.orid}/>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color = 'green' onClick={handleChangeStatus}>
                            {buttonText}
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column>
    return (
        <>
            {orderCards}
        </>
    )
}

export default AcceptedOrders;