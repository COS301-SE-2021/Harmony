import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
// components
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";


export default function PairingCard(data) {
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12}>
                <Widget
                    disableWidgetMenu
                >
                    <Typography size="xl" weight="bold">
                        Trending Pairing Options
                    </Typography>
                    <Typography size="md" weight="light">
                        Here are the three most likely pairings to gain popularity.
                    </Typography>
                </Widget>
            </Grid>
            {data.data.imageData.map((item, index) => (
                index < 3 ? (<Grid item xs={4}>
                    <Widget
                        disableWidgetMenu
                        noBodyPadding
                    >
                        <div style={{ marginTop: -35, width: "100%" }}>
                            <div style={{ width: "50%", float: "left" }}>
                                <div className={classes.PreviewPiece}><img src={item.foodImage} className={classes.ImageContainer} /></div>
                                <div className={classes.foodChip}>
                                    {item.foodName}
                                </div>
                            </div>
                            <div style={{ width: "50%", float: "left" }}>
                                <div className={classes.PreviewPiece}><img src={item.drinkImage} className={classes.ImageContainer} /></div>
                                <div className={classes.drinkChip}>
                                    {item.drinkName}
                                </div>
                            </div>
                        </div>
                    </Widget>
                </Grid>) : null

            ))}
        </>
    );
}



