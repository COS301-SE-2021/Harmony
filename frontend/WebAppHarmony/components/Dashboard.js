import React from 'react';
import '../src/App.css';
import { Chart } from 'react-charts'
import CanvasJSReact from './canvasjs.react';
import { LineChart, XAxis, Legend, YAxis, CartesianGrid, Line, BarChart, Bar, Cell, Tooltip, ResponsiveContainer } from 'recharts';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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

    const values = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    return (
        <div style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <div style={{ display: "flex" }}>
                <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                    <Chart data={data} axes={axes} />
                </div>
                <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                    <CanvasJSChart options={options}
                    /* onRef = {ref => this.chart = ref} */
                    />
                </div>
                <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                    <LineChart
                        width={400}
                        height={250}
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
            <div style={{ display: "flex" }}>
                <div style={{ padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", marginLeft: "auto", marginRight: "auto", height: "auto", width: "auto" }}>
                    <div>
                        <h1 style={{ color: "green", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>75</h1>
                        <h1 style={{ color: "black", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>:</h1>
                        <h1 style={{ color: "red", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>1</h1>
                    </div>
                    <p>ratio of hits to misses</p>
                </div>
                {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={400}
                    height={250}
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
                </ResponsiveContainer> */}
            </div>
        </div>

    );
}

export default Dashboard;
