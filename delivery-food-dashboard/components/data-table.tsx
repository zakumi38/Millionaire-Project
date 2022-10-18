import inputProps from "types/data-table.types"
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableFooter,
    TableRow,
    TableCell,
    Pagination,
} from "@mui/material"

export default function DataTable({ headerData, bodyData }: inputProps) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headerData.map((header) => (
                            <TableCell key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyData.riders!.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.createdDate}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell>{row.todayIncome}</TableCell>
                            <TableCell>
                                {row.previousPayments?.length}
                            </TableCell>
                            <TableCell>
                                <img
                                    src={row.photoUrl}
                                    width={50}
                                    height={50}
                                />
                            </TableCell>
                            <TableCell>{row.completedOrders.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
