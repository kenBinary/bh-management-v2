import {
    Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent,
    DrawerCloseButton, Button, Input,
    Heading, Text, SimpleGrid,
    Flex
} from '@chakra-ui/react';

import { TenantSchema } from './services/TenantServices';
import DataTable from '../DataTable';
import GeneralTerms from './GeneralTerms';
interface Drawer {
    isOpen: boolean;
    onClose: () => void;
    btnRef: React.MutableRefObject<null | HTMLButtonElement>;
    tenant: TenantSchema;
}
export default function DrawerExample({ isOpen, onClose, btnRef, tenant }: Drawer) {
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
                        <Heading size="md">Parties</Heading>
                        <SimpleGrid columns={2}>
                            <Heading size="xs">Landlord</Heading>
                            <Heading size="xs">Tenant</Heading>
                            <Text>Daniel Kahneman</Text>
                            <Text>{`${tenant.first_name} ${tenant.last_name}`}</Text>
                        </SimpleGrid>
                        <Heading size="md">Premise</Heading>
                        <Text>Planet Vegeta, Universe 7</Text>
                        <Heading size="md">Lease Details</Heading>
                        <SimpleGrid columns={4}>
                            <Heading size="xs">Room Type</Heading>
                            <Heading size="xs">Room Number</Heading>
                            <Heading size="xs">Start Date</Heading>
                            <Heading size="xs">End Date</Heading>
                            <Text>-----</Text>
                            <Text>-----</Text>
                            <Input type="date" value={currentDate} readOnly></Input>
                            <Input type="date"></Input>
                        </SimpleGrid>
                        <Heading size="md">Rent</Heading>
                        <SimpleGrid columns={2}>
                            <Heading size="xs">Monthly Rent</Heading>
                            <Heading size="xs">Rent Due</Heading>
                            <Text>-----</Text>
                            <Text>Rent is due on the 5th day of each month</Text>
                        </SimpleGrid>
                        <Flex>
                            <Heading size="md">Necessities</Heading>
                            <Button size="xs" colorScheme="teal">Add</Button>
                        </Flex>
                        <DataTable></DataTable>
                        <GeneralTerms></GeneralTerms>
                        <Heading size="md">Signature</Heading>
                        <Text>
                            By signing below, both parties agree to the terms and conditions of
                            this Boarding House Rental Agreement.
                        </Text>
                        <SimpleGrid columns={2}>
                            <Text>Landlord Signature Here:</Text>
                            <Input type="date"></Input>
                            <Text>Tenant Signature Here:</Text>
                            <Input type="date"></Input>
                        </SimpleGrid>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='teal'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer >
        </>
    );
}