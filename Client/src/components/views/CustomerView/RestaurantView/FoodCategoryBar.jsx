//Basic React Imports
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react'


class FoodCategoryBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'chinese',
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        return (
            <Menu tabular>
                <Menu.Item
                    name='chinese'
                    active={this.state.activeItem === 'chinese'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='malay'
                    active={this.state.activeItem === 'malay'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='western'
                    active={this.state.activeItem === 'western'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='indian'
                    active={this.state.activeItem === 'indian'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='japanese'
                    active={this.state.activeItem === 'japanese'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}



export default FoodCategoryBar;