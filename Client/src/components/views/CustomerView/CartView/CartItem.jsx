import React from 'react';
import { Item, Icon, Form } from 'semantic-ui-react'

function CartItem(props) {
    const menuItemsItems = (props.menuItems.length === 0) ? '' :
        props.menuItems.map((item) =>
            <Item key={item.fname}>
                <Item.Content>
                    <Item.Header>
                        <Icon style={{
                            positon: 'relative',
                            left: -130,
                            top: -8,
                        }} name='x' circular inverted fitted corner='top left' size='mini' color='red' link onClick={() => props.handleDeleteItem(item)}></Icon>
                        {item.fname}
                    </Item.Header>
                    <Item.Meta>
                        <span className='cinema'>{item.category}</span>
                    </Item.Meta>
                    <Item.Description >
                        <span style={{ fontSize: '150%', float: 'right' }}>${(item.qty === 0) ? item.price : item.price * item.qty}</span>
                        <Form.Group floated='right'>
                            <Form.Button onClick={() => props.updateItem(item, -1)} content='-' />
                            <Form.Input style={{ width: "100%" }}
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