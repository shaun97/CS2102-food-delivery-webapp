import React, { Component } from 'react'
import { Dropdown, Table, Segment } from 'semantic-ui-react'
import axios from 'axios'

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

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        var d = new Date();
        this.state = {
            customerInfo: '',
            monthIndex: d.getMonth(),
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/manager/api/get/getCustomerMonthOrderInfo', { params: { monthSelected: this.state.monthIndex+1 } }).then(res => {
            this.setState({ customerInfo: res.data })
        }).catch(err => console.log(err))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.monthIndex !== this.state.monthIndex) {
            axios.get('/manager/api/get/getCustomerMonthOrderInfo', { params: { monthSelected: this.state.monthIndex+1 } }).then(res => {
                this.setState({ customerInfo: res.data })
            }).catch(err => console.log(err))
        }
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
        const customer = (this.state.customerInfo.length === 0) ? 
            <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
            </Table.Row> :
                this.state.customerInfo.map((item) => 
            <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.totalorders}</Table.Cell>
                <Table.Cell>{item.totalcost}</Table.Cell>
            </Table.Row>
        );
        return(
            <Segment.Group>
            <Segment size='big' textAlign='left'>Select Month</Segment>
            <Segment.Group>
                <Dropdown
                    defaultValue={monthOptions[this.state.monthIndex].value}
                    fluid
                    search
                    selection
                    options={monthOptions}
                    onChange={this.handleChange}
                />
            </Segment.Group>
            <Segment>
                <Table striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Total number of orders</Table.HeaderCell>
                        <Table.HeaderCell>Total cost of orders</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {customer}
                    </Table.Body>
                </Table>
            </Segment>
            </Segment.Group>
        )
    }  
}

export default CustomerInfo