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
      riderInfo: [],
      riderOrders: '',
      riderHours: '',
      riderDelivery: '',
      riderStatus:'',
      riderSalary: '',
      monthIndex: d.getMonth(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    try {
      const riderData = await this.getRiderInfo();
      this.setState({
        riderOrders: riderData[0].orders, 
        riderHours: riderData[0].hours, 
        riderSalary: riderData[0].salary});
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.monthIndex !== this.state.monthIndex) {
      try {
        const riderData = await this.getRiderInfo();
        console.log(riderData);
        this.setState ({
          riderOrders: riderData[0].orders, 
          riderHours: riderData[0].hours, 
          riderSalary: riderData[0].salary});
      } catch (err) {
        console.log(err);
      }

    }
  }

  getRiderInfo = async () => {
    try {
      const [riderHours, riderOrders, riderDelivery] = await Promise.all([this.getRiderHours(), this.getRiderOrders(), this.getDeliveryFees()]);
      let riderInfo = []
      let salary = 0;
      let fee = Number(riderDelivery.fee);
      if (riderDelivery.ft === 0) {
        if (riderHours > 0) {
          salary = riderHours * 10;
        }
        console.log(salary);
        if (riderOrders < 10 && riderOrders != 0) {
          salary += fee;
          console.log(salary);
        } else if (riderOrders < 20 && riderOrders != 0) {
          salary += (fee * 2);
          console.log(salary);
        } else if(riderOrders > 0) {
          salary += (fee * 3);
          console.log(salary);
        }
        console.log(salary);
      } else {
        if (riderHours > 0) {
          salary = 2000;
        }
        if (riderOrders < 20 && riderOrders > 0) {
          salary += fee;
        } else if (riderOrders < 30 && riderOrders > 0) {
          salary += (fee * 2);
        } else if(riderOrders > 0) {
          salary += (fee * 3);
        }
      }
      riderInfo.push({
        orders: riderOrders,
        hours: riderHours,
        salary: salary
    })
      console.log("Rider Info", riderInfo);
      return riderInfo;
    } catch (err) {
      console.log(err);
    }
  };

  getRiderOrders = async () => {
    let cid = this.context.user.id;
    let res = await axios.get('/rider/api/get/getOrdersDelivered', { params: { monthSelected: this.state.monthIndex+1 , cid:cid} }).catch(err=> null);
    return res.data.length;
  }

  getRiderHours = async () => {
    let cid = this.context.user.id;
    let res = await axios.get('/rider/api/get/getHoursWorked', {params:  { monthSelected: this.state.monthIndex+1 , cid:cid} }).catch(err=> null);
    return res.data[0].hours;
  }

  getDeliveryFees = async() => {
    let cid = this.context.user.id;
    let res = await axios.get('/rider/api/get/getDeliveryFees', {params:  { monthSelected: this.state.monthIndex+1 , cid:cid} }).catch(err=> null);
    console.log(res.data);
    return res.data[0];
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
