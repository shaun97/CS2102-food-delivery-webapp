//Basic React Imports
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react'


class FoodCategoryBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Chinese',
        }
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        });
        this.props.handleChangeActiveCategory(name);
    }

    render() {
        return (
            <Menu tabular>
                <Menu.Item
                    name='Chinese'
                    active={this.state.activeItem === 'Chinese'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Malay'
                    active={this.state.activeItem === 'Malay'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Western'
                    active={this.state.activeItem === 'Western'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Indian'
                    active={this.state.activeItem === 'Indian'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='Japanese'
                    active={this.state.activeItem === 'Japanese'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}



export default FoodCategoryBar;