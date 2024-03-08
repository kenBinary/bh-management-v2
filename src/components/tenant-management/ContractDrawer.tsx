import {
    Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Button, Input,
    Heading, Text, SimpleGrid,
    Tabs, TabList,
    TabPanels, Tab, TabPanel,
    useToast,
} from '@chakra-ui/react';


import {
    TenantSchema, editContract,
    newContract, ContractSchema,
    NecessitySchema,
    getNecessityList,
    addNecessity,
    addSignatures,
} from '../../services/tenant-management/TenantServices';
import { Parties, GeneralTerms } from './ContractContent';

import {
    useState, useEffect,
} from 'react';
import { dataURLtoBlob } from '../../utils/conversions';
import { SignaturePanel, SignatureUrls } from './SignaturePanel';
import { NecessityPanel } from './NecessityPanel';
interface Drawer {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<null | HTMLButtonElement>;
    tenant: TenantSchema;
    contract: null | ContractSchema;
    updateContract: (contract: ContractSchema) => void;
}

export default function ContractDrawer({ isOpen, onClose, btnRef, tenant, contract, updateContract }: Drawer) {
    const currentDate: string = new Date().toISOString().slice(0, 10);
    const toast = useToast();
    const [nContract, setNContract] = useState<ContractSchema>({
        start_date: null,
        end_date: null,
    });

    const [necessityList, setNecessityList] = useState<Array<NecessitySchema> | []>([]);

    function updateNecessityList(necessityList: Array<NecessitySchema> | []) {
        setNecessityList(necessityList);
    }

    useEffect(() => {
        if (contract !== null && contract.contract_id) {
            getNecessityList(contract.contract_id).then((response) => {
                if (response?.data) {
                    setNecessityList(response.data);
                }
            });
        } else {
            setNecessityList([]);
        }
    }, [contract]);

    const [signatures, setSignatures] = useState<SignatureUrls>({
        tenantDataUrl: "",
        landlordDataUrl: "",
    });

    function updateSignatures(newSignatures: SignatureUrls) {
        setSignatures({
            ...signatures,
            ...newSignatures,
        });
    }

    function handleAddContract() {

        const isSignatureEmpty = signatures.landlordDataUrl === "" && signatures.tenantDataUrl === "";

        if (nContract.start_date && !isSignatureEmpty) {
            newContract(tenant.tenant_id, nContract.start_date, nContract.end_date)
                .then((response) => {
                    if (response === "fail") {
                        toast({
                            description: "Failed to add contract",
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                        });
                    }
                    else {
                        const newContract = response[0];
                        updateContract(newContract);

                        necessityList.forEach(async (necessity, index, Array) => {
                            if (newContract !== null && newContract.contract_id) {
                                const response = await addNecessity(newContract.contract_id, Number(necessity.necessity_fee), necessity.necessity_type);
                                if (response && index === (Array.length - 1)) {
                                    updateNecessityList(response.necessities);
                                }
                            }
                        });

                        if (signatures.tenantDataUrl && signatures.landlordDataUrl && newContract.contract_id) {
                            const newSignature = {
                                contractId: newContract.contract_id,
                                dateSigned: currentDate,
                                signatories: ["landlord", "tenant"],
                                tenantSignature: dataURLtoBlob(signatures.tenantDataUrl),
                                landlordSignature: dataURLtoBlob(signatures.landlordDataUrl),
                            };
                            addSignatures(newSignature);
                        }

                        toast({
                            description: "Contract Added",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        });

                    }
                });
        } else {
            toast({
                description: "Please enter some data for the contract",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        onClose();
    }

    function handleEditContract() {
        if (contract !== null) {
            editContract(tenant.tenant_id, contract).then((response) => {
                if (response === "success") {
                    toast({
                        description: "Edit Success",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                }
                else {
                    toast({
                        description: "Failed to Edit Contract",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                }
            });
        }
        onClose();
    }
    return (
        <>
            <Drawer
                isOpen={isOpen} placement='right'
                onClose={onClose} finalFocusRef={btnRef}
                size="xl"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Contract Details</DrawerHeader>

                    <DrawerBody >
                        <Tabs variant='soft-rounded' colorScheme="teal" h="full" display="flex" flexDirection="column">
                            <TabList position="sticky">
                                <Tab>Lease Details</Tab>
                                <Tab>Necessity</Tab>
                                <Tab>Signature</Tab>
                            </TabList>
                            <TabPanels overflowY="auto" >
                                <TabPanel>
                                    <Parties
                                        fullName={`${tenant.first_name} ${tenant.last_name}`}
                                    ></Parties>
                                    <SimpleGrid columns={2} gap="2">
                                        <Heading size="xs">Start Date</Heading>
                                        <Heading size="xs">End Date</Heading>
                                        {
                                            (contract) ?
                                                <Text>{contract.start_date}</Text>
                                                :
                                                <Input type="date"
                                                    value={(nContract.start_date) ? nContract.start_date : ""}
                                                    onChange={(e) => {
                                                        setNContract({
                                                            ...nContract,
                                                            start_date: e.target.value,
                                                        });
                                                    }}
                                                ></Input>
                                        }
                                        {
                                            (contract) ?
                                                <Input type="date"
                                                    value={(contract.end_date) ? contract.end_date : ""}
                                                    onChange={(e) => {
                                                        updateContract({
                                                            ...contract,
                                                            end_date: e.target.value,
                                                        });
                                                    }}
                                                ></Input>
                                                :
                                                <Input type="date"
                                                    value={(nContract.end_date) ? nContract.end_date : ""}
                                                    onChange={(e) => {
                                                        setNContract({
                                                            ...nContract,
                                                            end_date: e.target.value,
                                                        });
                                                    }}
                                                ></Input>
                                        }
                                    </SimpleGrid>
                                    <GeneralTerms></GeneralTerms>
                                </TabPanel>

                                <NecessityPanel
                                    contract={contract} necessityList={necessityList}
                                    updateNecessityList={updateNecessityList}
                                >
                                </NecessityPanel>

                                <SignaturePanel
                                    currentDate={currentDate}
                                    updateSignatures={updateSignatures}
                                    tenantId={tenant.tenant_id}
                                    contractId={(contract && contract.contract_id) ? contract.contract_id : null}
                                >
                                </SignaturePanel>

                            </TabPanels>
                        </Tabs>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {
                            (contract) ?
                                <Button colorScheme='teal' onClick={handleEditContract}>Edit</Button>
                                :
                                <Button colorScheme='teal' onClick={handleAddContract}>Add</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    );
}

