import {
    Table, Thead, Tbody,
    Tr, Th, Td,
    TableContainer, Input,
} from '@chakra-ui/react';
interface NecessityTable {
    addNecessity: boolean;
}
export default function NecessityTable({ addNecessity }: NecessityTable) {
    return (
        <TableContainer boxShadow="md">
            <Table variant='striped' >
                <Thead bgColor="brandPallete.primary" color="brandPallete.text">
                    <Tr position="relative">
                        <Th color="brandPallete.text">Necessity Type</Th>
                        <Th color="brandPallete.text">Necessity Fee</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        (addNecessity)
                            ?
                            <Tr>
                                <Td>
                                    <Input placeholder='Enter a necessity Type' variant="flushed" />
                                </Td>
                                <Td>
                                    <Input placeholder='Enter necessity fee' variant="flushed" type="number" />
                                </Td>
                            </Tr>
                            :
                            null
                    }
                    <Tr>
                        <Td>
                            Electric Fan
                        </Td>
                        <Td>
                            2700 php
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}