import { Table, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TestTable({header, data}) {
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {header.map(heading => {
                        <TableCell>{heading}</TableCell>
                    })} 
                </TableRow>
            </TableHead>
        </Table>
    </TableContainer>
  )
}
