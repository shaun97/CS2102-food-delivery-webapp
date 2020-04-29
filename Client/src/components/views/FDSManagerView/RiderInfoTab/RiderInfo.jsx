import React, { Component } from 'react'
import { Dropdown, Grid, Segment, Table } from 'semantic-ui-react'
import { Loader } from 'semantic-ui-react';
import axios from 'axios';

const monthOptions = [
    { key: 'Ja', value: 'Ja', flag: 'Ja', text: 'January' },
    { key: 'Fe', value: 'Fe', flag: 'Fe', text: 'February' },
    { key: 'Mr', value: 'Mr', flag: 'Mr', text: 'March' },
    { key: 'Ap', value: 'Ap', flag: 'Ap', text: 'April' },
    { key: 'Ma', value: 'Ma', flag: 'Ma', text: 'May' },
    { key: 'Jn', value: 'Jn', flag: 'Jn', text: 'June' },
    { key: 'Jl', value: 'Jl', flag: 'Jl', text: 'July' },
    { key: 'Au', value: 'Au', flag: 'Au', text: 'August' },
    { key: 'Se', value: 'Se', flag: 'Se', text: 'September' },
    { key: 'Oc', value: 'Oc', flag: 'Oc', text: 'October' },
    { key: 'No', value: 'No', flag: 'No', text: 'November' },
    { key: 'De', value: 'De', flag: 'De', text: 'December' },
]

class RiderInfo extends Component {
    constructor(props) {
        super(props);
        var d = new Date();
        this.state = {
            riderOrders: '',
            newCustomers: '',
            orderDetails: '',
            totalSales: 0,
            monthIndex: d.getMonth(),
            deliveryInfo: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/getRiderOrdersDelivered').then(res => {
            this.setState({
                riderOrders: res.data
            })
        })
    }
    handleChange = (e, {value}) => {
        console.log(value);
        let index;
        for (let i = 0; i < monthOptions.length; i++) {
            if (monthOptions[i].value === value) {
                index = i;
            }
        }
        this.setState({
            monthIndex: index
        });
    };

    render() {
        let loadScreen = (this.state.isLoading) ? <Loader active inline='centered' />
            : ''
        return(
            <Grid columns={2} divided>
                <Grid.Row stretched>
                <Grid.Column>
                <Segment.Group>
                    <Segment size='big' textAlign='left'>
                    <Dropdown
                        defaultValue={monthOptions[this.state.monthIndex].value}
                        fluid
                        search
                        selection
                        options={monthOptions}
                        onChange={this.handleChange}
                    />
                    </Segment>
                    <Segment.Group>
                    <Segment>
                        <Table striped>
                            <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Total Orders Delivered</Table.HeaderCell>
                                <Table.HeaderCell>Total Hours Worked</Table.HeaderCell>
                                <Table.HeaderCell>Total Salary</Table.HeaderCell>
                            </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                
                            </Table.Body>
                        </Table>
                    </Segment>
                    </Segment.Group>
                </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                    <Segment.Group>
                        rider graph
                    </Segment.Group>   
                </Grid.Column>
                </Grid.Row>
                {loadScreen}
            </Grid>
        )
    }
}

export default RiderInfo;