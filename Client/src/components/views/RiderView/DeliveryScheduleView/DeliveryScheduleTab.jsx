//Basic React Imports
import React, { Component } from "react";

import { Button, Divider, List, Table, Container, Dropdown, Grid} from "semantic-ui-react";
import axios from 'axios';
import { LoginContext } from '../../../LoginContext';

const dayOptions = [
  { key: 'Mo', value: 'Mo', text: 'Monday'},
  { key: 'Tu', value: 'Tu', text: 'Tuesday'},
  { key: 'We', value: 'We', text: 'Wednesday'},
  { key: 'Th', value: 'Th', text: 'Thursday'},
  { key: 'Fr', value: 'Fr', text: 'Friday'},
  { key: 'Sa', value: 'Sa', text: 'Saturday'},
  { key: 'Su', value: 'Su', text: 'Sunday'},
]
const shiftOptions = [
  { key: 'Shift 1', value: '1', text: 'Shift 1: 10am - 2pm, 3pm - 7pm' },
  { key: 'Shift 2', value: '2', text: 'Shift 2: 11am - 3pm, 4pm - 8pm' },
  { key: 'Shift 3', value: '3', text: 'Shift 3: 12pm - 4pm, 5pm - 9pm' },
  { key: 'Shift 4', value: '4', text: 'Shift 4: 1pm - 5pm, 6pm - 10pm' },
]

