import React from 'react'
import { Table } from 'semantic-ui-react'

const CustomerInfo = () => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>No. of Orders</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Katy Perry</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Elmo</Table.Cell>
        <Table.Cell>2</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Speedyzoomz</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>1</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default CustomerInfo