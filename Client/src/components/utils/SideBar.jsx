
import React, { Component } from 'react'
import {
    Icon,
    Menu,
    Sidebar,
} from 'semantic-ui-react'

function NavSidebar(props) {
    /*declare an array in class state,
    use <NavSidebar navTabs={this.state.arrayName}/>
    to render all the tabs required for that class*/
    const tabItems = props.navTabs.map((item) =>
            <Menu.Item as='a'>
            <Icon name={item.icon} />
            {item.name}
            </Menu.Item>
    );
    return(
        <Sidebar
            as={Menu}
            direction='left'
            icon='labeled'
            inverted
            vertical
            visible
            width='thin'
        >
        {tabItems}
        </Sidebar>
    );
}

export default NavSidebar;