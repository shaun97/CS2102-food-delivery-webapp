import React from 'react'
import { Table } from 'semantic-ui-react'

const DeliveryTable = () => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Delivery Area</Table.HeaderCell>
        <Table.HeaderCell>No. of Orders</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Bukit Panjang</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Kallang</Table.Cell>
        <Table.Cell>2</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Clementi</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Chua Chu Kang</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default DeliveryTable