import {
    Grid, Box, Select,
    Flex, VStack, Heading,
    useDisclosure,

} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RentBill } from "../components/payment-management/RentBill";
import DataTable from "../components/DataTable";
import {
    AssignedTenant, NecessityBill, PaymentCategories, PaymentRatioStatus, RecentPayments, RoomUtilityBill, getAssignedTenants,
    getNecessityBills, getPaymentCategories, getPaymentRatioStatus, getRecentPayments, getRoomUtilityBills
} from "../services/payment-management/paymentServices";

import { NecessitySchema, getNecessityList } from "../services/tenant-management/TenantServices";
import PayBillModal from "../components/payment-management/PayBillModal";
import { MyBarChart, MyPieChart } from "../components/charts";

export interface SelectedBill {
    necessityBill: NecessityBill | null;
    roomUtilityBill: RoomUtilityBill;
}

export default function PaymentManagement() {

    const { isOpen: isOpenPayBill, onOpen: onOpenPayBill, onClose: onCLosePayBill } = useDisclosure();

    const [tenantList, setTenantList] = useState<Array<AssignedTenant> | null>(null);
    const [necessityBills, setNecessityBills] = useState<Array<NecessityBill> | null>(null);
    const [roomUtilityBills, setRoomUtilityBills] = useState<Array<RoomUtilityBill> | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<AssignedTenant | null>(null);
    const [selectedBill, setSelectedBIll] = useState<SelectedBill | null>(null);
    const [paymentCategories, setPaymentCategories] = useState<Array<PaymentCategories>>([]);
    const [paymentRatioStatus, setPaymentRatioStatus] = useState<Array<PaymentRatioStatus>>([]);
    const [recentPayments, setRecentPayments] = useState<Array<RecentPayments>>([]);

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

    function updateSelectedBIll(bill: SelectedBill) {
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

        getPaymentCategories().then((data) => {
            if (data !== "fail") {
                setPaymentCategories(data);
            }
        });

        getPaymentRatioStatus().then((data) => {
            if (data !== "fail") {
                setPaymentRatioStatus(data);
            }
        });

        getRecentPayments().then((data) => {
            if (data !== "fail") {
                setRecentPayments(data);
            }
        });

    }, []);

    const [necessityList, setNecessityList] = useState<Array<NecessitySchema> | null>(null);
    useEffect(() => {
        if (selectedTenant) {
            getNecessityList(selectedTenant.contract_id).then((response) => {
                if (response.data && response.data.length > 0) {
                    setNecessityList(response.data);
                } else {
                    setNecessityList(null);
                }
            });
        }
    }, [selectedTenant]);


    return (
        <Grid
            h="90%" padding="4" as="section" gridTemplateColumns="5fr 2fr" gridTemplateRows="1fr 1fr"
            gap="2" bgColor="brandPallete.background"
        >
            <PayBillModal
                isOpen={isOpenPayBill} onClose={onCLosePayBill}
                selectedBill={selectedBill} necessityList={necessityList}
                selectedTenant={selectedTenant}
                updateRoomUtilityBills={updateRoomUtilityBills}
                updateNecessityBills={updateNecessityBills}
            >
            </PayBillModal>
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
                    overflowY="auto" justifyContent="space-evenly"
                    wrap="wrap" gap="2"
                >
                    {
                        (roomUtilityBills)
                            ?
                            roomUtilityBills.map((roomBill) => {
                                let necessityBill: NecessityBill | null = null;
                                if (necessityBills) {
                                    necessityBill = necessityBills.filter((necessityBill) => {
                                        return necessityBill.bill_due === roomBill.bill_due;
                                    })[0];
                                }
                                return (
                                    <RentBill
                                        key={roomBill.room_utility_bill_id}
                                        onOpen={onOpenPayBill}
                                        roomUtilityBill={roomBill} necessityBill={necessityBill}
                                        necessityCount={(necessityList) ? necessityList.length : 0}
                                        updateSelectedBill={updateSelectedBIll}
                                    />
                                );
                            })
                            :
                            null
                    }
                </Flex>
            </Flex>
            <Box
                gridColumn="1/2" gridRow="2/3" bgColor="brandPallete.text"
                borderRadius="md" padding="2" overflowY="auto" display="flex"
                flexDir="column" gap="2"
            >
                <Heading size="md">
                    Recent Payments
                </Heading>
                <Box>
                    <DataTable
                        data={recentPayments}
                    />
                </Box>
            </Box>
            <VStack
                gridColumn="2/3" gridRow="1/2" boxShadow="md"
                bgColor="brandPallete.text" borderRadius="md" padding="2"
            >
                <Heading size="md">Payment Status</Heading>
                <MyPieChart
                    data={paymentRatioStatus}
                >
                </MyPieChart>
            </VStack>
            <VStack
                gridColumn="2/3" gridRow="2/3" boxShadow="md"
                bgColor="brandPallete.text" borderRadius="md" padding="2"

            >
                <Heading size="md">Payment Categories</Heading>
                <MyBarChart
                    data={paymentCategories}
                >
                </MyBarChart>
            </VStack>
        </Grid >
    );
}