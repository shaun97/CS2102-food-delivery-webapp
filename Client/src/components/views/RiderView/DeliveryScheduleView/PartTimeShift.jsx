import React, { Component } from "react";
import moment from 'moment';

import { Button, Divider, List, Table, Container, Dropdown, Grid } from "semantic-ui-react";
import axios from 'axios';
import { LoginContext } from '../../../LoginContext';
import { useState } from "react";
import { useEffect } from "react";

const timeOptions = [
    { key: '1', value: '1', text: '10:00 AM', disabled: false },
    { key: '2', value: '2', text: '11:00 AM', disabled: false },
    { key: '3', value: '3', text: '12:00 PM', disabled: false },
    { key: '4', value: '4', text: '1:00 PM', disabled: false },
    { key: '5', value: '5', text: '2:00 PM', disabled: false },
    { key: '6', value: '6', text: '3:00 PM', disabled: false },
    { key: '7', value: '7', text: '4:00 PM', disabled: false },
    { key: '8', value: '8', text: '5:00 PM', disabled: false },
    { key: '9', value: '9', text: '6:00 PM', disabled: false },
    { key: '10', value: '10', text: '7:00 PM', disabled: false },
    { key: '11', value: '11', text: '8:00 PM', disabled: false },
    { key: '12', value: '12', text: '9:00 PM', disabled: false },
    { key: '13', value: '13', text: '10:00 PM', disabled: false },
]

function PartTimeShift(props) {
    const[startTime, setStart] = useState('');
    const[endTime, setEnd] = useState('');

    function handleStartTime(e, { value }) {
        let index;
        for (let i = 0; i < timeOptions.length; i++) {
            if (timeOptions[i].value === value) {
                index = i + 1;
            }
        }
        console.log(startTime);

        let end = endTime;

        if (endTime > 0 && index >= endTime) {
            alert("Please ensure that start time is earlier than end time!")
            return;
        } else if ((end - index) >= 5) {
            alert("Please ensure that each shift is a maximum of 4 hours!")
            return;
        } else {
            setStart(index);
            assignDropValue(index,end);
        }
    }

    function handleEndTime (e, { value }) {
        let index;
        for (let i = 0; i < timeOptions.length; i++) {
            if (timeOptions[i].value === value) {
                index = i + 1;
            }
        }
        console.log(endTime);

        let start = startTime;

        if (startTime > 0 && startTime >= index) {
            alert("Please ensure that start time is earlier than end time!")
            return;
        } else if ((index - start) >= 5) {
            alert("Please ensure that each shift is a maximum of 4 hours!")
            return;
        } else {
            setEnd(index);
            assignDropValue(start,index);
            console.log(index);
        }
    }

    function handleChange(newStart, newEnd) {
        const timing = {
            start: newStart,
            end: newEnd
        }
        props.saveShift(timing, props.shiftNum);
    }

    function assignDropValue(index,end) {
        if (index !== undefined && end !== undefined) {
            let newStart = index;
            let newEnd = end;
            handleChange(newStart, newEnd);
        }
    }


    return (
        <Grid columns={2} padded>
            <Grid.Column>
                <Dropdown
                    placeholder='Select Start Time'
                    fluid
                    selection
                    options={timeOptions}
                    onChange={handleStartTime}                />
            </Grid.Column>
            <Grid.Column>
                <Dropdown
                    placeholder='Select End Time'
                    fluid
                    selection
                    options={timeOptions}
                    onChange={handleEndTime}
                />
            </Grid.Column>
        </Grid>
      )
}

export default PartTimeShift