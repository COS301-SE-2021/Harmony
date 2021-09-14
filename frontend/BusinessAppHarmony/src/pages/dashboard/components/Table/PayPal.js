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
                                currency: "MXN"
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order)
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

