import React, { useState } from 'react';
import '../src/App.css';
import { Nav } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
//icon={<Icon icon="home" />} add to nav elements when decided
function Header() {
    const [activeTab, setActiveTab] = useState("home");

    const styles = {
        marginBottom: 50
    };

    const CustomNav = ({ active, onSelect, ...props }) => {
        return (
            <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>
                <Nav.Item eventKey="home" >
                    Home
                </Nav.Item>
                <Nav.Item eventKey="news">News</Nav.Item>
                <Nav.Item eventKey="solutions">Solutions</Nav.Item>
                <Nav.Item eventKey="products">Products</Nav.Item>
                <Nav.Item eventKey="about">About</Nav.Item>
            </Nav>
        );
    };
    const handleSelect = (activeKey) => {
        setActiveTab(activeKey)
    }
    return (
        <div >
            <div id="adminWord"> <p style={{ fontFamily: "sans-serif-light" }}>Admin</p></div>
            <div>
                <CustomNav appearance="subtle" active={activeTab} onSelect={handleSelect} />
            </div>
        </div >
    );
}

export default Header;
