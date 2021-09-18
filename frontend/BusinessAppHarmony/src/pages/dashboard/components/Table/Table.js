import React, { useState, useRef, useEffect } from "react";
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
  approved: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);
  const [result, setResult] = useState({ StatusCode: 200, AdvertData: [], TotalCost: 0 });

  var keys = Object.keys(data.statements[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  /**to filter the data */
  var [mainChartState, setMainChartState] = useState("Month");
  const handleChange = (event) => {
    setMainChartState(event.target.value);
  };

  useEffect(() => {
    // fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getprofile", { BID: "b1" })
    fetch("https://alt0c0nrq7.execute-api.eu-west-1.amazonaws.com/dev/getstatement", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ BID: "b4", TimePeriod: "Month" })
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
  }, [])

  /** reference to allow an icon to click the csv button */
  const csvRef = useRef();

  /** the header for the csv to be exported */
  const headers = [
    { label: "Name", key: "name" },
    { label: "Date", key: "date" },
    { label: "Expiring", key: "expiring" },
    { label: "Location", key: "location" },
    { label: "Audience", key: "audience" },
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
        <div style={{ float: "right" }}>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={mainChartState}
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
            {/* {data.statements.map(({ id, name, date, expiring, location, audience, status, cost }) => (
              <TableRow key={id}>
                <TableCell className="pl-3 fw-normal">{name}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{expiring}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{audience}</TableCell>
                <TableCell>
                  <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
                </TableCell>
                <TableCell style={{ textAlign: "right" }}>{cost}</TableCell>

              </TableRow>
            ))} */}
            {result.AdvertData.map(({ BPID, FoodName, DateCreated, DaysRemaining, Locations, audience, Status, Price }) => (
              <TableRow key={BPID}>
                <TableCell className="pl-3 fw-normal">{FoodName}</TableCell>
                <TableCell>{DateCreated}</TableCell>
                <TableCell>{DaysRemaining}</TableCell>
                <TableCell>{Locations.map((item) => (item))}</TableCell>
                <TableCell>{audience}</TableCell>
                <TableCell>
                  <Chip label={Status} classes={{ root: classes[states[Status.toLowerCase()]] }} />
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
              R{result.TotalCost}
            </Typography>
          </div>
          <div style={{ clear: "both" }}></div>
          {checkout ? (<PayPal amount={data.total} />) : (
            <Button className={classes.payNowButton} variant="contained" onClick={() => { setCheckout(true) }}><GrPaypal style={{ marginRight: 10 }} size={20} color="white" />Pay now</Button>
          )}
        </div>
      </Widget>
    </Grid>

  );
}
