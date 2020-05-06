import React, { Component } from 'react';
import { Item, Button, Form } from 'semantic-ui-react'



function MenuItem(props) {
    const menuItemsItems = props.menuItems.map((item) =>
    (item.avail) ? 
        <Item key={item.fname}>
            <Item.Content>
                <Item.Header>{item.fname}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{item.fdescript}</span>
                </Item.Meta>
                <Item.Description >
                    <Button onClick={() => props.handleAddToCart(item)} primary floated='right'>+</Button>
                    <span style={{ fontSize: '150%' }}>${item.price}</span>
                </Item.Description>
            </Item.Content>
        </Item> 
       : 
        <Item key={item.fname}>
            <Item.Content>
                <Item.Header>{item.fname}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>descript?</span>
                </Item.Meta>
                <Item.Description >
                    <Button label='Item is sold out!' disabled onClick={() => props.handleAddToCart(item)} primary floated='right'>+</Button>
                    <span style={{ fontSize: '150%' }}>${item.price}</span>
                </Item.Description>
            </Item.Content>
        </Item> 
    );
    return (
        <Item.Group divided>
            {menuItemsItems}
        </Item.Group>
    )
}

export default MenuItem;