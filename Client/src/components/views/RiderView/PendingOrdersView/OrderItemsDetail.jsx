import React from 'react'
import { Accordion, Icon, Grid, Message } from 'semantic-ui-react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function OrderItemsDetail(props) {
    const [ activeIndex, setActive ] = useState(-1);
    const [ orderItems, setItems ] = useState([]);
    function handleClick(e, titleProps) {
        const { index } = titleProps;
        const newIndex = (activeIndex === index) ? -1 : index;
        setActive(newIndex);
    }
    useEffect(() => {
        axios.get('/rider/api/get/orderItems', { params: { orid: props.orid }}).then(res => {
            setItems(res.data);
        })
    }, [props.orid])
    let foodItems = [];
    let quantity = [];
    orderItems.map((item) => {
        const string = item.fname.concat(" ", item.quantity);
        console.log(string);
        foodItems.push(string);
        quantity.push(item.quantity);
    })
    const orderList = 
        <Message compact size='tiny'>
            <Message.Header>Food Items</Message.Header>
            <Message.List items={foodItems}/>
        </Message>
    return (
        <Accordion >
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name='dropdown' />
          View Order Details
        </Accordion.Title>
        <Accordion.Content textAlign='left' active={activeIndex === 0}>
          {orderList}
        </Accordion.Content>
        </Accordion>
    )
}

export default OrderItemsDetail;