import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
} from '@chakra-ui/react';
import { RoomUtilityBill } from '../../services/payment-management/paymentServices';


interface PayRoomModal {
    isOpen: boolean;
    onClose: () => void;
    selectedBill: RoomUtilityBill | null;
}

export default function PayRoomModal({ isOpen, onClose, selectedBill }: PayRoomModal) {

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