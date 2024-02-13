import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
} from '@chakra-ui/react';
import {
    AssignedTenant,
    RoomUtilityBill,
    payRoomUtilityBills,
} from '../../services/payment-management/paymentServices';


interface PayRoomModal {
    isOpen: boolean;
    onClose: () => void;
    updateRoomUtilityBills: (roomUtilityBills: Array<RoomUtilityBill> | null) => void;
    selectedBill: RoomUtilityBill | null;
    selectedTenant: AssignedTenant | null;
}

export default function PayRoomModal({
    isOpen, onClose, selectedBill, selectedTenant,
    updateRoomUtilityBills,
}: PayRoomModal) {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pay Room</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md'>Confirm Payment?</Heading>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='teal' mr={3}
                        onClick={() => {
                            if (selectedBill && selectedTenant) {
                                payRoomUtilityBills(
                                    selectedBill.room_utility_bill_id, selectedBill.room_number, selectedBill.bill_due,
                                    selectedTenant.contract_id,
                                ).then((response) => {
                                    if (response !== "fail" && response.data.length > 0) {
                                        updateRoomUtilityBills(response.data);
                                    } else {
                                        updateRoomUtilityBills(null);
                                    }
                                });
                            }
                            onClose();
                        }}
                    >
                        Pay
                    </Button>
                    <Button colorScheme='red' variant='outline'
                        onClick={() => {
                            onClose();
                        }}
                    >
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}