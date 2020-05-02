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
            riderInfo: [],
            newCustomers: '',
            orderDetails: '',
            totalSales: 0,
            monthIndex: d.getMonth(),
            deliveryInfo: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
        const riderData = await this.getRiderInfo();
        console.log("rider data\n", riderData);
        this.setState({ riderInfo: riderData });
        console.log(this.state.riderInfo);
        } catch (err) {
            console.log(err);
        }
    };

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.monthIndex !== this.state.monthIndex) {
            try {
                const riderData = await this.getRiderInfo();
                this.setState({ riderInfo: riderData });
            } catch(err) {
                console.log(err);
            }
            
        }
    }
    getRiderInfo = async () => {
        try {
            // const riderHours = await this.getRiderHours();
            // const riderOrders = await this.getRiderOrders();
            const [riderHours, riderOrders] = await Promise.all([ this.getRiderHours(), this.getRiderOrders() ]);
            let riderInfo = [];
            for (var i = 0; i < riderHours.length; i++) {
                let numOrder = 0;
                for (var j = 0; j < riderOrders.length; j++) {
                    if (riderOrders[j].name === riderHours[i].name) {
                        numOrder = riderOrders[j].numorders;
                        console.log("Num Order: ", riderOrders[j].name, numOrder);
                        break;
                    }
                }
                riderInfo.push({
                    name: riderHours[i].name,
                    totalOrders: numOrder,
                    totalHours: riderHours[i].totalHours,
                    salary: 0
                })
            }  
            console.log("Rider Info:\n", riderInfo);
            return riderInfo;
        } catch (err) {
            console.log(err);
        }
    };
    getRiderOrders = async () => {
        let res = await axios.get('/manager/api/get/RiderOrdersDelivered', { params: { monthSelected: this.state.monthIndex+1 }}).catch(err=> null);
        console.log("rider orders:\n", res.data);
        return res.data;
    };
    getRiderHours = async () => {
        let res = await axios.get('/manager/api/get/totalHoursWorked', { params: { monthSelected: this.state.monthIndex+1 }}).catch(err => null);
        const data = res.data;
        let riderInfo = [];
        if(data !== null) {
            let totalHours = 0;
            let riderName = '';
            let first3days = data[0].map(rider => {
                return {
                    name: rider.name,
                    hour1: rider.totalhours
                }    
            })
            let last2days = data[1].map(rider => {
                return {
                    name: rider.name,
                    hour2: rider.totalhours
                }
            })
            for (var i = 0; i < first3days.length; i++) {
                totalHours = first3days[i].hour1 + last2days[i].hour2;
                riderName = first3days[i].name;
                riderInfo.push({
                    name: riderName,
                    totalHours: totalHours
                })
            }
            console.log("Rider hours \n", riderInfo);
        }
        return riderInfo;
    };

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
        const rider = (this.state.riderInfo.length === 0) ?
            <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
            </Table.Row> :
            this.state.riderInfo.map(item => 
            <Table.Row>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.totalOrders}</Table.Cell>
                <Table.Cell>{item.totalHours}</Table.Cell>
                <Table.Cell>{item.salary}</Table.Cell>
            </Table.Row>
            );
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
                                {rider}  
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