import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function TopHeader(props) {
  // function handleLogOut() {
  //     console.log(props.signOut);
  //     return <Redirect to="/" />
  // }
  return (
    <Segment clearing style={{ marginLeft: "150px" }}>
      <Link to="/" onClick={props.signOut}>
        <Header as="h2" color="blue" floated="right">
          Logout
        </Header>
      </Link>
      <Header as="h2" color="blue" floated="left">
        {props.user}
      </Header>
    </Segment>
  );
}

export default TopHeader;
