import React, { Component } from 'react'

import { Header, Form, Grid, Button, Segment } from 'semantic-ui-react'
import CartItem from './CartItem';

class CartTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: [
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00' },
            ]
        }
    }

    render() {
        return (
            <>
                <Header as='h1'>{this.props.cart.restaurantName}</Header>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Form>
                                <CartItem menuItems={this.state.test}></CartItem>
                                <Segment>
                                    <Form.Field>
                                        <label>Please key in your address</label>
                                        <input placeholder='Address' />
                                    </Form.Field>
                                </Segment>
                                <Segment>
                                    <Segment basic>
                                        <text>Subtotal:</text>
                                        <text style={{ float: 'right' }}>$10</text>
                                    </Segment>
                                    <Segment basic>
                                        <text>Delivery:</text>
                                        <text style={{ float: 'right' }}>$10</text>
                                    </Segment>

                                    <Segment basic>
                                        <text>Total:</text>
                                        <text style={{ float: 'right' }}>$10</text>
                                    </Segment>

                                    {/* promo code? */}
                                </Segment>
                                <Button floated='right' fluid color='blue' type='submit'>Confirm</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }

}

export default CartTab;