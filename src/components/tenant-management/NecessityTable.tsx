import {
    Table, Thead, Tbody,
    Tr, Th, Td,
    TableContainer, Input,
} from '@chakra-ui/react';
import { NecessitySchema } from '../../services/tenant-management/TenantServices';
interface NecessityTable {
    addNecessity: boolean;
    newNecessity: NecessitySchema;
    updateNewNecessity: (newNecessity: NecessitySchema) => void;
    necessityList: Array<NecessitySchema>;
}
export default function NecessityTable({ addNecessity, newNecessity, updateNewNecessity, necessityList }: NecessityTable) {
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
                                    <Input
                                        placeholder='Enter a necessity Type' variant="flushed"
                                        value={newNecessity.necessity_type} type="text"
                                        onChange={(e) => {
                                            updateNewNecessity({
                                                ...newNecessity,
                                                necessity_type: e.target.value,
                                            });
                                        }}
                                    />
                                </Td>
                                <Td>
                                    <Input
                                        placeholder='Enter necessity fee' variant="flushed"
                                        value={(newNecessity.necessity_fee === 0) ? "" : newNecessity.necessity_fee} type="number"
                                        onChange={(e) => {
                                            updateNewNecessity({
                                                ...newNecessity,
                                                necessity_fee: Number(e.target.value),
                                            });
                                        }}
                                    />
                                </Td>
                            </Tr>
                            :
                            null
                    }
                    {
                        (necessityList.length < 1)
                            ?
                            null
                            :
                            necessityList.map((e) => {
                                return (
                                    <Tr data-necessity-id={e.necessity_id} key={e.necessity_id}>
                                        <Td>
                                            {e.necessity_type}
                                        </Td>
                                        <Td>
                                            {e.necessity_fee}
                                        </Td>
                                    </Tr>
                                );
                            })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}