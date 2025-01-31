import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const TableComponent = () => {
  return (
    <Paper elevation={1} variant="rounded">
      <TableContainer>
        <Table aria-label="Program Options">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}></TableCell>
              <TableCell colSpan={4} align="center">
                <strong>DSCR Expanded</strong>
              </TableCell>
              <TableCell colSpan={4} align="center">
                <strong>DSCR Standard</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} rowSpan={4}>
                <strong>Pricing</strong>
              </TableCell>
              <TableCell colSpan={3}>Index</TableCell>
              <TableCell colSpan={4}>
                5/6 ARM & 7/6 ARM: 5 Year US Treasury
                <br />
                10/6 ARM & 30 yr FRM: 10 Year US Treasury
              </TableCell>
              <TableCell colSpan={4}>
                All rate types: 5 Year US Treasury
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Rate Buy Down Options</TableCell>
              <TableCell colSpan={4}>Buy Down Options Available</TableCell>
              <TableCell colSpan={4}>Buy Down Options Not Available</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Yield Spread Premium</TableCell>
              <TableCell colSpan={4}>YSP Available</TableCell>
              <TableCell colSpan={4}>YSP Available</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Rate Lock Terms*</TableCell>
              <TableCell colSpan={4}>
                30 day Free Gross Rate Lock Post Loan Approval
              </TableCell>
              <TableCell colSpan={4}>
                7 day Free Gross Rate Lock Post Loan Approval
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} rowSpan={6}>
                <strong>Product Box</strong>
              </TableCell>
              <TableCell colSpan={3}>Min FICO</TableCell>
              <TableCell colSpan={4}>660</TableCell>
              <TableCell colSpan={4}>680</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Max Loan Amount</TableCell>
              <TableCell colSpan={4}>All Property Types: $2,500,000</TableCell>
              <TableCell colSpan={4}>All Property Types: $1,500,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Min DSCR</TableCell>
              <TableCell colSpan={4}>1.10x</TableCell>
              <TableCell colSpan={4}>1.10x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                Borrower Citizenship Requirements
              </TableCell>
              <TableCell colSpan={4}>
                U.S. Non-Permanent Residents/Foreign Nationals Allowed, Max 65%
                LTV
              </TableCell>
              <TableCell colSpan={4}>No Foreign Nationals Allowed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Eligible States</TableCell>
              <TableCell colSpan={4}>
                All US, except MN, ND, SD, UT, VT & WV
              </TableCell>
              <TableCell colSpan={4}>
                All US, except AK, HI, MN, ND, SD, UT, VT & WV
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Rental Income Documentation</TableCell>
              <TableCell colSpan={4}>
                Proof of Receipt of Rental Income for Most Recent 3 Months
                RECOMMENDED for refinances with leases &gt;30 days**
              </TableCell>
              <TableCell colSpan={4}>
                Proof of Receipt of Rental Income for Most Recent 3 Months
                REQUIRED for refinances with leases &gt;30 days
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Closings</TableCell>
              <TableCell colSpan={3}>Whitelabeling</TableCell>
              <TableCell colSpan={4}>
                Whitelabeled Closings Available via MERS
              </TableCell>
              <TableCell colSpan={4}>
                MERS unavailable, Closings under Loan Funder LLC
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
