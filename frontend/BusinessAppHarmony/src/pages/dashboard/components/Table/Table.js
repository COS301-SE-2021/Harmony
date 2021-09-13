import React, { useState } from "react";
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
import Widget from "../../../../components/Widget";
import useStyles from "../../styles";
import { Typography } from "../../../../components/Wrappers";
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
  return (
    <Grid item xs={12}>
      <Widget
        disableWidgetMenu
        noBodyPadding
        bodyClass={classes.tableWidget}
      >
        <div className={classes.tableHeader}>
          <div style={{ float: "left" }}>
            <Typography size="xl" weight="medium" colorBrightness="secondary" noWrap>
              Remaining balance on account
            </Typography>
          </div>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={mainChartState}
            onChange={handleChange}
            label="chartState"
            style={{ float: "left", marginRight: 50 }}
          >
            <MenuItem value="Day">Past Day</MenuItem>
            <MenuItem value="Week">Past Week</MenuItem>
            <MenuItem value="Month">Past Month</MenuItem>
            <MenuItem value="Year">Past Year</MenuItem>
          </Select>
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
