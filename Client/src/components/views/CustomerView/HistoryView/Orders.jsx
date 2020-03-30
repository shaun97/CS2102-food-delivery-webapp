import React, { Component } from 'react'

import { Header, Item, Divider, Segment, Modal, Button } from 'semantic-ui-react'

class Orders extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Segment width={16}>
                <Item >
                    <Item.Content textAlign='left'>
                        <Item.Header as='h3'>Chinese Kitchen</Item.Header>
                        <Item.Meta>
                            <span className='price'>Delivered On:</span>

                        </Item.Meta>
                        <Item.Meta>
                            <span className='price'>Delivered To:</span>
                        </Item.Meta>
                        <Item.Header as='h5'>Order Summary</Item.Header>

                        <span className='price'>1 x Chicken:</span>

                        <Divider />
                        <Item.Meta>
                            <p className='price'>Subtotal:</p>
                            <p className='price'>Delivery Fee:</p>
                            <Divider />
                            <span className='price'>Total:</span>
                        </Item.Meta>
                        <Divider />
                        <Modal trigger={<Button>Review</Button>}>
                            <Modal.Header>Please Leave a Review</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>Delivery Rating</Header>
                                    <p>
                                        ****
                                    </p>
                                    <Divider />
                                    <Header>Food Review</Header>
                                    <p>
                                        ****
                                    </p>
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </Item.Content>
                </Item>
            </Segment>
        )
    }

}

export default Orders;