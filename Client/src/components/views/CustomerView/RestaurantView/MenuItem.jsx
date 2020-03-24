import React, { Component } from 'react';
import { Item, Button, Form } from 'semantic-ui-react'



function MenuItem(props) {

    const menuItemsItems = props.menuItems.map((item) =>
        <Item>
            <Item.Content >
                <Item.Header fluid>{item.name}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{item.desc}</span>
                </Item.Meta>
                <Item.Description >
                    <Button primary floated='right'>+</Button>
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