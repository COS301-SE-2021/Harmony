import React, { useState } from "react";
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

export default function TableComponent({ data }) {
  const classes = useStyles();
  // var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  // keys.shift(); // delete "id" key
  var [tableData, setTableData] = useState(data);

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {/* {data.map(PID => ( */}
          <TableCell>ID</TableCell>
          <TableCell >Food</TableCell>
          <TableCell >Drink</TableCell>
          {/* ))} */}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {data.map(({ id, name, email, product, price, date, city, status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{product}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>{city}</TableCell>
             <TableCell>
              <Chip label={status} classes={{root: classes[states[status.toLowerCase()]]}}/>
            </TableCell> 
          </TableRow>
        ))} */}
        <TableRow>
          {console.log("in table " + JSON.stringify(data.Data))}
          <TableCell className="pl-3 fw-normal">{data.Data[0].PID}</TableCell>
          <TableCell>{data.Data[0].FoodItem}</TableCell>
          <TableCell>{data.Data[0].DrinkItem}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
