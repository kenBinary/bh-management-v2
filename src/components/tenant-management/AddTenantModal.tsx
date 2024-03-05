import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, FormControl,
    Input, InputGroup,
    FormLabel, useToast, InputLeftAddon
} from '@chakra-ui/react';
import { useState } from 'react';

import { addTenant, TenantDetails, TenantSchema } from '../../services/tenant-management/TenantServices';

interface AddTenant {
    isOpen: boolean;
    onClose: () => void;
    updateTenantList: (tenantList: Array<TenantSchema>) => void;
    tenantList: Array<TenantSchema>;
}

export default function AddTenantModal({ isOpen, onClose, updateTenantList, tenantList }: AddTenant) {

    const toast = useToast();

    const [tenantDetails, setTenantDetails] = useState<TenantDetails>({
        first_name: '',
        last_name: '',
        contact_number: 0,
        email: "",
        tenant_image: null,
    });

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
                                onChange={(e) => {
                                    setTenantDetails({
                                        ...tenantDetails,
                                        first_name: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                placeholder="e.g. Jhon"
                                value={tenantDetails.last_name}
                                onChange={(e) => {
                                    setTenantDetails({
                                        ...tenantDetails,
                                        last_name: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Contact Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon>
                                    +63
                                </InputLeftAddon>
                                <Input
                                    placeholder="e.g. 0927323578" type="number"
                                    value={(tenantDetails.contact_number) ? tenantDetails.contact_number : ''}
                                    onChange={(e) => {
                                        setTenantDetails({
                                            ...tenantDetails,
                                            contact_number: Number(e.target.value),
                                        });
                                    }}
                                />
                            </InputGroup>


                        </FormControl>

                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="e.g. jhondoe@gmail.com" type="email"
                                value={tenantDetails.email}
                                onChange={(e) => {
                                    setTenantDetails({
                                        ...tenantDetails,
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>ID picture</FormLabel>
                            <input
                                type='file' accept='image/png, image/jpeg, image/svg+xml'
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setTenantDetails({
                                            ...tenantDetails,
                                            tenant_image: e.target.files[0],
                                        });
                                    }
                                }}
                            >
                            </input>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={async () => {
                            const response = await addTenant(tenantDetails);
                            if (response === "fail") {
                                toast({
                                    description: "Input required fields in correct format",
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                });
                            } else {
                                updateTenantList([...tenantList, response]);
                                toast({
                                    description: "Tenant Registration success",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                });
                                setTenantDetails({
                                    first_name: '',
                                    last_name: '',
                                    contact_number: 0,
                                    email: "",
                                    tenant_image: null,
                                });
                                onClose();
                            }
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