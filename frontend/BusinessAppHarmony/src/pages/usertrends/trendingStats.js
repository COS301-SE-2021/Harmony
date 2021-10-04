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
    const [recommendations, setRecommendations] = useState({ Tags: [], Pairings: [{}] })
    const data = {
        imageData: [
            {
                foodImage: "https://thestayathomechef.com/wp-content/uploads/2016/06/The-Most-Amazing-Chocolate-Cake-2-e1598548411160.jpg",
                drinkImage: "https://www.gardeningknowhow.com/wp-content/uploads/2012/09/herbal-tea-1.jpg",
                foodName: "Cake",
                drinkName: "Tea"
            },
            {
                foodImage: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg",
                drinkImage: "https://images2.minutemediacdn.com/image/upload/c_crop,h_1191,w_2119,x_0,y_111/f_auto,q_auto,w_1100/v1617716394/shape/mentalfloss/643219-gettyimages-1248993201.jpg",
                foodName: "Pizza",
                drinkName: "Beer",
            },
            {
                foodImage: "https://media-cdn.tripadvisor.com/media/photo-s/0f/12/94/43/canecutters.jpg",
                drinkImage: "https://www.eatthis.com/wp-content/uploads/sites/4/media/images/ext/108098914/coca-cola-soda-ice.jpg?quality=82&strip=all",
                foodName: "Bunny Chow",
                drinkName: "Coke",
            }
        ]
    }
    useEffect(() => {
        /**load recommendations */
        fetch("https://5lvu4c0875.execute-api.eu-west-1.amazonaws.com/dev/getrecommendations")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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
                    bodyClass={classes.tableWidget}
                >
                    <Typography size="xl" weight="bold">
                        Trending Statistics
                    </Typography>
                    <Typography size="md" weight="light">
                        The following statistics are a tabular representation of what our system has detected
                        to be trending or popular statistics currently. Hence for your ads to get more interactions
                        and exposure we recommend using pairings of foods or drinks with the following tags, or making
                        pairings similar to these.
                    </Typography>
                </Widget>
            </Grid>
            <PairingCard data={data} />
            <Grid item xs={6}>
                <Widget
                    disableWidgetMenu
                    bodyClass={classes.tableWidget}
                >
                    <Typography size="md" weight="bold">
                        Trending Pairing Statistics
                    </Typography>
                    <Table className="mb-0">
                        <TableHead>
                            <TableRow className={classes.tableRowHeader}>
                                <TableCell className={classes.tableCell}>FOOD NAME</TableCell>
                                <TableCell className={classes.tableCell}>DRINK NAME</TableCell>
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
                                <TableCell className={classes.tableCell}>TAG NAME</TableCell>
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
