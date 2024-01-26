import {
    Box, Heading
} from "@chakra-ui/react";
import DataTable from "../DataTable";
export default function NecessityList() {
    return (
        <Box as="section">
            <Heading size="lg" padding="2">Necessity List</Heading>
            <DataTable></DataTable>
        </Box>
    );
}