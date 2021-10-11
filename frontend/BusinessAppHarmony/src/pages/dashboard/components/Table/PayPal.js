import React, { useState, useRef, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export default function PayPal(props, reference) {

    const paypal = useRef();
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Settlement of account at Harmony Business",
                            amount: {
                                value: props.amount,
                                currency: "USD"
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order);

                fetch('https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/receivepayment', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ BID: "b4", Amount: props.amount })
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(props.reference.current.click(), props.paymentRef.current.click())
                //do an api call that updates the statement total
            },
            onError: (err) => {
                console.log(err)
                //do an alert that payment was unsuccessful
            }
        }).render(paypal.current)
    }, [])
    return (
        <>
            <div>
                <div ref={paypal}></div>
            </div>
        </>
    );
}

