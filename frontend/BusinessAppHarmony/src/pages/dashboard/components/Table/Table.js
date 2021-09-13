import React from "react";
import {
  Grid,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
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

  return (
    <Grid item xs={12}>
      <Widget
        title={<Typography size="xl" weight="medium" colorBrightness="secondary" noWrap>
          Remaining balance on account
        </Typography>
        }
        upperTitle
        noBodyPadding
        bodyClass={classes.tableWidget}
      >
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
