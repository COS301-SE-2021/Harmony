import React, { useReducer, useState } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function FormSubmit_ImageUrl(props) {
    let [tagId, setTagID] = useState('')
    let [URL, setURL] = useState('')
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


        fetch("https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/newimage", {
            method: "POST",
            body: JSON.stringify({
                TagID: tagId,
                URL: URL
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .then(alert("Image Successfully Added to AI Training Set"))
            .then(response => {
                setTagID("")
                setURL(" ")
            })
            .catch(error => console.error("Error:", error));

    };


    const handleIDInput = (evt)=>{

        const newValue = evt.target.value;
        setTagID(newValue)
    }

    const handleURLInput = (evt)=>{
        const newValue = evt.target.value;
        setURL(newValue)
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
                        label="Tag ID"
                        id="margin-normal"
                        name="TagID"
                        value={tagId}
                        className={classes.textField}
                        helperText="Enter TagID "
                        onChange={handleIDInput}
                    />
                    <TextField
                        label="Image URL"
                        id="margin-normal"
                        name="images"
                        value={URL}
                        className={classes.textField}
                        helperText="e.g. .png"
                        onChange={handleURLInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style = {{color:'white'}}
                    >
                        Submit <Icon className={classes.bottomIcon}></Icon>
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
