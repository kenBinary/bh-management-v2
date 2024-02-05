import {
    Flex, Heading, Text,
    Box, Image, Grid, Button,
    useDisclosure,

} from "@chakra-ui/react";
import { LiaCoinsSolid, LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { useRef } from "react";
import ContractDrawer from './ContractDrawer';
import { TenantSchema } from "./services/TenantServices";
interface LeaseDetail {
    tenantDetail: TenantSchema;
}
export default function LeaseDetail({ tenantDetail }: LeaseDetail) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<null | HTMLButtonElement>(null);

    return (
        <Flex as="section" padding="4" boxShadow="md">
            <ContractDrawer
                isOpen={isOpen} onClose={onClose}
                btnRef={btnRef} tenant={tenantDetail}
            ></ContractDrawer>
            <Flex flex="1 0" direction="column" gap="2">
                <Heading size="xs">Current Lease</Heading>
                <Flex gap="8">
                    <Box flex="0 1 20%">
                        <Image
                            borderRadius="sm"
                            boxShadow="md"
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            boxSize="80px"
                        ></Image>
                    </Box>
                    <Flex direction="column" flex="0 1 20%">
                        <Text>Room Number</Text>
                        <Text>3</Text>
                    </Flex>
                    <Grid flex="1 1 25%" gridTemplateColumns="1fr 4fr" gridTemplateRows="1fr 1fr">
                        <Box gridRow="1/3" alignSelf="start">
                            <LiaCoinsSolid size="full"></LiaCoinsSolid>
                        </Box>
                        <Text gridColumn="2/3" gridRow="1/2">Monthly Rent</Text>
                        <Text gridColumn="2/3" gridRow="2/3">2700 php</Text>
                    </Grid>
                </Flex>
                <Flex gap="8">
                    <Flex direction="column" flex="0 1 20%">
                        <Text>Start</Text>
                        <Text>Jan 1,1999</Text>
                    </Flex>
                    <Flex direction="column" flex="0 1 20%">
                        <Text>End</Text>
                        <Text>---</Text>
                    </Flex>
                    <Flex direction="column" flex="0 1 20%" justifyContent="center">
                        <Text>Contract Details</Text>
                        <Button
                            size="md" onClick={onOpen}
                            ref={btnRef} colorScheme="teal"
                        >contract</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flex="1 0" direction="column" gap="2">
                <Heading size="xs">Collection</Heading>
                <Flex gap="4">
                    <LiaFileInvoiceDollarSolid size="40px"></LiaFileInvoiceDollarSolid>
                    <Flex flex="1" flexWrap="wrap" rowGap="2">
                        <Box flex="1 0 50%">
                            <Text>Current Invoices</Text>
                            <Text>500</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text>Total Rent Collected</Text>
                            <Text>600</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text>Past Due Invoices</Text>
                            <Text>2</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text>Other Collected</Text>
                            <Text>300</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text>Total</Text>
                            <Text>10000</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}