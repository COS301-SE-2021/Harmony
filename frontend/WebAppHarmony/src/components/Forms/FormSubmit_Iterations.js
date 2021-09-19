import React, { useReducer, useState } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function FormSubmit_Iterations(props) {
    let [iterId, setIterId] = useState("")
    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1)
        },
        leftIcon: {
            marginRight: theme.spacing(1)
        },
        rightIcon: {
            marginLeft: theme.spacing(1)
        },
        iconSmall: {
            fontSize: 20
        },
        root: {
            padding: theme.spacing(3, 2)
        },
        container: {
            display: "flex",
            flexWrap: "wrap"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400
        }
    }));
    const handleSubmit = evt => {
        evt.preventDefault();
        

        fetch("https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/unpublishiterations", {
            method: "POST",
            body: JSON.stringify({IterId : iterId}),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .then(response => setIterId("") )
            .catch(error => console.error("Error:", error));
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setIterId(newValue );
    };

    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    {props.formName}
                </Typography>
                <Typography component="p">{props.formDescription}</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Iteration ID"
                        id="margin-normal"
                        name="IterId"
                        value = {iterId}
                        className={classes.textField}
                        helperText="Enter Iteration ID "
                        onChange={handleInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit <Icon className={classes.bottomIcon}></Icon>
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
