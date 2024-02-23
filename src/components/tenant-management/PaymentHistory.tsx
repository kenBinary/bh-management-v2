import {
    Box, Heading
} from "@chakra-ui/react";
import DataTable from "../DataTable";
export default function PaymentHistory() {
    return (
        <Box as="section" overflowY="auto">
            <Heading
                size="sm" padding="2" color="brandPallete.background"
            >
                Payment History
            </Heading>
            <Box>
                <DataTable></DataTable>
            </Box>
        </Box>
    );
}