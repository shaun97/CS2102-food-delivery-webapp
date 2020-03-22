import React, { Component } from 'react'

import { Header, Form, Grid, Button, Segment } from 'semantic-ui-react'
import CartItem from './CartItem';

class CartTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtotal: 0,
            deliveryFee: 0,
            test: [ //rework how this is named....
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00', quantity: 1 },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00', quantity: 1 },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00', quantity: 1 },
                { name: '100 pcs Chicken', desc: 'very lovin it', price: '2.00', quantity: 1 },
            ]
        }
        this.updateItemQAndP = this.updateItemQAndP.bind(this);
        this.incOrDecItem= this.incOrDecItem.bind(this);
    }

    updateItemQAndP(e) {
        console.log(e.target.value);
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({
            [name] : value,
        }, () => console.log(this.state.test))
        //callback function called by cartitem to update state of carttab items
    }

    incOrDecItem(item, op) {
        const name = item.name;

        console.log(op);
    }

    render() {
        return (
            <>
                <Header as='h1'>{this.props.cart.restaurantName}</Header>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Form>
                                <CartItem updateItem={this.incOrDecItem} handleChange={this.updateItemQAndP} menuItems={this.state.test}></CartItem>
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