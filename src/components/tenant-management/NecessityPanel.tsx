import {
    Button, Heading, Flex,
    TabPanel, Spacer, HStack
} from '@chakra-ui/react';


import {
    ContractSchema, NecessitySchema, addNecessity,
} from '../../services/tenant-management/TenantServices';
import NecessityTable from './NecessityTable';

import {
    useState
} from 'react';
interface NecessityPanel {
    contract: ContractSchema | null;
    necessityList: Array<NecessitySchema> | [];
    updateNecessityList: (necessityList: Array<NecessitySchema> | []) => void;
}
export function NecessityPanel({ contract, necessityList, updateNecessityList }: NecessityPanel) {
    const [inputNecessity, setInputNecessity] = useState<true | false>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newNecessity, setNewNecessity] = useState<NecessitySchema>({
        necessity_type: "",
        necessity_fee: 0,
    });

    async function handleConfirmNecessity(contract: ContractSchema | null) {
        if (contract && contract.contract_id) {
            const response = await addNecessity(contract.contract_id, Number(newNecessity.necessity_fee), newNecessity.necessity_type);
            if (response) {
                updateNecessityList(response.necessities);
            }
        } else {
            updateNecessityList([...necessityList, newNecessity]);
        }
        setNewNecessity({
            necessity_type: "",
            necessity_fee: 0,
        });
    }

    function openInputNecessity(state: boolean) {
        setInputNecessity(!state);
    }

    function updateNewNecessity(newNecessity: NecessitySchema) {
        setNewNecessity(newNecessity);
    }



    return (
        <TabPanel display="flex" flexDirection="column" gap="2">
            <Flex >
                <Heading size="md">Necessities</Heading>
                <Spacer></Spacer>
                {
                    (inputNecessity)
                        ?
                        <Button
                            size="xs" colorScheme="teal"
                            onClick={() => {
                                openInputNecessity(inputNecessity);
                                handleConfirmNecessity(contract);
                            }}
                        >Confirm
                        </Button>
                        :
                        <HStack>
                            <Button
                                size="xs" colorScheme="teal" variant="outline"
                                onClick={() => {
                                    openInputNecessity(inputNecessity);
                                }}
                            >Add
                            </Button>
                            <Button
                                size="xs" colorScheme="red" variant="outline"
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                }}
                            >
                                Edit
                            </Button>
                        </HStack>
                }
            </Flex>
            <NecessityTable
                necessityList={necessityList}
                addNecessity={inputNecessity} newNecessity={newNecessity}
                updateNewNecessity={updateNewNecessity} isEditing={isEditing}
                updateNecessityList={updateNecessityList} contract={contract}
            >
            </NecessityTable>
        </TabPanel>
    );
}
