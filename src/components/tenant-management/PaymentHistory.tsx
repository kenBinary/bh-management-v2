import {
    Box, Heading
} from "@chakra-ui/react";
import DataTable from "../DataTable";
export default function PaymentHistory() {
    return (
        <Box as="section">
            <Heading size="lg" padding="2">Payment History</Heading>
            <DataTable></DataTable>
        </Box>
    );
}