import React, { Component } from 'react';
import { Item, Button, Form } from 'semantic-ui-react'


function CartItem(props) {
    const menuItemsItems = props.menuItems.map((item) =>
        <Item>
            {/* <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
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
                            name='quantity'
                        />
                        <Form.Button content='+' />
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