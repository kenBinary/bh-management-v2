import {
    Grid, Box, Select,
    Flex, VStack, Heading,
    useDisclosure,

} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { NecessityBillCard, RoomBillCard } from "../components/payment-management/BillCards";
import DataTable from "../components/DataTable";
import PayRoomModal from "../components/payment-management/PayRoomModal";
import PayNecessityModal from "../components/payment-management/PayNecessityModal";
import {
    AssignedTenant, NecessityBill, RoomUtilityBill, getAssignedTenants,
    getNecessityBills, getRoomUtilityBills
} from "../services/payment-management/paymentServices";
import {
    isNecessityBill, isRoomUtilityBill,
} from "../utils/typeGuards";

export default function PaymentManagement() {

    const { isOpen: isOpenPayRoom, onOpen: onOpenPayRoom, onClose: onClosePayRoom } = useDisclosure();
    const { isOpen: isOpenPayNecessity, onOpen: onOpenPayNecessity, onClose: onClosePayNecessity } = useDisclosure();

    const [tenantList, setTenantList] = useState<Array<AssignedTenant> | null>(null);
    const [necessityBills, setNecessityBills] = useState<Array<NecessityBill> | null>(null);
    const [roomUtilityBills, setRoomUtilityBills] = useState<Array<RoomUtilityBill> | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<AssignedTenant | null>(null);
    const [selectedBill, setSelectedBIll] = useState<NecessityBill | RoomUtilityBill | null>(null);

    function updateSelectedTenant(tenant: AssignedTenant) {
        setSelectedTenant(tenant);
    }

    function handleChangeTenant(tenant: AssignedTenant) {
        updateSelectedTenant(tenant);
        getRoomUtilityBills(tenant.contract_id).then((response) => {
            if (response !== "fail" && response.data.length > 0) {
                updateRoomUtilityBills(response.data);
            } else {
                updateRoomUtilityBills(null);
            }
        });
        getNecessityBills(tenant.contract_id).then((response) => {
            if (response !== "fail" && response.data.length > 0) {
                updateNecessityBills(response.data);
            } else {
                updateNecessityBills(null);
            }
        });

    }
    function updateNecessityBills(necessityBills: Array<NecessityBill> | null) {
        setNecessityBills(necessityBills);
    }
    function updateRoomUtilityBills(roomUtilityBills: Array<RoomUtilityBill> | null) {
        setRoomUtilityBills(roomUtilityBills);
    }

    function updateSelectedBIll(bill: RoomUtilityBill | NecessityBill) {
        setSelectedBIll(bill);
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
        <Grid
            h="90%" padding="4" as="section" gridTemplateColumns="5fr 2fr" gridTemplateRows="1fr 1fr"
            gap="2" bgColor="brandPallete.background"
        >
            <PayRoomModal
                isOpen={isOpenPayRoom} onClose={onClosePayRoom}
                selectedBill={(selectedBill && isRoomUtilityBill(selectedBill)) ? selectedBill : null}
                selectedTenant={selectedTenant} updateRoomUtilityBills={updateRoomUtilityBills}
            />
            <PayNecessityModal
                isOpen={isOpenPayNecessity} onClose={onClosePayNecessity}
                selectedBill={(selectedBill && isNecessityBill(selectedBill)) ? selectedBill : null}
                selectedTenant={selectedTenant} updateNecessityBills={updateNecessityBills}
            />
            <Flex
                boxShadow="md" gridColumn="1/2" gridRow="1/2" minHeight="0" direction="column"
                borderRadius="md" bgColor="brandPallete.text" padding="2"
            >
                <Select
                    width="30%" icon={<MdOutlineArrowDropDownCircle />}
                    borderColor="brandPallete.secondary" fontSize="lg" fontWeight="medium"
                    onChange={(e) => {
                        const tenant: AssignedTenant = JSON.parse(e.target.value);
                        handleChangeTenant(tenant);
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
                                        key={bill.necessity_bill_id}
                                        bill={bill} updateSelectedBill={updateSelectedBIll}
                                        onOpen={onOpenPayNecessity}
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
                                        key={bill.room_utility_bill_id}
                                        updateSelectedBill={updateSelectedBIll}
                                        bill={bill} onOpen={onOpenPayRoom}
                                    >
                                    </RoomBillCard>
                                );
                            })
                            :
                            null
                    }
                </Flex>
            </Flex>
            <Box
                gridColumn="1/2" gridRow="2/3" bgColor="brandPallete.text"
                borderRadius="md" padding="2"
            >
                <DataTable></DataTable>
            </Box>
            <VStack
                gridColumn="2/3" gridRow="1/2" boxShadow="md"
                bgColor="brandPallete.text" borderRadius="md" padding="2"
            >
                <Heading size="md">Payment Status</Heading>
            </VStack>
            <VStack
                gridColumn="2/3" gridRow="2/3" boxShadow="md"
                bgColor="brandPallete.text" borderRadius="md" padding="2"

            >
                <Heading size="md">Payment Categories</Heading>
            </VStack>
        </Grid >
    );
}