import {
    Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Button, Input,
    Heading, Text, SimpleGrid,
    Flex, Tabs, TabList,
    TabPanels, Tab, TabPanel,
    useToast, Spacer, Box
} from '@chakra-ui/react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";


import {
    TenantSchema, editContract,
    newContract, ContractSchema,
    NecessitySchema,
    getNecessityList,
    addNecessity,
} from '../../services/tenant-management/TenantServices';
import NecessityTable from './NecessityTable';
import { Parties, GeneralTerms } from './ContractContent';

import {
    useState, useEffect, useRef
} from 'react';
import { format } from 'date-fns';
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
    function handleAddContract() {
        newContract(tenant.tenant_id, nContract.start_date, nContract.end_date).then((response) => {
            if (response === "success") {
                toast({
                    description: "Contract Added",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
            else {
                toast({
                    description: "Failed to add contract",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        });
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
                                    <SimpleGrid columns={4}>
                                        <Heading size="xs">Room Type</Heading>
                                        <Heading size="xs">Room Number</Heading>
                                        <Heading size="xs" onClick={() => {
                                            console.log(contract);
                                        }}>Start Date</Heading>
                                        <Heading size="xs">End Date</Heading>
                                        <Text>-----</Text>
                                        <Text>-----</Text>
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
                                    <Heading size="md">Rent</Heading>
                                    <SimpleGrid columns={2}>
                                        <Heading size="xs">Monthly Rent</Heading>
                                        <Heading size="xs">Next Rent Due</Heading>
                                        <Text>-----</Text>
                                        {
                                            (contract) ?
                                                <Text>02-05-2024</Text>
                                                :
                                                <Text>Rent is due on the 5th day of each month</Text>
                                        }
                                    </SimpleGrid>
                                    {
                                        (contract) ?
                                            null
                                            :
                                            <GeneralTerms></GeneralTerms>
                                    }
                                </TabPanel>

                                <NecessityPanel
                                    contract={contract}
                                >
                                </NecessityPanel>
                                <SignaturePanel
                                    currentDate={currentDate}
                                >
                                </SignaturePanel>

                                {/* <TabPanel>
                                    <Heading size="md">Signature</Heading>
                                    <Text>
                                        By signing below, both parties agree to the terms and conditions of
                                        this Boarding House Rental Agreement.
                                    </Text>
                                    <SimpleGrid columns={2} gap="2">
                                        <Flex gridColumn="1/2" gridRow="1/2" justifyContent="space-between">
                                            <Text>
                                                Landlord Signature Here:
                                            </Text>
                                            <Button size="xs" colorScheme='teal'>
                                                clear
                                            </Button>
                                        </Flex>
                                        <Box gridColumn="1/2">
                                            <ReactSketchCanvas
                                                width="100%"
                                                height="130px"
                                                canvasColor="var(--chakra-colors-brandPallete-text)"
                                                strokeColor="var(--chakra-colors-brandPallete-background)"
                                            />
                                        </Box>
                                        <Text>{currentDate}</Text>
                                        <Flex gridColumn="2/3" gridRow="1/2" justifyContent="space-between">
                                            <Text>
                                                Tenant Signature Here:
                                            </Text>
                                            <Button size="xs" colorScheme='teal'>
                                                clear
                                            </Button>
                                        </Flex>
                                        <Box gridColumn="2/3" gridRow="2/3">
                                            <ReactSketchCanvas
                                                width="100%"
                                                height="130px"
                                                canvasColor="var(--chakra-colors-brandPallete-text)"
                                                strokeColor="var(--chakra-colors-brandPallete-background)"
                                            />
                                        </Box>
                                        <Text>{currentDate}</Text>
                                    </SimpleGrid>
                                </TabPanel> */}
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

interface NecessityPanel {
    contract: ContractSchema | null;
}
function NecessityPanel({ contract }: NecessityPanel) {
    const [inputNecessity, setInputNecessity] = useState<true | false>(false);
    const [necessityList, setNecessityList] = useState<Array<NecessitySchema> | []>([]);
    const [newNecessity, setNewNecessity] = useState<NecessitySchema>({
        necessity_type: "",
        necessity_fee: 0,
    });

    function openInputNecessity(state: boolean) {
        setInputNecessity(!state);
    }

    function updateNewNecessity(newNecessity: NecessitySchema) {
        setNewNecessity(newNecessity);
    }

    useEffect(() => {
        if (contract !== null && contract.contract_id) {
            getNecessityList(contract.contract_id).then((response) => {
                if (response?.data) {
                    setNecessityList(response.data);
                }
            });
        }
    }, [contract]);

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
                            onClick={async () => {
                                openInputNecessity(inputNecessity);
                                if (contract?.contract_id) {
                                    const response = await addNecessity(contract?.contract_id, Number(newNecessity.necessity_fee), newNecessity.necessity_type);
                                    if (response) {
                                        setNecessityList(response.necessities);
                                    }
                                }
                                setNewNecessity({
                                    necessity_type: "",
                                    necessity_fee: 0,
                                });
                            }}
                        >Confirm
                        </Button>
                        :
                        <Button
                            size="xs" colorScheme="teal"
                            onClick={() => {
                                openInputNecessity(inputNecessity);
                            }}
                        >Add
                        </Button>
                }
            </Flex>
            <NecessityTable
                necessityList={necessityList}
                addNecessity={inputNecessity} newNecessity={newNecessity}
                updateNewNecessity={updateNewNecessity}
            >
            </NecessityTable>
        </TabPanel>
    );
}

interface SignaturePanel {
    currentDate: string;
}

function SignaturePanel({ currentDate }: SignaturePanel) {

    const tenantSignatureRef = useRef<ReactSketchCanvasRef>(null);
    const landlordSignatureRef = useRef<ReactSketchCanvasRef>(null);

    function handleTenSigClear() {
        if (tenantSignatureRef && tenantSignatureRef.current) {
            tenantSignatureRef.current.clearCanvas();
        }
    }
    function handleLandSigClear() {
        if (landlordSignatureRef && landlordSignatureRef.current) {
            landlordSignatureRef.current.clearCanvas();
        }
    }

    return (
        <TabPanel display="flex" flexDirection="column" gap="2">
            <Heading size="md">Signature</Heading>
            <Text>
                By signing below, both parties agree to the terms and conditions of
                this Boarding House Rental Agreement.
            </Text>
            <SimpleGrid columns={2} gap="2">
                <Flex gridColumn="1/2" gridRow="1/2" justifyContent="space-between">
                    <Text>
                        Landlord Signature Here:
                    </Text>
                    <Button
                        size="xs" colorScheme='teal'
                        onClick={() => {
                            handleLandSigClear();
                        }}
                    >
                        clear
                    </Button>
                </Flex>
                <Box gridColumn="1/2">
                    <ReactSketchCanvas
                        ref={landlordSignatureRef}
                        width="100%"
                        height="130px"
                        canvasColor="var(--chakra-colors-brandPallete-text)"
                        strokeColor="var(--chakra-colors-brandPallete-background)"
                    />
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
                <Flex gridColumn="2/3" gridRow="1/2" justifyContent="space-between">
                    <Text>
                        Tenant Signature Here:
                    </Text>
                    <Button
                        size="xs" colorScheme='teal'
                        onClick={() => {
                            handleTenSigClear();
                        }}
                    >
                        clear
                    </Button>
                </Flex>
                <Box gridColumn="2/3" gridRow="2/3">
                    <ReactSketchCanvas
                        ref={tenantSignatureRef}
                        width="100%"
                        height="130px"
                        canvasColor="var(--chakra-colors-brandPallete-text)"
                        strokeColor="var(--chakra-colors-brandPallete-background)"
                    />
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
            </SimpleGrid>
        </TabPanel>
    );
}