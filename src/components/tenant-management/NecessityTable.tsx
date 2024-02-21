import {
    Table, Thead, Tbody,
    Tr, Th, Td,
    TableContainer, Input,
    IconButton
} from '@chakra-ui/react';
import { ContractSchema, NecessitySchema, deleteNecessity } from '../../services/tenant-management/TenantServices';
import { FaTrash } from "react-icons/fa";
interface NecessityTable {
    addNecessity: boolean;
    newNecessity: NecessitySchema;
    updateNewNecessity: (newNecessity: NecessitySchema) => void;
    necessityList: Array<NecessitySchema>;
    isEditing: boolean;
    contract: ContractSchema | null;
    updateNecessityList: (necessityList: Array<NecessitySchema> | []) => void;
}
export default function NecessityTable({
    addNecessity, newNecessity, updateNewNecessity,
    necessityList, isEditing, contract, updateNecessityList,
}: NecessityTable) {

    function handleDeleteNecessity(contractId: string, necessityId: string) {
        deleteNecessity(contractId, necessityId).then((data) => {
            if (data) {
                updateNecessityList(data);
            }
        });
    }

    return (
        <TableContainer boxShadow="md">
            <Table variant='striped' >
                <Thead bgColor="brandPallete.primary" color="brandPallete.text">
                    <Tr position="relative">
                        <Th color="brandPallete.text">Necessity Type</Th>
                        <Th color="brandPallete.text">Necessity Fee</Th>
                        {
                            (isEditing)
                                ?
                                <Th color="brandPallete.text" textAlign="end">
                                    Delete
                                </Th>
                                :
                                null
                        }
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
                                        {
                                            (isEditing)
                                                ?
                                                <Td width="max-content" >
                                                    <IconButton
                                                        aria-label='delete necessity' icon={<FaTrash />}
                                                        float="right" colorScheme="red" variant="outline"
                                                        isRound
                                                        onClick={(e) => {
                                                            const row = e.currentTarget.parentElement?.parentElement;
                                                            const necessityId = row?.getAttribute("data-necessity-id");
                                                            if (contract && contract.contract_id && necessityId) {
                                                                handleDeleteNecessity(contract.contract_id, necessityId);
                                                            }
                                                        }}
                                                    />
                                                </Td>
                                                :
                                                null
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