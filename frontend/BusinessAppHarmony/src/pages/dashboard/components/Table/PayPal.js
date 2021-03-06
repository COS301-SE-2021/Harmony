import React, { useState, useRef, useEffect } from "react";

export default function PayPal(amount) {

    const paypal = useRef();
    useEffect(() => {
        console.log(amount);
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Settlement of account at Harmony Business",
                            amount: {
                                value: amount.amount,
                                currency: "USD"
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order);
                console.log(amount.amount);

                fetch('https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/receivepayment', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ BID: "b4", Amount: amount.amount })
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .then(alert("Payment completed successfully."))
                //do an api call that updates the statement total
            },
            onError: (err) => {
                console.log(err)
                //do an alert that payment was unsuccessful
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

