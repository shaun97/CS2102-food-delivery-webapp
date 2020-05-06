import React from 'react'
import { Table } from 'semantic-ui-react'

function DeliveryTable(props) { 
  console.log(props);
  const delivery = (props.deliveryInfo.length == 0) ? 
      <Table.Row>
        <Table.Cell>-</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </Table.Row> :
        props.deliveryInfo.map((item) => 
      <Table.Row>
          <Table.Cell>{item.location}</Table.Cell>
          <Table.Cell>{item.count}</Table.Cell>
      </Table.Row>
  );
  return(
    <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Delivery Area</Table.HeaderCell>
        <Table.HeaderCell>No. of Orders</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {delivery}
    </Table.Body>
    </Table>
  )
}

export default DeliveryTable;