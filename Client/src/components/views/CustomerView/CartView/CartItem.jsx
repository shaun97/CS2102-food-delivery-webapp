import React, { Component } from 'react';
import { Item, Header, Form } from 'semantic-ui-react'


function CartItem(props) {
    const menuItemsItems = (props.menuItems.length == 0) ? <Header>There is nothing in your cart!</Header> :
        props.menuItems.map((item) =>
            <Item key={item.fname}>
                <Item.Content>
                    <Item.Header >{item.fname}</Item.Header>
                    <Item.Meta>
                        <span className='cinema'>{item.category}</span>
                    </Item.Meta>
                    <Item.Description >
                        <span style={{ fontSize: '150%', float: 'right' }}>${item.price}</span>
                        <Form.Group floated='right'>
                            <Form.Button onClick={() => props.updateItem(item, -1)}  content='-' />
                            <Form.Input width={2}
                                type='input'
                                name='quantity'
                                value={item.qty}
                                onChange={props.handleChange}
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

export default CartItem;;