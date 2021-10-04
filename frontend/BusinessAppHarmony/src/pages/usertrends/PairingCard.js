import React, { useState, useEffect, useRef } from 'react';
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import { Typography } from "../../components/Wrappers/Wrappers";
import PayPal from '../dashboard/components/Table/PayPal';
import { GrPaypal } from "react-icons/gr";
import LocationForm from './LocationForm';
import TrendingStats from './trendingStats';
import { FiMinusCircle } from "react-icons/fi";
import Button from '@material-ui/core/Button';

export default function PairingCard(data) {
    const classes = useStyles();
    console.log(data);

    return (
        <>
            {data.data.imageData.map((item) => (
                <Grid item xs={4}>
                    <Widget
                        disableWidgetMenu
                        noBodyPadding
                        bodyClass={classes.tableWidget}
                    >
                        <div style={{ marginTop: -35, width: "100%" }}>
                            <div className={classes.PreviewPiece}><img src={item.foodImage} className={classes.ImageContainer} /></div>
                            <div className={classes.PreviewPiece}><img src={item.drinkImage} className={classes.ImageContainer} /></div>
                        </div>
                        <div className={classes.justifySpaceBetText}>
                            <div className={classes.foodChip}>
                                {item.foodName}
                            </div>
                            <div className={classes.floatLeft}>
                                <div className={classes.drinkChip}>
                                    {item.drinkName}
                                </div>
                            </div>
                        </div>

                    </Widget>
                </Grid>
            ))}
        </>
    );
}



