import {
    Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Button, Input,
    Heading, Text, SimpleGrid,
    Flex, Tabs, TabList,
    TabPanels, Tab, TabPanel
} from '@chakra-ui/react';

import { TenantSchema } from './services/TenantServices';
import DataTable from '../DataTable';
import { Parties, GeneralTerms } from './ContractContent';

import { ContractSchema } from './services/TenantServices';
interface Drawer {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<null | HTMLButtonElement>;
    tenant: TenantSchema;
    contract: null | ContractSchema;
}

export default function ContractDrawer({ isOpen, onClose, btnRef, tenant, contract }: Drawer) {
    const currentDate: string = new Date().toISOString().slice(0, 10);
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

                    <DrawerBody overflowY="auto">
                        <Tabs variant='soft-rounded' colorScheme='teal'>
                            <TabList position="sticky">
                                <Tab>Lease Details</Tab>
                                <Tab>Necessity</Tab>
                                <Tab>Signature</Tab>
                            </TabList>
                            <TabPanels>

                                <TabPanel>
                                    <Parties
                                        fullName={`${tenant.first_name} ${tenant.last_name}`}
                                    ></Parties>
                                    <SimpleGrid columns={4}>
                                        <Heading size="xs">Room Type</Heading>
                                        <Heading size="xs">Room Number</Heading>
                                        <Heading size="xs">Start Date</Heading>
                                        <Heading size="xs">End Date</Heading>
                                        <Text>-----</Text>
                                        <Text>-----</Text>
                                        {
                                            (contract) ?
                                                <Text>02-05-2024</Text>
                                                :
                                                <Input type="date" value={currentDate} readOnly></Input>
                                        }
                                        <Input type="date"></Input>
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

                                <TabPanel>
                                    <Flex>
                                        <Heading size="md">Necessities</Heading>
                                        <Button size="xs" colorScheme="teal">Add</Button>
                                    </Flex>
                                    <DataTable></DataTable>
                                </TabPanel>

                                <TabPanel>
                                    <Heading size="md">Signature</Heading>
                                    <Text>
                                        By signing below, both parties agree to the terms and conditions of
                                        this Boarding House Rental Agreement.
                                    </Text>
                                    <SimpleGrid columns={2}>
                                        <Text>Landlord Signature Here:</Text>
                                        <Text>{currentDate}</Text>
                                        <Text>Tenant Signature Here:</Text>
                                        <Text>{currentDate}</Text>
                                    </SimpleGrid>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        {
                            (contract) ?
                                <Button colorScheme='teal'>Edit</Button>
                                :
                                <Button colorScheme='teal'>Add</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    );
}