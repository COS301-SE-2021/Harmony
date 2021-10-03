import React, {useReducer, useState} from "react";
import { Button, Icon, TextField, Paper, Typography, Select, MenuItem, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function FormSubmit_NewTag(props) {
    let [tagName, setTagName] = useState('')
    let [type, setType] = useState('')
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


        fetch(" https://7q0027151j.execute-api.eu-west-1.amazonaws.com/dev/createtags", {
            method: "POST",
            body: JSON.stringify({
                TagName: tagName,
                Type: type
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => console.log("Success:", JSON.stringify(response)))
            .then(response => alert(JSON.stringify(response)))
            .then(response => {
                setTagName("")
                setType(" ")
            })
            .catch(error => console.error("Error:", error));

    };
    const handleTagInput = (evt)=>{

        const newValue = evt.target.value;
        setTagName(newValue)
    }

    const handleTypeInput = (evt)=>{
        const newValue = evt.target.value;
        setType(newValue)
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
                        label="Enter New Tag Name"
                        id="margin-normal"
                        name="TagName"
                        value={tagName}
                        className={classes.textField}
                        helperText="        "
                        onChange={handleTagInput}
                    />

                    <InputLabel className={classes.textField}>Select Tag Type</InputLabel>
                    <Select
                        value={type}
                        onChange={handleTypeInput}
                        className={classes.textField}
                        name="Type"
                    >
                        <MenuItem value="Regular"> Regular </MenuItem>
                        <MenuItem value="Negative"> Negative</MenuItem>

                    </Select>
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
