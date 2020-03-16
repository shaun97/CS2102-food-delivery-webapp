import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

function TopHeader(props) {
    return(
        <Segment clearing style={{marginLeft: '150px'}}>
            <Header as='h2' color='blue' floated='right'>
            Logout
            </Header>
            <Header as='h2' color='blue' floated='left'>
            {props.user}
            </Header>
        </Segment>
    );
}
  
export default TopHeader;