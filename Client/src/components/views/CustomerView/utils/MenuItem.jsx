import React, { Component } from 'react';
import { Item, Button } from 'semantic-ui-react'


function MenuItem(props) {

    const menuItemsItems = props.menuItems.map((item) =>
        <Item>
            {/* <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' /> */}
            <Item.Content>
                <Item.Header >{item.name}</Item.Header>
                <Item.Meta>
                    <span className='cinema'>{item.desc}</span>
                </Item.Meta>
                <Item.Description >
                    <span style={{ fontSize: '150%' }}>${item.price}</span>
                    <Button primary floated='right'>+</Button>
                </Item.Description>
                <Item.Extra>


                </Item.Extra>
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