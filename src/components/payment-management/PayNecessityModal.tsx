import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Checkbox, CheckboxGroup, Stack
} from '@chakra-ui/react';
import {
    NecessityBill, AssignedTenant,
} from '../../services/payment-management/paymentServices';

interface PayNecessityModal {
    isOpen: boolean;
    onClose: () => void;
    selectedBill: NecessityBill | null;
    selectedTenant: AssignedTenant | null;
}

export default function PayNecessityModal({
    isOpen, onClose, selectedBill, selectedTenant,
}: PayNecessityModal) {

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pay Necessities</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md'>Confirm Payment?</Heading>
                    <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                            <Checkbox value='naruto'>Naruto</Checkbox>
                            <Checkbox value='sasuke'>Sasuke</Checkbox>
                            <Checkbox value='kakashi'>Kakashi</Checkbox>
                        </Stack>
                    </CheckboxGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='teal' mr={3}
                        onClick={() => {
                            console.log(selectedTenant);
                            console.log(selectedBill);
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