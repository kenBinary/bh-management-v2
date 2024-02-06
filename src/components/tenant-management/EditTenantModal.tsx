import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, FormControl,
    Input, NumberInput, NumberInputField,
    FormLabel, useToast,
} from '@chakra-ui/react';

import { useRef } from 'react';
import { TenantSchema, editTenant } from '../../services/tenant-management/TenantServices';
interface EditTenant {
    isOpen: boolean;
    onClose: () => void;
    selectedTenant: TenantSchema;
    updateSelectedTenant: (selectedTenant: TenantSchema) => void;
}

export default function EditTenantModal({ isOpen, onClose, selectedTenant, updateSelectedTenant }: EditTenant) {

    const toast = useToast();


    // used this to get default value of input elements
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const contactRef = useRef<HTMLInputElement | null>(null);

    async function handleEdit() {
        const firstNameInput = firstNameRef.current;
        const lastNameInput = lastNameRef.current;
        const contactInput = contactRef.current;

        if (firstNameInput && lastNameInput && contactInput) {
            const response = await editTenant(selectedTenant.tenant_id, firstNameInput.value, lastNameInput.value, Number(contactInput.value));
            if (response === "fail") {
                toast({
                    description: "Tenant Edit fail",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
            else {
                updateSelectedTenant({
                    ...selectedTenant,
                    ...response,
                });
                toast({
                    description: "Tenant Registration sucess",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        onClose();
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit tenant</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                ref={firstNameRef}
                                defaultValue={selectedTenant.first_name}
                            ></Input>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                ref={lastNameRef}
                                defaultValue={selectedTenant.last_name}
                            ></Input>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <NumberInput
                                defaultValue={selectedTenant.contact_number}

                            >
                                <NumberInputField
                                    ref={contactRef}
                                ></NumberInputField>
                            </NumberInput>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='green' mr={3}
                            onClick={handleEdit}
                        >
                            Edit
                        </Button>
                        <Button colorScheme='red' variant='outline' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </div>
    );
}
