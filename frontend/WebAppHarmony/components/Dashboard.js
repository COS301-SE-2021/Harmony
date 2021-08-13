import React from 'react';
import '../src/App.css';
import { Chart } from 'react-charts'

function Dashboard() {
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
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
        <div style={{ borderRadius: 15, backgroundColor: "#E4EAE9", width: "90%", height: "500px", margin: "auto" }}>
            <Chart data={data} axes={axes} />
        </div>

    );
}

export default Dashboard;
