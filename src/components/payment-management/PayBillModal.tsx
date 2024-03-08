import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Table,
    Thead, Tbody, Tfoot,
    Tr, Th, Td, TableContainer,
} from '@chakra-ui/react';
import { SelectedBill } from '../../pages/PaymentManagement';
import { NecessitySchema } from '../../services/tenant-management/TenantServices';
import {
    AssignedTenant, payRoomUtilityBills, payNecessityBill, RoomUtilityBill,
    NecessityBill,
} from '../../services/payment-management/paymentServices';
import { format } from "date-fns";

import { useEffect, useState } from 'react';
interface PayBillModal {
    isOpen: boolean;
    onClose: () => void;
    selectedBill: SelectedBill | null;
    necessityList: Array<NecessitySchema> | null;
    selectedTenant: AssignedTenant | null;
    updateRoomUtilityBills: (roomUtilityBills: Array<RoomUtilityBill> | null) => void;
    updateNecessityBills: (necessityBills: Array<NecessityBill> | null) => void;
    prevUtilityBill: Array<RoomUtilityBill> | null;
    isPayable: boolean;
}
interface SelectedNecessities {
    [key: string]: boolean;
}

export default function PayBillModal({
    isOpen, onClose, selectedBill,
    necessityList, selectedTenant,
    updateRoomUtilityBills, updateNecessityBills,
    prevUtilityBill, isPayable
}: PayBillModal) {

    const [total, setTotal] = useState<number>(0);

    const [selectedNecessities, setSelectedNecessities] = useState<SelectedNecessities>({});

    function updateSelectedNecessities(selectedNecessities: SelectedNecessities) {
        setSelectedNecessities(selectedNecessities);
    }


    let roomBaseTotal = 0;
    if (selectedBill) {
        const doubleRoom = [14, 15, 16, 17];
        const isDoubleRoom = doubleRoom.includes(selectedBill.roomUtilityBill.room_number);
        roomBaseTotal = (isDoubleRoom) ? 3700 : 2900;
    }

    useEffect(() => {
        let total = 0;
        if (selectedBill) {
            if (selectedBill.necessityBill) {
                total = selectedBill.necessityBill.total_bill + roomBaseTotal;
            } else {
                total = roomBaseTotal;
            }
            if (selectedBill.roomUtilityBill && selectedBill.roomUtilityBill.interest) {
                total += selectedBill.roomUtilityBill.interest;
            }
            setTotal(total);
        }
        if (necessityList) {
            const selectedNecessities: SelectedNecessities = {};
            necessityList.forEach((necessity) => {
                if (necessity.necessity_id) {
                    selectedNecessities[necessity.necessity_id] = true;
                }
            });
            setSelectedNecessities(selectedNecessities);
        }
    }, [selectedBill, necessityList, prevUtilityBill, roomBaseTotal]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="2xl" fontWeight="bold" color="brandPallete.background">
                    {
                        (selectedBill)
                            ?
                            `Bill For ${format(new Date(selectedBill.roomUtilityBill.bill_due), "MMMM")}`
                            :
                            null
                    }
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <TableContainer>
                        <Table
                            variant='striped' colorScheme='teal' color="brandPallete.background"
                        >
                            <Thead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th>Description</Th>
                                    <Th isNumeric>Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    (selectedBill && selectedBill.roomUtilityBill)
                                        ?
                                        <Tr>
                                            <Td>Room</Td>
                                            <Td>
                                                {selectedBill.roomUtilityBill.room_number}
                                            </Td>
                                            <Td isNumeric>
                                                {roomBaseTotal}
                                            </Td>
                                        </Tr>
                                        :
                                        null
                                }
                                {
                                    (prevUtilityBill && prevUtilityBill.length > 0)
                                        ?
                                        prevUtilityBill.map((bill, index) => {
                                            return (
                                                <Tr key={index}>
                                                    <Th>{`${format(new Date(bill.bill_due), "MMMM")}`} Bill Carryover</Th>
                                                    <Th>
                                                        Overdue Bill
                                                    </Th>
                                                    <Th isNumeric>
                                                        {roomBaseTotal}
                                                    </Th>
                                                </Tr>
                                            );
                                        })
                                        :
                                        null
                                }
                                {
                                    (prevUtilityBill && prevUtilityBill.length > 0)
                                        ?
                                        <Tr>
                                            <Th>Interest</Th>
                                            <Th>3%</Th>
                                            <Th isNumeric>
                                                {
                                                    (selectedBill && selectedBill.roomUtilityBill)
                                                        ?
                                                        selectedBill.roomUtilityBill.interest
                                                        :
                                                        0
                                                }
                                            </Th>
                                        </Tr>
                                        :
                                        null
                                }
                                {
                                    (necessityList && necessityList.length > 0)
                                        ?
                                        necessityList.map((necessity) => {
                                            const necessityId = necessity.necessity_id;
                                            const strikeThrough = { "textDecoration": "line-through" };
                                            return (
                                                <Tr _hover={strikeThrough} cursor="pointer"
                                                    data-Value={necessityId}
                                                    textDecoration={
                                                        (necessityId && necessityId in selectedNecessities && selectedNecessities[necessityId])
                                                            ?
                                                            undefined
                                                            :
                                                            "line-through"
                                                    }
                                                    onClick={(e) => {
                                                        const rowData = e.currentTarget.getAttribute("data-Value");
                                                        if (rowData) {
                                                            if (selectedNecessities[rowData]) {
                                                                setTotal(total - necessity.necessity_fee);
                                                            } else {
                                                                setTotal(total + necessity.necessity_fee);
                                                            }
                                                            updateSelectedNecessities({
                                                                ...selectedNecessities,
                                                                [rowData]: !selectedNecessities[rowData],
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <Td>
                                                        necessity
                                                    </Td>
                                                    <Td>{necessity.necessity_type}</Td>
                                                    <Td isNumeric>
                                                        {necessity.necessity_fee}
                                                    </Td>
                                                </Tr>
                                            );
                                        })
                                        :
                                        null
                                }
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th></Th>
                                    <Th>Grand Total</Th>
                                    <Th isNumeric>
                                        {
                                            (prevUtilityBill && prevUtilityBill.length > 0)
                                                ?
                                                total + prevUtilityBill.reduce((accumulator, currentValue) => {
                                                    return accumulator + currentValue.total_bill;
                                                }, 0)
                                                :
                                                total
                                        }
                                    </Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </ModalBody>

                <ModalFooter>
                    {
                        (isPayable)
                            ?
                            <Button
                                colorScheme='teal' mr={3}
                                onClick={() => {
                                    if (selectedBill && selectedTenant) {
                                        const roomBill = selectedBill.roomUtilityBill;
                                        const necessityBill = selectedBill.necessityBill;

                                        if (prevUtilityBill && prevUtilityBill.length > 0) {
                                            prevUtilityBill.forEach((bill) => {
                                                payRoomUtilityBills(
                                                    bill.room_utility_bill_id, bill.room_number, bill.bill_due,
                                                    selectedTenant.contract_id,
                                                );
                                            });
                                            payRoomUtilityBills(
                                                roomBill.room_utility_bill_id, roomBill.room_number, roomBill.bill_due,
                                                selectedTenant.contract_id,
                                            ).then((response) => {
                                                if (response !== "fail" && response.data.length > 0) {
                                                    const lastElement = response.data.pop();
                                                    if (lastElement) {
                                                        updateRoomUtilityBills([lastElement]);
                                                    } else {
                                                        updateRoomUtilityBills(null);
                                                    }
                                                } else {
                                                    updateRoomUtilityBills(null);
                                                }
                                            });
                                        } else {
                                            payRoomUtilityBills(
                                                roomBill.room_utility_bill_id, roomBill.room_number, roomBill.bill_due,
                                                selectedTenant.contract_id,
                                            ).then((response) => {
                                                if (response !== "fail" && response.data.length > 0) {
                                                    console.log(response.data);
                                                    updateRoomUtilityBills(response.data);
                                                } else {
                                                    updateRoomUtilityBills(null);
                                                }
                                            });
                                        }


                                        if (necessityBill) {
                                            payNecessityBill(
                                                necessityBill.necessity_bill_id, selectedTenant.contract_id,
                                                selectedNecessities, necessityBill.bill_due
                                            ).then((response) => {
                                                if (response !== "fail" && response.data.length > 0) {
                                                    updateNecessityBills(response.data);
                                                } else {
                                                    updateNecessityBills(null);
                                                }
                                            });
                                        }
                                    }
                                    onClose();
                                }}
                            >
                                Pay
                            </Button>
                            :
                            null
                    }
                    <Button colorScheme='red' variant='outline'
                        onClick={() => {
                            onClose();
                        }}
                    >
                        close
                    </Button>
                </ModalFooter>
            </ModalContent >
        </Modal >
    );
}