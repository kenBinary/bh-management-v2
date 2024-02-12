import {
    Flex, Heading, Text,
    Box, Image, Grid, Button,
    useDisclosure, SimpleGrid

} from "@chakra-ui/react";
import { LiaCoinsSolid, LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { useRef, useEffect, useState } from "react";
import { format } from "date-fns";
import ContractDrawer from "./ContractDrawer";
import {
    TenantSchema, ContractSchema, getContract, getLeaseDetails, getCollectionDetails,
    LeaseDetails, CollectionDetails,
} from "../../services/tenant-management/TenantServices";
interface LeaseDetail {
    selectedTenant: TenantSchema;
}
export default function LeaseDetail({ selectedTenant }: LeaseDetail) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<null | HTMLButtonElement>(null);

    const [LeaseDetails, setLeaseDetails] = useState<LeaseDetails>({
        room_number: 0,
        total_bill: 0,
        start_date: "",
        end_date: null,
    });
    const [collectionDetails, setCollectionDetails] = useState<CollectionDetails>({
        currentInvoices: 0,
        pastDueInvoices: 0,
        totalRent: 0,
        totalNecessity: 0,
        total: 0,
    });

    const [contract, setContract] = useState<ContractSchema | null>(null);

    function updateContract(contract: ContractSchema) {
        setContract(contract);
    }

    useEffect(() => {
        if (selectedTenant.tenant_id !== "") {
            getContract(selectedTenant.tenant_id).then((data) => {
                if (data === "fail") {
                    setContract(null);
                } else {
                    setContract(data[0]);
                }
            });
            getLeaseDetails(selectedTenant.tenant_id).then((response) => {
                if (response !== "fail" && response.data.length > 0) {
                    setLeaseDetails(response.data[0]);
                } else {
                    setLeaseDetails({
                        room_number: 0,
                        total_bill: 0,
                        start_date: "",
                        end_date: null,
                    });
                }
            });
            getCollectionDetails(selectedTenant.tenant_id).then((response) => {
                if (response !== "fail") {
                    setCollectionDetails(response.collectionDetails);
                }
            });
        }
    }, [selectedTenant.tenant_id]);

    return (
        <Flex as="section" padding="4" boxShadow="md">
            <ContractDrawer
                isOpen={isOpen} onClose={onClose}
                btnRef={btnRef} tenant={selectedTenant}
                contract={contract} updateContract={updateContract}
            ></ContractDrawer>
            <Flex flex="1 0" direction="column" gap="2">
                <Heading size="xs" color="brandPallete.background">
                    Current Lease
                </Heading>
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
                        <Text color="brandPallete.background">
                            Room Number
                        </Text>
                        <Text color="brandPallete.background">
                            {(LeaseDetails.room_number) ? LeaseDetails.room_number : "-----"}
                        </Text>
                    </Flex>
                    <Grid flex="1 1 25%" gridTemplateColumns="1fr 4fr" gridTemplateRows="1fr 1fr">
                        <Box gridRow="1/3" alignSelf="start">
                            <LiaCoinsSolid size="100%" color="var(--chakra-colors-brandPallete-background)"></LiaCoinsSolid>
                        </Box>
                        <Text
                            gridColumn="2/3" gridRow="1/2" alignSelf="end" color="brandPallete.background"
                        >
                            Monthly Rent
                        </Text>
                        <Text
                            gridColumn="2/3" gridRow="2/3" alignSelf="start" color="brandPallete.background"
                        >
                            {(LeaseDetails.total_bill) ? LeaseDetails.total_bill : "-----"}
                        </Text>
                    </Grid>
                </Flex>
                <Flex gap="8">
                    <Flex direction="column" flex="0 1 20%">
                        <Text color="brandPallete.background">
                            Start
                        </Text>
                        {
                            (LeaseDetails.start_date) ?
                                <Text color="brandPallete.background">
                                    {format(new Date(LeaseDetails.start_date), "MMM d, yyyy")}
                                </Text>
                                :
                                <Text color="brandPallete.background">-----</Text>
                        }
                    </Flex>
                    <Flex direction="column" flex="0 1 20%">
                        <Text color="brandPallete.background">End</Text>
                        {
                            (LeaseDetails.end_date) ?
                                <Text color="brandPallete.background">
                                    {format(new Date(LeaseDetails.end_date), "MMM d, yyyy")}
                                </Text>
                                :
                                <Text color="brandPallete.background">-----</Text>
                        }
                    </Flex>
                    <Flex direction="column" flex="0 1 20%" justifyContent="center">
                        <Text color="brandPallete.background">Contract Details</Text>
                        <Button
                            size="md" onClick={onOpen}
                            ref={btnRef} colorScheme="teal"
                        >contract</Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex flex="1 0" direction="column" gap="2">
                <Heading size="xs" color="brandPallete.background">
                    Collection
                </Heading>
                <Flex gap="4">
                    <LiaFileInvoiceDollarSolid size="40px"></LiaFileInvoiceDollarSolid>

                    <SimpleGrid flex="1" columns={2} rowGap="2">
                        <Box flex="1 0 50%">
                            <Text color="brandPallete.background">Current Invoices</Text>
                            <Text color="brandPallete.background">{collectionDetails.currentInvoices}</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text color="brandPallete.background">Total Room Rent Collected</Text>
                            <Text color="brandPallete.background">{collectionDetails.totalRent}</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text color="brandPallete.background">Past Due Invoices</Text>
                            <Text color="brandPallete.background">{collectionDetails.pastDueInvoices}</Text>
                        </Box>
                        <Box flex="1 0 50%">
                            <Text color="brandPallete.background">Other Collected</Text>
                            <Text color="brandPallete.background">{collectionDetails.totalNecessity}</Text>
                        </Box>
                        <Box flex="1 0 50%" gridColumn="2/3">
                            <Text color="brandPallete.background">Total</Text>
                            <Text color="brandPallete.background">{collectionDetails.total}</Text>
                        </Box>
                    </SimpleGrid>
                </Flex>
            </Flex>
        </Flex >
    );
}