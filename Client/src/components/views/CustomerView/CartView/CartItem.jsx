import React, { Component } from 'react';
import { Item, Button, Form } from 'semantic-ui-react'


function CartItem(props) {
    const menuItemsItems = props.menuItems.map((item) =>
        <Item>
            <Item.Content>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{item.desc}</span>
                </Item.Meta>
                <Item.Description >
                    <span style={{ fontSize: '150%', float: 'right' }}>${item.price}</span>
                    <Form.Group floated='right'>
                        <Form.Button content='-' />
                        <Form.Input width={2}
                            type='input'
                            name='quantity'
                            value={item.quantity}
                            onChange = {props.handleChange}
                        />
                        <Form.Button onClick={() => props.updateItem(item, 1)} content='+' />
                    </Form.Group>
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

export default CartItem;