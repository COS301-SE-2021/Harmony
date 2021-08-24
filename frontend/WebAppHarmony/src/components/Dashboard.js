import React from 'react';
import "../Styling/DashboardStyling.css";
import DashStyles from '../Styling/DashboardStyle';
import UniversalStyle from '../Styling/UniversalStyle';
import { LineChart, XAxis, Legend, YAxis, CartesianGrid, Line, BarChart, Bar, Cell, Tooltip, RadialBarChart, RadialBar } from 'recharts';
//var CanvasJSReact = require('./canvasjs.react');

//user ages, demographics
function Dashboard() {

    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };



    const values = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
            fill: '#8884d8',
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
            fill: '#83a6ed',
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
            fill: '#8dd1e1',
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
            fill: '#d0ed57',
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
            fill: '#ffc658',
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
            fill: '#a4de6c',
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
            fill: '#82ca9d',
        },
    ];

    return (
        <div style={UniversalStyle.background}>
            <div style={UniversalStyle.displayFlexOnly}>
                <div style={DashStyles.dashboardContainer}>
                    <LineChart
                        width={350}
                        height={200}
                        data={values}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        {/* <YAxis /> */}
                        {/* <Tooltip /> */}
                        <Legend />
                        {/* <CartesianGrid stroke="#f5f5f5" /> */}
                        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                    </LineChart>                </div>
                <div style={DashStyles.dashboardContainer}>
                    <p>User flavour preferences</p>

                    <BarChart width={350} height={200} data={values}>
                        <Bar dataKey="uv" fill="#8884d8" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </BarChart>
                </div>
                <div style={DashStyles.dashboardContainer}>
                    <LineChart
                        width={350}
                        height={200}
                        data={values}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        {/* <YAxis /> */}
                        {/* <Tooltip /> */}
                        <Legend />
                        {/* <CartesianGrid stroke="#f5f5f5" /> */}
                        <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                        <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                    </LineChart>
                </div>
            </div>
            <br />
            <div style={UniversalStyle.displayFlexJustifyAround}>
                <div style={{ textAlign: "center", alignItems: "center", marginLeft: 25 }}>
                    <div style={DashStyles.dashboardContainerThin}>
                        <div style={UniversalStyle.displayFlexJustifyCenter}>
                            <h1 style={DashStyles.textMediumGreen}>75</h1>
                            <h1 style={DashStyles.textMediumBlack}>:</h1>
                            <h1 style={DashStyles.textMediumRed}>1</h1>
                        </div>
                        <p>ratio of hits to misses</p>
                    </div>
                    <br />
                    <div style={DashStyles.dashboardContainerThin}>
                        <div style={UniversalStyle.displayFlexJustifyCenter}>
                            <h1 style={DashStyles.textMediumBlue}>35128</h1>
                        </div>
                        <p>Active users</p>
                    </div>
                </div>
                <div style={DashStyles.dashboardContainer}>
                    <p>Locations Most Used</p>

                    <BarChart
                        width={350}
                        height={200}
                        data={values}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div style={DashStyles.dashboardContainer}>
                    <p>Free Tier Usage</p>

                    <RadialBarChart cx="50%" cy="50%" innerRadius="10%" width={350}
                        height={200} outerRadius="80%" barSize={10} data={values}>
                        <RadialBar
                            minAngle={15}
                            // label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            clockWise
                            dataKey="uv"
                        />
                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
                    </RadialBarChart>
                </div>
            </div>
            {/* <div class="testDiv">TEST</div> */}
        </div>

    );
}

export default Dashboard;
