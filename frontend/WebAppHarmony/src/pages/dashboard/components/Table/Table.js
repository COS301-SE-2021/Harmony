import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data, ...props }) {
  const classes = useStyles();
  // var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  // keys.shift(); // delete "id" key
  var [tableData, setTableData] = useState([]);
  useEffect(() => {

    fetch('https://w3lfp6r6f7.execute-api.eu-west-1.amazonaws.com/dev/viewmostfavouritepairings')
      .then(response => response.json())
      .then(data => setTableData(data.Data));
    // .then(console.log(tableData));
    /**  empty dependency array means this effect will only run once (like componentDidMount in classes)*/
  }, []);
  return (
    <div style={{ height: 300, overflowY: "scroll" }}>
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {/* {data.map(PID => ( */}
            <TableCell>ID</TableCell>
            <TableCell >Food</TableCell>
            <TableCell >Drink</TableCell>
            <TableCell >Up Votes</TableCell>
            <TableCell >Down Votes</TableCell>
            <TableCell >Favourited</TableCell>
            {/* ))} */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((pairing) => (
            <TableRow>
              <TableCell className="pl-3 fw-normal">{pairing.PID}</TableCell>
              <TableCell>{pairing.FoodItem}</TableCell>
              <TableCell>{pairing.DrinkItem}</TableCell>
              <TableCell>
                <Chip label={pairing.Upvotes} classes={{ root: classes[states["success"]] }} />
              </TableCell>
              <TableCell>
                <Chip label={pairing.Downvotes} classes={{ root: classes[states["warning"]] }} />
              </TableCell>
              <TableCell>
                <Chip label={pairing.Count} classes={{ root: classes[states["success"]] }} />
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow>
          {console.log("in table " + JSON.stringify(data))}
          <TableCell className="pl-3 fw-normal">test</TableCell>
          <TableCell>rge</TableCell>
          <TableCell>th</TableCell>
        </TableRow> */}
          {/* <TableRow>
          <TableCell className="pl-3 fw-normal">{data.Data[1].PID}</TableCell>
          <TableCell>{data.Data[1].FoodItem}</TableCell>
          <TableCell>{data.Data[1].DrinkItem}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="pl-3 fw-normal">{data.Data[2].PID}</TableCell>
          <TableCell>{data.Data[2].FoodItem}</TableCell>
          <TableCell>{data.Data[2].DrinkItem}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="pl-3 fw-normal">{data.Data[3].PID}</TableCell>
          <TableCell>{data.Data[3].FoodItem}</TableCell>
          <TableCell>{data.Data[3].DrinkItem}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="pl-3 fw-normal">{data.Data[4].PID}</TableCell>
          <TableCell>{data.Data[4].FoodItem}</TableCell>
          <TableCell>{data.Data[4].DrinkItem}</TableCell>
        </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
