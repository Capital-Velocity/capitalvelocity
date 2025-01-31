import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Credit Score", 0, 0, "+0.25% if mid-FICO<720"),
  createData(
    "Liquidity",
    0,
    0,
    "+0.25% if guarantor post close liquidity<15% of Total Loan"
  ),
  createData(
    "Tertiary Market",
    "no",
    0,
    "+0.5% if combined sponsor experience<5 similar MF projects (size, scope, location,etc."
  ),
  createData("Total Projects Completed", 0, 0, "+0.5% if tertiary submarket"),
  createData(
    "Non-Residential Units",
    "no",
    0,
    "+0.75% if property is mixed-use"
  ),
  createData(
    "Vacant",
    "",
    0,
    "+0.75% if property is >=50% of physical vacancy at closing"
  ),
  createData(
    "Loan to Value",
    "",
    0,
    "+0.25% if ARLTV is higher than 65% (does not apply to cash-out refi)"
  ),
  createData(
    "Loan To Purpose",
    "Refi",
    0,
    "+0.5% if loan purpose is a cash-out refinance"
  ),
  createData(
    "Total Renovation Budget",
    "$0",
    0,
    "+0.5% if Capex budget>50% of Total Loan"
  ),
  createData("Total Adjustments", "$0"),
  createData("Total Rate", "0%"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Criteria</TableCell>
            <TableCell align="right">Input</TableCell>
            <TableCell align="right">Adjustment</TableCell>
            <TableCell align="right">Adjustment Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
