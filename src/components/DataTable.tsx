import {
    Table, Thead, Tbody,
    Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';
interface DataTableProps {
    data: Array<object>;
}
export default function DataTable({ data }: DataTableProps) {
    const tableHeadings = (data.length > 0) ? Object.keys(data[0]) : [];
    return (
        <TableContainer overflowY="hidden" boxShadow="md">
            <Table variant='striped' colorScheme="teal">
                <Thead bgColor="brandPallete.primary">
                    <Tr>
                        {
                            tableHeadings.map((heading) => {
                                return (
                                    <Th color="brandPallete.text">{heading}</Th>
                                );
                            })
                        }
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((dataObject) => {
                            return (
                                <Tr>
                                    {
                                        Object.values(dataObject).map((value) => {
                                            return (
                                                <Td>{value}</Td>
                                            );
                                        })
                                    }
                                </Tr>
                            );
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}