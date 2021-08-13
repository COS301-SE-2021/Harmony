import React from 'react';
import '../src/App.css';
import { Chart } from 'react-charts'
import CanvasJSReact from './canvasjs.react';
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
    return (
        <div style={{ flexDirection: "row", justifyContent: "space-around", display: "flex" }}>
            <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                <Chart data={data} axes={axes} />
            </div>
            <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div>
            <div style={{ padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", }}>
                <div>
                    <h1 style={{ color: "green", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>75</h1>
                    <h1 style={{ color: "black", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>:</h1>
                    <h1 style={{ color: "red", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>1</h1>
                </div>
                <p>ratio of hits to misses</p>
            </div>
        </div>

    );
}

export default Dashboard;
