import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, FormControl,
    Input, NumberInput, NumberInputField,
    FormLabel, useToast
} from '@chakra-ui/react';
import { useState } from 'react';

import { addTenant, TenantDetails } from './services/TenantServices';

interface AddTenant {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTenantModal({ isOpen, onClose }: AddTenant) {

    const toast = useToast();

    const [tenantDetails, setTenantDetails] = useState<TenantDetails>({
        first_name: '',
        last_name: '',
        contact_number: 0,
    });

    function firstNameInput(value: React.ChangeEvent<HTMLInputElement>) {
        setTenantDetails({
            ...tenantDetails,
            first_name: value.target.value,
        });
    }
    function lastNameInput(value: React.ChangeEvent<HTMLInputElement>) {
        setTenantDetails({
            ...tenantDetails,
            last_name: value.target.value,
        });
    }
    function contactInput(value: React.ChangeEvent<HTMLInputElement>) {
        setTenantDetails({
            ...tenantDetails,
            contact_number: Number(value.target.value),
        });
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new tenant</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>

                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                                placeholder="e.g. Jhon"
                                value={tenantDetails.first_name}
                                onChange={firstNameInput}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="e.g. Jhon"
                                value={tenantDetails.last_name}
                                onChange={lastNameInput}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <NumberInput>
                                <NumberInputField
                                    placeholder='e.g. 0927323578'
                                    value={tenantDetails.contact_number}
                                    onChange={contactInput}
                                />
                            </NumberInput>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={async () => {
                            const sucess = await addTenant(tenantDetails);
                            if (sucess === "success") {
                                toast({
                                    description: "Tenant Registration success",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                });
                            } else {
                                toast({
                                    description: "Tenant Registration fail",
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                });
                            }
                            onClose();
                        }}>
                            Add
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