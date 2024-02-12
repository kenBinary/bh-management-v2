import {
    Grid, Box, Select,
    Flex, VStack, Heading
} from "@chakra-ui/react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { NecessityBillCard, RoomBillCard } from "../components/payment-management/BillCards";
import DataTable from "../components/DataTable";
import {
    AssignedTenant, NecessityBill, RoomUtilityBill, getAssignedTenants,
    getNecessityBills, getRoomUtilityBills
} from "../services/payment-management/paymentServices";
import { useEffect, useState } from "react";

export default function PaymentManagement() {

    const [tenantList, setTenantList] = useState<Array<AssignedTenant> | null>(null);
    const [necessityBills, setNecessityBills] = useState<Array<NecessityBill> | null>(null);
    const [roomUtilityBills, setRoomUtilityBills] = useState<Array<RoomUtilityBill> | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<AssignedTenant | null>(null);

    function updateSelectedTenant(tenant: AssignedTenant) {
        setSelectedTenant(tenant);
    }

    function updateNecessityBills(contractId: string) {
        getNecessityBills(contractId).then((response) => {
            if (response !== "fail" && response.data.length > 0) {
                setNecessityBills(response.data);
            } else {
                setNecessityBills(null);
            }
        });
    }

    function updateRoomUtilityBills(contractId: string) {
        getRoomUtilityBills(contractId).then((response) => {
            if (response !== "fail" && response.data.length > 0) {
                setRoomUtilityBills(response.data);
            } else {
                setRoomUtilityBills(null);
            }
        });
    }

    useEffect(() => {
        getAssignedTenants().then((response) => {
            if (response !== "fail" && response.assignedTenants.length > 0) {
                setTenantList(response.assignedTenants);
                const selectedTenant = response.assignedTenants[0];
                setSelectedTenant(selectedTenant);
                return Promise.all([getNecessityBills(selectedTenant.contract_id), getRoomUtilityBills(selectedTenant.contract_id)]);
            }
        }).then((response) => {
            if (response && response[0] !== "fail" && response[0].data.length > 0) {
                setNecessityBills(response[0].data);
            }
            if (response && response[1] !== "fail" && response[1].data.length > 0) {
                setRoomUtilityBills(response[1].data);
            }
        });

    }, []);

    return (
        <Grid h="90%" padding="4" as="section" gridTemplateColumns="5fr 2fr" gridTemplateRows="3fr 2fr" gap="2">
            <Flex boxShadow="md" gridColumn="1/2" gridRow="1/2" minHeight="0" direction="column">
                <Select
                    width="30%" icon={<MdOutlineArrowDropDownCircle />}
                    onChange={(e) => {
                        const tenant: AssignedTenant = JSON.parse(e.target.value);
                        updateSelectedTenant(tenant);
                        updateNecessityBills(tenant.contract_id);
                        updateRoomUtilityBills(tenant.contract_id);
                    }}
                >
                    {
                        (tenantList)
                            ?
                            tenantList.map((tenant) => {
                                return (
                                    <option
                                        key={tenant.tenant_id} value={JSON.stringify(tenant)}
                                    >
                                        {`${tenant.first_name} ${tenant.last_name}`}
                                    </option>
                                );
                            })
                            :
                            null
                    }
                </Select>
                <Flex
                    paddingBottom="2" paddingTop="2"
                    overflowY="scroll" justifyContent="space-evenly"
                    wrap="wrap" gap="2"
                >
                    {
                        (necessityBills)
                            ?
                            necessityBills.map((bill) => {
                                return (
                                    <NecessityBillCard
                                        bill={bill}
                                    >
                                    </NecessityBillCard>
                                );
                            })
                            :
                            null
                    }
                    {
                        (roomUtilityBills)
                            ?
                            roomUtilityBills.map((bill) => {
                                return (
                                    <RoomBillCard
                                        bill={bill}
                                    >
                                    </RoomBillCard>
                                );
                            })
                            :
                            null
                    }
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