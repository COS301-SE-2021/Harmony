import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function AlertComponent(props) {

    /**to toggle the display of the toast */
    const [open, setOpen] = React.useState(true);
    /**use effect to detect the alert opening and will auto close after an amount of time */
    useEffect(() => {
        setTimeout(function () {
            setOpen(false);
        }, 5000);
    }, [open])

    return (
        <>
            <button onClick={() => { setOpen(true); }}>alert</button>

            <Collapse in={open}>
                <Alert onClose={() => { setOpen(false); }}>{props.message}</Alert>
            </Collapse>
        </>
    );
}
