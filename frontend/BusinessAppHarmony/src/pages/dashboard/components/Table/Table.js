import React, { useState, useRef } from "react";
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
import { CSVLink } from "react-csv";
import Widget from "../../../../components/Widget";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
import { IoMdCloudDownload } from "react-icons/io";
const states = {
  approved: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key
  var [mainChartState, setMainChartState] = useState("Month");
  const handleChange = (event) => {
    setMainChartState(event.target.value);
  };

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
    data: data,
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
            {data.map(({ id, name, date, expiring, location, audience, status, cost }) => (
              <TableRow key={id}>
                <TableCell className="pl-3 fw-normal">{name}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{expiring}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{audience}</TableCell>
                <TableCell>
                  <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
                </TableCell>
                <TableCell>{cost}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Widget>
    </Grid>

  );
}
