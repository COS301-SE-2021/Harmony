import React from 'react';
import '../src/App.css';
import { LineChart, XAxis, Legend, YAxis, CartesianGrid, Line, BarChart, Bar, Cell, Tooltip, RadialBarChart, RadialBar } from 'recharts';
//var CanvasJSReact = require('./canvasjs.react');

//user ages, demographics
function Dashboard() {
    const data = React.useMemo(
        () => [
            {
                label: 'Hits',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Misses',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            // { primary: true, type: 'linear', position: 'bottom' },
            // { type: 'linear', position: 'left' }
            { primary: true, type: 'ordinal', position: 'bottom' },
            { position: 'left', type: 'linear', stacked: false }
        ],
        []
    )
    const options = {
        title: {
            text: "User Preferences"
        },
        width: 320,
        height: 200,
        data: [{
            type: "column",
            dataPoints: [
                { label: "Salty", y: 29 },
                { label: "Sweet", y: 15 },
                { label: "Spicy", y: 20 },
                { label: "Sour", y: 30 },
            ]
        }]
    }
    const style = {
        top: '50%',
        right: 0,
        transform: 'translate(0, -50%)',
        lineHeight: '24px',
    };

    const dashboardContainer = {
        width: 400,
        height: 250,
        padding: 15,
        borderRadius: 15,
        backgroundColor: "white",
        margin: "auto",
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
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
        <div style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 15, backgroundColor: "#F3F3F3" }}>
            <div style={{ display: "flex" }}>
                <div style={dashboardContainer}>
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
                <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", textAlign: "center" }}>
                    <p>User flavour preferences</p>

                    <BarChart width={350} height={200} data={values}>
                        <Bar dataKey="uv" fill="#8884d8" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </BarChart>
                </div>
                <div style={dashboardContainer}>
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center", alignItems: "center", marginLeft: 25 }}>
                    <div style={{ padding: 15, borderRadius: 15, backgroundColor: "white", display: "block", /* margin: "auto", marginLeft: "auto", marginRight: "auto", */height: 120, width: 300, boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h1 style={{ color: "green", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>75</h1>
                            <h1 style={{ color: "black", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>:</h1>
                            <h1 style={{ color: "red", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>1</h1>
                        </div>
                        <p>ratio of hits to misses</p>
                    </div>
                    <br />
                    <div style={{ padding: 15, borderRadius: 15, backgroundColor: "white", display: "block",/* margin: "auto", marginLeft: "auto", marginRight: "auto", */height: 120, width: 300, boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <h1 style={{ color: "blue", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>35128</h1>
                        </div>
                        <p>Active users</p>
                    </div>
                </div>
                <div style={dashboardContainer}>
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
                <div style={dashboardContainer}>
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
        </div>

    );
}

export default Dashboard;
