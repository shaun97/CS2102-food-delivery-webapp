import React, { Component } from 'react'

import { Header, Form, Grid, Button, Segment, Divider } from 'semantic-ui-react'
import Orders from './Orders';

class HistoryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid textAlign='left' padded>
                <Grid.Column width={16}>
                    <Grid.Row>
                        <Header as='h1'>History</Header>
                        <Divider />
                    </Grid.Row>
                    <Grid.Row fluid padded>
                        <Orders ></Orders>
                    </Grid.Row>
                </Grid.Column>
            </Grid >
        )
    }

}

export default HistoryView;