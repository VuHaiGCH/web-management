import React from "react";
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
  active: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
            <TableCell></TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
       
          <TableRow>
            <TableCell className="pl-3 fw-normal"></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>

      </TableBody>
    </Table>
  );
}
