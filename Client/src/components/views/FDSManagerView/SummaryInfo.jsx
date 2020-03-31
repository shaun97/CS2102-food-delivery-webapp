import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

function Summary(props) {
    return(
        <Grid columns={3} divided>
            <Grid.Row stretched>
            <Grid.Column>
            <Segment.Group>
    <Segment textAlign='left'>{props.month}</Segment>
                <Segment.Group>
                    <Segment>Total Orders</Segment>
                    <Segment>Total New Customers</Segment>
                    <Segment>Total Sales from Orders</Segment>
                </Segment.Group>
            </Segment.Group>
            </Grid.Column>
            <Grid.Column>
                <Segment>1</Segment>
                <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>1</Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Summary