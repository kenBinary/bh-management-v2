import {
    Flex, List, ListItem,
} from "@chakra-ui/react";
import TenantDetail from "../components/tenant-management/TenantDetail";
import LeaseDetail from "../components/tenant-management/LeaseDetail";
import PaymentHistory from "../components/tenant-management/PaymentHistory";
import NecessityList from "../components/tenant-management/NecessityList";
export default function TenantManagement() {
    return (
        <Flex height="90%" padding="4" gap="2">
            <List spacing="0.5" flex="1 0 20%" height="full" overflowY="auto" >
                <ListItem border="2px solid" borderColor="blue.100" fontSize="xl" padding="2">
                    Jhone Doe
                </ListItem>
            </List>
            <Flex flex="4 0 80%" as="main" direction="column" overflowY="auto">
                <TenantDetail></TenantDetail>
                <LeaseDetail></LeaseDetail>
                <PaymentHistory></PaymentHistory>
                <NecessityList></NecessityList>
            </Flex>
        </Flex>
    );
}