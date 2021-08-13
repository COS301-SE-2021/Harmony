import React from 'react';
import '../src/App.css';
import { Chart } from 'react-charts'

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
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    return (
        <div style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", float: "left" }}>
                <Chart data={data} axes={axes} />
            </div>
            <div style={{ width: 400, height: 250, padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", float: "left" }}>
                <Chart data={data} axes={axes} />
            </div>
            <div style={{ padding: 15, borderRadius: 15, backgroundColor: "white", margin: "auto", float: "left" }}>
                <h1 style={{ color: "green", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>25</h1>
                <h1 style={{ color: "black", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>:</h1>
                <h1 style={{ color: "red", fontFamily: "sans-serif-light", fontSize: 35, float: "left" }}>1</h1>
                <p>ratio of hits to misses</p>
            </div>
        </div>

    );
}

export default Dashboard;
