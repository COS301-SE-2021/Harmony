import React, { useState, useRef, useEffect } from "react";
import { Auth } from 'aws-amplify';
import {
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
  Select,
  OutlinedInput,
  MenuItem,
  Button
} from "@material-ui/core";
import PayPal from "./PayPal";
import { CSVLink } from "react-csv";
import Widget from "../../../../components/Widget";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
import { IoMdCloudDownload } from "react-icons/io";
import { GrPaypal } from "react-icons/gr";
const states = {
  Active: "success",
  Expired: "secondary",
  Payment: "info"
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);
  const [result, setResult] = useState({ StatusCode: 200, AdvertData: [{ Locations: [] }, { Locations: [] }], OutstandingAmount: 0 });

  var tableHeadings = [{ name: "", date_Created: "", expiring: "", location: "", status: "", cost: "" },] // var keys = Object.keys(data.statements[0]).map(i => i.toUpperCase());
  var keys = Object.keys(tableHeadings[0]).map(i => i.toUpperCase());
  /**to filter the data */
  var [TimePeriod, setTimePeriod] = useState("Month");
  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };

  /**to detect if a child component is changed */
  const [change, detectChange] = useState(true);
  const detectChangeRef = useRef();
  useEffect(() => {
    detectChange(false);
    console.log("change detected");
    /**load profile data */
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getstatement", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username, TimePeriod: TimePeriod })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setResult(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [change])


  useEffect(() => {
    console.log(JSON.stringify({ BID: Auth.user.username, TimePeriod: TimePeriod }));

    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getstatement", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: Auth.user.username, TimePeriod: TimePeriod })
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setResult(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [TimePeriod])

  /** reference to allow an icon to click the csv button */
  const csvRef = useRef();

  /** the header for the csv to be exported */
  const headers = [
    { label: "Name", key: "name" },
    { label: "Date Created", key: "date" },
    { label: "Expiring", key: "expiring" },
    { label: "Location", key: "location" },
    { label: "Status", key: "status" },
    { label: "Cost", key: "cost" },
  ];
  /**The variables need to export the csv for payments */
  const csvReport = {
    data: data.statements,
    headers: headers,
    filename: 'StatementOfAccount.csv'
  };
  return (
    <Grid item xs={12}>
      <Widget
        disableWidgetMenu
        noBodyPadding
        bodyClass={classes.tableWidget}
      >
        <Button style={{ display: 'none' }} onClick={() => detectChange(true)} ref={detectChangeRef} />

        <div style={{ float: "right" }}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={TimePeriod}
            onChange={handleChange}
            label="chartState"
            style={{ float: "left", width: 150, marginRight: 25 }}
          >
            <MenuItem value="Day">Past Day</MenuItem>
            <MenuItem value="Week">Past Week</MenuItem>
            <MenuItem value="Month">Past Month</MenuItem>
            <MenuItem value="Year">Past Year</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
          <CSVLink {...csvReport} style={{ display: 'none' }} ref={csvRef}>Export to CSV</CSVLink>
          <IoMdCloudDownload style={{ float: "left", marginRight: 25 }} size={32} onClick={() => { csvRef.current.link.click() }} />

        </div>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              {keys.map(key => (
                <TableCell key={key}>{key}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {result.AdvertData.map(({ BPID, FoodName, DrinkName, DateCreated, DaysRemaining, Locations, Status, Price }) => (
              <TableRow key={BPID}>
                {
                  FoodName == 'Payment Successful' ? (<TableCell className="pl-3 fw-normal">{FoodName} </TableCell>) : (<TableCell className="pl-3 fw-normal">{FoodName} and {DrinkName}</TableCell>)
                }
                <TableCell>{DateCreated}</TableCell>

                {
                  FoodName == 'Payment Successful' ? (<TableCell>{DaysRemaining} </TableCell>) : (<TableCell>{DaysRemaining} Days </TableCell>)
                }
                <TableCell>{Locations.map((item) => (item + ", "))}</TableCell>
                {/* <TableCell>{Locations}</TableCell> */}
                {/* {
                  Status == 'Active' ? (<Chip label={Status} classes={{ root: classes[states[Status]] }} />) : (<TableCell className="pl-3 fw-normal">{FoodName} and {DrinkName}</TableCell>)
                } */}
                <TableCell>
                  {
                    Status == 'Active' ? (<Chip label={Status} style={{ backgroundColor: "#3cd4a0", color: '#fff' }} />) : null
                  }
                  {
                    Status == 'Expired' ? (<Chip label={Status} style={{ backgroundColor: "#FF2222", color: '#fff', }} />) : null
                  }
                  {
                    Status == 'Payment' ? (<Chip label={Status} style={{ backgroundColor: "#9013fe", color: '#fff', }} />) : null
                  }
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>{Price}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.totalBox}>
          <div className={classes.floatLeftLeft}>
            <Typography size="xl" weight="bold">
              Balance Due
            </Typography>
          </div>
          <div className={classes.floatLeft}>
            <Typography size="xl" weight="bold">
              R{result.OutsandingAmount}
            </Typography>
          </div>
          <div style={{ clear: "both" }}></div>
          {checkout ? (<PayPal amount={result.OutsandingAmount} reference={detectChangeRef} />) : (
            <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
          )}
        </div>
      </Widget>
    </Grid>

  );
}
