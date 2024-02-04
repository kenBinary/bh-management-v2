import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, FormControl,
    Input, NumberInput, NumberInputField,
    FormLabel, useToast,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { TenantSchema } from './services/TenantServices';
import { editTenant } from './services/TenantServices';

interface EditTenant {
    isOpen: boolean;
    onClose: () => void;
    tenantDetails: TenantSchema;
}
interface NewTenant {
    first_name: string;
    last_name: string;
    contact_number: number;
}
export default function EditTenantModal({ isOpen, onClose, tenantDetails }: EditTenant) {

    const toast = useToast();

    const [newDetail, setNewDetail] = useState<NewTenant>({
        first_name: "",
        last_name: "",
        contact_number: 0,
    });
    // #TODO try to consolidate update setters to one setter
    function updateFirstName(firstName: string): void {
        setNewDetail({
            ...newDetail,
            first_name: firstName,
        });
    }
    function updateLastName(lastName: string): void {
        setNewDetail({
            ...newDetail,
            last_name: lastName,
        });
    }
    function updateContact(contact: number): void {
        setNewDetail({
            ...newDetail,
            contact_number: contact,
        });
    }

    // used this to get default value of input elements
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const contactRef = useRef<HTMLInputElement | null>(null);

    async function handleEdit(): Promise<"fail" | "success"> {
        const firstNameInput = firstNameRef.current;
        const lastNameInput = lastNameRef.current;
        const contactInput = contactRef.current;
        if (firstNameInput && lastNameInput && contactInput) {
            const response = await editTenant(tenantDetails.tenant_id, firstNameInput.value, lastNameInput.value, Number(contactInput.value));
            return response;
        }
        return "fail";
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
                                defaultValue={tenantDetails.first_name}
                                onChange={(e) => {
                                    updateFirstName(e.target.value);
                                }}
                            ></Input>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                ref={lastNameRef}
                                defaultValue={tenantDetails.last_name}
                                onChange={(e) => {
                                    updateLastName(e.target.value);
                                }}
                            ></Input>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <NumberInput
                                defaultValue={tenantDetails.contact_number}

                            >
                                <NumberInputField
                                    ref={contactRef}
                                    onChange={(e) => {
                                        updateContact(Number(e.target.value));
                                    }}
                                ></NumberInputField>
                            </NumberInput>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='green' mr={3}
                            onClick={async () => {
                                const status = await handleEdit();
                                if (status === "fail") {
                                    toast({
                                        description: "Tenant Edit fail",
                                        status: 'error',
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                }
                                else {
                                    toast({
                                        description: "Tenant Registration sucess",
                                        status: 'success',
                                        duration: 5000,
                                        isClosable: true,
                                    });
                                }
                                onClose();
                            }}
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