class DeliveryScheduleTab extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      status: '', // 1 means FT, 0 means PT
      month: d.getMonth() + 1,
      monthName: d.toLocaleString('default', {month:'long'}),
      monthShift:'',
      startDay: 0,
      day1: 0,
      day2: 0,
      day3: 0,
      day4: 0,
      day5: 0,
      count: 0,
    };
    this.handleConfirmSchedule = this.handleConfirmSchedule.bind(this);
    this.handleDay1Shift = this.handleDay1Shift.bind(this);
    this.handleDay2Shift = this.handleDay2Shift.bind(this);
    this.handleDay3Shift = this.handleDay3Shift.bind(this);
    this.handleDay4Shift = this.handleDay4Shift.bind(this);
    this.handleDay5Shift = this.handleDay5Shift.bind(this);
  }

  componentDidMount() {
    let cid = this.context.user.id;

    //Determine rider's status (PT or FT)
    axios.get('/rider/api/get/getRiderStatus', {params: {cid:cid}}).then(res => {
      this.setState({ status: res.data[0].ft})
    }).catch(err => console.log(err))

    //Get past months record (FT)
    axios.get('/rider/api/get/getPastMonthSchedule', {params: {cid: cid}}).then(res => {
      this.setState({ monthShift: res.data})
      console.log(this.state.monthShift);
    }).catch(err => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.count);
    if (prevState.count !== this.state.count) {
      let cid = this.context.user.id;

      //Get past months record (FT)
      axios.get('/rider/api/get/getPastMonthSchedule', { params: { cid: cid } }).then(res => {
        this.setState({ monthShift: res.data })
        console.log(this.state.monthShift);
      }).catch(err => console.log(err))
    }
  }


  handleStartDay = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < dayOptions.length; i ++) {
      if(dayOptions[i].value === value) {
        index = dayOptions[i].text;
      }
    }
    this.setState({
      startDay : index
    });
  }

  handleDay1Shift = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < shiftOptions.length; i ++) {
      if(shiftOptions[i].value === value) {
        index = i + 1;
      }
    }
    this.setState({
      day1 : index
    });
  }

  handleDay2Shift = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < shiftOptions.length; i ++) {
      if(shiftOptions[i].value === value) {
        index = i + 1;
      }
    }
    this.setState({
      day2 : index
    });
  }

  handleDay3Shift = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < shiftOptions.length; i ++) {
      if(shiftOptions[i].value === value) {
        index = i + 1;
      }
    }
    this.setState({
      day3 : index
    });
  }

  handleDay4Shift = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < shiftOptions.length; i ++) {
      if(shiftOptions[i].value === value) {
        index = i + 1;
      }
    }
    this.setState({
      day4 : index
    });
  }

  handleDay5Shift = (e, {value}) => {
    let index;
    console.log(value);
    for(let i = 0; i < shiftOptions.length; i ++) {
      if(shiftOptions[i].value === value) {
        index = i + 1;
      }
    }
    this.setState({
      day5 : index
    });
  }

  updateClick() {    
    if (this.state.startDay == 0 | this.state.day1 == 0 | this.state.day2 == 0 | this.state.day3 == 0 | this.state.day4 == 0 | this.state.day5 == 0) {
      return;
    }
    this.setState({count:this.state.count + 1})
  }

  handleConfirmSchedule() {
    let cid = this.context.user.id;
    if (this.state.startDay == 0 | this.state.day1 == 0 | this.state.day2 == 0 | this.state.day3 == 0 | this.state.day4 == 0 | this.state.day5 == 0) {
      alert('Please ensure you indicated all options!');
      return;
    }
    axios.post('/rider/api/posts/insertMWSSchedule',
      { cid: cid, month: this.state.month, startDay: this.state.startDay, day1shift: this.state.day1, day2shift: this.state.day2, day3shift: this.state.day3, day4shift: this.state.day4, day5shift: this.state.day5 })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    const FTRiderSchedule = (this.state.monthShift.length === 0) ? 
            <Table.Row>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
                <Table.Cell>-</Table.Cell>
            </Table.Row> :
                this.state.monthShift.map((item) => 
            <Table.Row>
                <Table.Cell>{item.month}</Table.Cell>
                <Table.Cell>{item.startday}</Table.Cell>
                <Table.Cell>{item.day1shift}</Table.Cell>
                <Table.Cell>{item.day2shift}</Table.Cell>
                <Table.Cell>{item.day3shift}</Table.Cell>
                <Table.Cell>{item.day4shift}</Table.Cell>
                <Table.Cell>{item.day5shift}</Table.Cell>
            </Table.Row>
        );
    let view = (this.state.status === 1) ?
      <>
        <div>
          <h1>Monthly Schedule</h1>

          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Month</Table.HeaderCell>
                <Table.HeaderCell>Start Date</Table.HeaderCell>
                <Table.HeaderCell>Day 1 Shift</Table.HeaderCell>
                <Table.HeaderCell>Day 2 Shift</Table.HeaderCell>
                <Table.HeaderCell>Day 3 Shift</Table.HeaderCell>
                <Table.HeaderCell>Day 4 Shift</Table.HeaderCell>
                <Table.HeaderCell>Day 5 Shift</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {FTRiderSchedule}
            </Table.Body>
          </Table>

          <Container fluid>
            <p>Shift 1: 10am - 2pm, 3pm - 7pm | Shift 2: 11am - 3pm, 4pm - 8pm | Shift 3: 12pm - 4pm, 5pm - 9pm | Shift 4: 1pm - 5pm, 6pm - 10pm</p>
          </Container>
          <h2> {this.state.monthName}'s Work Schedule</h2>
          
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <h4> Start Day </h4>
                <Dropdown
                  placeholder='Select Day'
                  fluid
                  selection
                  options={dayOptions}
                  onChange={this.handleStartDay}
                />
              </Grid.Column>
              <Grid.Column>
                <h4> Day 1 Shift </h4>
                <Dropdown
                  placeholder='Select Shift'
                  fluid
                  selection
                  options={shiftOptions}
                  onChange={this.handleDay1Shift}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <h4> Day 2 Shift </h4>
                <Dropdown
                  placeholder='Select Shift'
                  fluid
                  selection
                  options={shiftOptions}
                  onChange={this.handleDay2Shift}
                />
              </Grid.Column>
              <Grid.Column>
                <h4> Day 3 Shift </h4>
                <Dropdown
                  placeholder='Select Shift'
                  fluid
                  selection
                  options={shiftOptions}
                  onChange={this.handleDay3Shift}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <h4> Day 4 Shift </h4>
                <Dropdown
                  placeholder='Select Shift'
                  fluid
                  selection
                  options={shiftOptions}
                  onChange={this.handleDay4Shift}
                />
              </Grid.Column>
              <Grid.Column>
                <h4> Day 5 Shift </h4>
                <Dropdown
                  placeholder='Select Shift'
                  fluid
                  selection
                  options={shiftOptions}
                  onChange={this.handleDay5Shift}
                /></Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider/>
          <Button positive onClick={() => {
            this.handleConfirmSchedule();
            this.updateClick();
          }}>Confirm Schedule</Button>
        </div>
      </>
      : <Button size="huge">Feb</Button>
    return (
      <>
        {view}
      </>
    );
  }
}

DeliveryScheduleTab.contextType = LoginContext;
export default DeliveryScheduleTab;
