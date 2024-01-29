import {
    Grid, Box, Select,
    Flex, VStack, Heading
} from "@chakra-ui/react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import BillCard from "../components/payment-management/BillCard";
import DataTable from "../components/DataTable";
export default function PaymentManagement() {
    return (
        <Grid h="90%" padding="4" as="section" gridTemplateColumns="5fr 2fr" gridTemplateRows="3fr 2fr" gap="2">
            <Flex boxShadow="md" gridColumn="1/2" gridRow="1/2" minHeight="0" direction="column">
                <Select width="30%" icon={<MdOutlineArrowDropDownCircle />}>
                    <option>Jhon Doe</option>
                    <option>Cats in the cradle</option>
                    <option>Little boy blue</option>
                    <option>Hello darkness my old friend</option>
                </Select>
                <Flex
                    paddingBottom="2" paddingTop="2"
                    overflowY="scroll" justifyContent="space-evenly"
                    wrap="wrap" gap="2"
                >
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                    <BillCard></BillCard>
                </Flex>
            </Flex>
            <Box gridColumn="1/2" gridRow="2/3">
                <DataTable></DataTable>
            </Box>
            <VStack gridColumn="2/3" gridRow="1/2" boxShadow="md">
                <Heading size="md">Payment Status</Heading>
            </VStack>
            <VStack gridColumn="2/3" gridRow="2/3" boxShadow="md">
                <Heading size="md">Payment Categories</Heading>
            </VStack>
        </Grid >
    );
}