import React, {useReducer, useState} from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function FormSubmit_PublishIterations(props) {
    let [iterId, setIterID] = useState('')
    let [name, setName] = useState('')
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

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            ID: "",
            Type: ""
        }
    );

    const handleSubmit = evt => {
        evt.preventDefault();


        fetch(" https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/publishiteration", {
            method: "POST",
            body: JSON.stringify({
                IterID: iterId,
                Name: name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .then(json => alert(JSON.stringify(json)))
            .then(response => {
                setIterID("")
                setName(" ")
            })
    };

    const handleIterInput = (evt)=>{

        const newValue = evt.target.value;
        setIterID(newValue)
    }

    const handleNameInput = (evt)=>{
        const newValue = evt.target.value;
        setName(newValue)
    }

    const classes = useStyles();

    console.log(props);

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
                        value={iterId}
                        className={classes.textField}
                        helperText="Enter Iteration ID "
                        onChange={handleIterInput}
                    />

                    <TextField
                        label="Name for Iteration"
                        id="margin-normal"
                        name="Name"
                        value={name}
                        className={classes.textField}
                        helperText="Enter a name for Iteration "
                        onChange={handleNameInput}
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
