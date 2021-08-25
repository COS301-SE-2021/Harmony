import React, { Component } from 'react';

import Routing from '../Routing';

import PropTypes from "prop-types";

//icon={<Icon icon="home" />} add to nav elements when decided
const CustomNav = ({ active, onSelect, ...props }) => {
    return (
        <div>
            <Routing />
        </div>
    );
};
class Header extends Component {
    constructor() {
        super();
        this.state = {
            active: 'HOME'
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleSelect = (activeKey) => {
        this.setState({ active: activeKey });
        // this.props.history.push(activeKey);

    }
    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                <div id="adminWord"> <p style={{ fontFamily: "sans-serif-light" }}>Admin</p></div>
                <div>
                    <CustomNav appearance="subtle" active={this.state.active} onSelect={this.handleSelect} />
                </div>
            </div >
        );
    }
}

export { Header }


