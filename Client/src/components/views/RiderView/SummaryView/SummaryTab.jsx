//Basic React Imports
import React, { Component } from "react";

import { Dropdown, Button, Divider, List, Table, Segment,Statistic } from "semantic-ui-react";
import axios from 'axios'
import { LoginContext } from '../../../LoginContext';

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

class SummaryTab extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      riderOrders: '',
      riderHours: '',
      riderDelivery: '',
      riderStatus:'',
      riderSalary: '',
      monthIndex: d.getMonth(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let cid = this.context.user.id;

    axios.get('/rider/api/get/getOrdersDelivered', { params: { monthSelected: this.state.monthIndex+1 , cid:cid} }).then(res => {
        this.setState({ riderOrders: res.data.length })
        console.log(res.data);
    }).catch(err => console.log(err))

    axios.get('/rider/api/get/getHoursWorked', {params:  { monthSelected: this.state.monthIndex+1 , cid:cid} }).then(res => {
      this.setState({ riderHours: res.data[0].hours })
      console.log(res.data);
    }).catch(err => console.log(err))

    axios.get('/rider/api/get/getDeliveryFees', {params:  { monthSelected: this.state.monthIndex+1 , cid:cid} }).then(res => {
      this.setState({ riderSalary: res.data[0].fee })
      console.log(this.state.riderSalary);
    }).catch(err => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    let cid = this.context.user.id;

    if(prevState.monthIndex !== this.state.monthIndex) {
      axios.get('/rider/api/get/getOrdersDelivered', { params: { monthSelected: this.state.monthIndex+1, cid:cid } }).then(res => {
        this.setState({ riderOrders: res.data.length })
        console.log(this.state.riderOrders);
        console.log(res.data);
      }).catch(err => console.log(err))

      axios.get('/rider/api/get/getHoursWorked', {params:  { monthSelected: this.state.monthIndex+1, cid:cid } }).then(res => {
        this.setState({ riderHours: res.data[0].hours})
        console.log(this.state.riderHours);
        console.log(res.data[0].hours);
      }).catch(err => console.log(err))

      let hours = this.state.riderHours;
      let orders = this.state.riderOrders;

      axios.get('/rider/api/get/getDeliveryFees', {params:  { monthSelected: this.state.monthIndex+1, cid:cid } }).then(res => {
        this.setState({ riderDelivery: res.data[0].fee})
        this.setState({ riderStatus : res.data[0].ft})
        let salary = 0;
        let fee = this.state.riderDelivery;
        let status = this.state.riderStatus;

        if(status === 0) {
          //Part Timer
          if(hours > 0) {
            salary = hours * 10;
          }
          if(orders < 2) {
            salary += fee;
          } else if (orders < 4) {
            salary += (fee * 2);
          } else {
            salary += (fee * 3);
          }
        } else {
          if(hours > 0) {
            salary = 2000;
          }
          if(orders < 3) {
            salary += fee;
          } else if (orders < 6) {
            salary += (fee * 2);
          } else {
            salary += (fee * 3);
          }
        }
        this.setState({ riderSalary: salary})
        console.log(this.state.riderSalary);
        console.log(res.data);
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
    return (
      <div>
        <h1>Choose a month to view summary:</h1>
        <Dropdown
          defaultValue={monthOptions[this.state.monthIndex].value}
          fluid
          search
          selection
          options={monthOptions}
          onChange={this.handleChange}
          />
          <Segment.Group>
            <Segment>
              <Statistic>
                <Statistic.Label>Orders Delivered</Statistic.Label>
                <Statistic.Value>{this.state.riderOrders}</Statistic.Value>
              </Statistic>
            </Segment>
            <Segment>
              <Statistic>
                <Statistic.Label>Hours Worked</Statistic.Label>
                <Statistic.Value>{this.state.riderHours}</Statistic.Value>
              </Statistic>
            </Segment>
            <Segment>
              <Statistic>
                <Statistic.Label>Salary Earned</Statistic.Label>
                <Statistic.Value>{this.state.riderSalary}</Statistic.Value>
              </Statistic>
            </Segment>
          </Segment.Group>
      </div>
    )
  }
}

SummaryTab.contextType = LoginContext;

export default SummaryTab;
