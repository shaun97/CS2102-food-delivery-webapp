import React, { Component } from 'react'

import { Header, Form, Grid, Button, Segment } from 'semantic-ui-react'
import CartItem from './CartItem';

class CartTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtotal: 0,
            deliveryFee: 0,
            cartItems: this.props.cartItems.map(item => {
                return {
                    fname: item.fname,
                    price: item.price,
                    category: item.category,
                    rname: item.rname,
                    qty: 0,
                }
            })
        }
        this.updateItemQAndP = this.updateItemQAndP.bind(this);
        this.incOrDecItem = this.incOrDecItem.bind(this);
    }

    updateItemQAndP(value, e) {
        // const name = e.target.name;
        // const value = e.target.value;

        // this.setState({
        //     [name]: value,
        // }, () => console.log(this.state.test))
        //callback function called by cartitem to update state of carttab items
    }

    incOrDecItem(item, op) {
        const name = item.fname;

        //increment/decrement here 
        this.setState(prevState => {
            return {
                cartItems: prevState.cartItems.map((item) => {
                    if (item.fname === name) {
                        if (!(op < 0 && item.qty === 0)) item.qty += op;
                    }
                    return item;
                })
            }
        }, () => console.log("called"))
    }

    render() {
        let rname = (this.props.cartItems.length == 0) ? '' : this.props.cartItems[0].rname;
        return (
            <>
                <Header as='h1'>{rname}</Header>
                <Grid padded>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Form>
                                <CartItem updateItem={this.incOrDecItem} handleChange={this.updateItemQAndP} menuItems={this.state.cartItems}></CartItem>
                                <Segment>
                                    <Form.Field>
                                        <label>Please key in your address</label>
                                        <input placeholder='Address' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Promo Code</label>
                                        <input placeholder='$$' />
                                    </Form.Field>
                                </Segment>
                                <Button fluid color='blue' type='submit'>Get Price</Button>
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
                                <Button floated='right' fluid color='blue' type='submit'>Place Order</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        )
    }

}

export default CartTab;