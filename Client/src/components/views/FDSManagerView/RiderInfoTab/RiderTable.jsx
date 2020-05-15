import React from "react";

import { Grid, Header, Segment, Table, Dropdown } from "semantic-ui-react";
import axios from 'axios'
import { useEffect, useState } from "react";

function RiderTable(props) {
    let d = new Date();
    const [monthIndex, setMonth] = useState(d.getMonth());
    const [riderInfo, setInfo] = useState([]);

    useEffect(() => {
        try{
            getRiderInfo();
            console.log("Rider data\n", riderInfo);
        } catch (err) {
            console.log(err);
        }
    }, [monthIndex])
    async function getRiderInfo() {
        try {
          const [riderHours, riderOrders, riderDelivery] = await Promise.all([getRiderHours(), getRiderOrders(), getDeliveryFees()]);
          let riderInfo = []
          
          for (var i = 0; i < riderHours.length; i++) {
            let numOrder = 0;
            for (var j = 0; j < riderOrders.length; j++) {
                if (riderOrders[j].name === riderHours[i].name) {
                    numOrder = riderOrders[j].numorders;
                    break;
                }
            }
            let salary = 0;
            let fee = 0;

            for (var j = 0; j < riderDelivery.length; j++) {
                if (riderDelivery[j].name === riderHours[j].name) {
                    fee = Number(riderDelivery[j].fee);
                }
            }
            if (props.riderType === "PT") {
                if (riderHours[i].hour > 0) {
                    salary = riderHours[i].hour * 10;
                }
                console.log(salary);
                if (numOrder < 10 && numOrder != 0) {
                    salary += fee;
                    console.log(salary);
                } else if (numOrder < 20 && numOrder != 0) {
                    salary += (fee * 2);
                    console.log(salary);
                } else if(numOrder > 0) {
                    salary += (fee * 3);
                    console.log(salary);
                }
                console.log(salary);
            } else {
                if (riderHours[i].hour > 0) {
                    salary = 2000;
                }
                if (numOrder < 20 && numOrder > 0) {
                    salary += fee;
                } else if (numOrder < 30 && numOrder > 0) {
                    salary += (fee * 2);
                } else if(numOrder > 0) {
                    salary += (fee * 3);
                }
            }
            riderInfo.push({
                name: riderHours[i].name,
                totalOrders: numOrder,
                totalHours: riderHours[i].hour,
                salary: salary
            })
          }
          console.log("Rider Info", riderInfo);
          setInfo(riderInfo);
        } catch (err) {
            console.log(err);
        }
    };
    async function getRiderHours() {
        let res = await axios.get('/manager/api/get/getHoursWorked', { params: { monthSelected: monthIndex+1, riderType: props.riderType }}).catch(err => null);
        return res.data;
    };
    async function getRiderOrders() {
        let res = await axios.get('/manager/api/get/RiderOrdersDelivered', { params: { monthSelected: monthIndex+1, riderType: props.riderType }}).catch(err=> null);
        console.log("rider orders:\n", res.data);
        return res.data;
    };
    async function getDeliveryFees() {
        let res = await axios.get('/manager/api/get/getDeliveryFees', {params:  { monthSelected: monthIndex+1 , riderType: props.riderType} }).catch(err=> null);
        console.log(res.data);
        return res.data;
    };
    function handleChange(e, {value}) {
        console.log(value);
        let index;
        for (let i = 0; i < props.monthOptions.length; i++) {
            if (props.monthOptions[i].value === value) {
                index = i;
            }
        }
        setMonth(index)
    };

    const rider = (riderInfo.length === 0) ?
            <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
            </Table.Row> :
            riderInfo.map(item => 
            <Table.Row textAlign='right'>
                <Table.Cell textAlign='left'>{item.name}</Table.Cell>
                <Table.Cell>{item.totalOrders}</Table.Cell>
                <Table.Cell>{item.totalHours}</Table.Cell>
                <Table.Cell>{item.salary}</Table.Cell>
            </Table.Row>
        );
    const riderType = (props.riderType === "FT") ? "Full-time Riders" : "Part-time Riders";
    return (
        <Grid.Column>
            <Header size='large'>{riderType}</Header>
            <Segment.Group>
                <Segment size='big' textAlign='left'>
                <Dropdown
                    defaultValue={props.monthOptions[monthIndex].value}
                    fluid
                    search
                    selection
                    options={props.monthOptions}
                    onChange={handleChange}
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

    )
}

export default RiderTable;