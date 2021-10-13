import React, { useState, useEffect } from "react";
import {
    Grid,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import Widget from "../../components/Widget";
import useStyles from "./styles";
import { Typography } from "../../components/Wrappers";
import PairingCard from "./PairingCard";

export default function TrendingStats() {
    const classes = useStyles();
    const [recommendations, setRecommendations] = useState({ Tags: [], Pairings: [{}], imageData: [{}] })

    useEffect(() => {
        /**load recommendations */
        fetch("https://5lvu4c0875.execute-api.eu-west-1.amazonaws.com/dev/getrecommendations")
            .then(res => res.json())
            .then(
                (result) => {
                    setRecommendations(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                }
            )
    }, [])
    return (
        <>
            <Grid item xs={12}>
                <Widget
                    disableWidgetMenu
                >
                    <Typography size="xl" weight="bold">
                        Trending Statistics
                    </Typography>

                    <Typography size="md" weight="light">
                        The following statistics are a tabular representation of what our system has detected
                        to be trending or popular statistics currently.Hence for your ads to get more interactions
                        and exposure we recommend using pairings of foods or drinks with the following tags, or making
                        pairings similar to these.
                    </Typography>
                </Widget>
            </Grid>
            <PairingCard data={recommendations} />
            <Grid item xs={6}>
                <Widget
                    disableWidgetMenu
                >
                    <Typography size="md" weight="bold">
                        Trending Pairing Statistics
                    </Typography>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow className={classes.tableRowHeader}>
                                <TableCell style={{ color: "white" }}>FOOD NAME</TableCell>
                                <TableCell style={{ color: "white" }}>DRINK NAME</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recommendations.Pairings.map(({ Food, Drink }) => (
                                <TableRow>
                                    <TableCell className="pl-3 fw-normal">{Food}</TableCell>
                                    <TableCell>{Drink}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </Widget>
            </Grid>
            <Grid item xs={6}>
                <Widget
                    disableWidgetMenu
                    bodyClass={classes.tableWidget}
                >
                    <Typography size="md" weight="bold">
                        Trending Tag Statistics
                    </Typography>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow className={classes.tableRowHeader}>
                                <TableCell style={{ color: "white" }}>TAG NAME</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {recommendations.Tags.map((item) => (
                                <TableRow key={item}>
                                    <TableCell className="pl-3 fw-normal">{item}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Grid>

        </>
    );
}
