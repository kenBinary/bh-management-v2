import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTenants, TenantSchema } from '../../services/room-management/RoomServices';



interface AssignModal {
    isOpen: boolean;
    onClose: () => void;
}

export default function AssignModal({ isOpen, onClose }: AssignModal) {
    const [tenantList, setTenantList] = useState<Array<TenantSchema> | null>(null);

    useEffect(() => {
        getTenants().then((response) => {
            if (response !== "fail") {
                setTenantList(response);
            }
        });

    }, []);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign a Tenant</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md'>Tenant List</Heading>
                    <Select >
                        {
                            tenantList &&
                            tenantList.map((e) => {
                                return (
                                    <option key={e.tenant_id} value={e.tenant_id}>{`${e.first_name} ${e.last_name}`}</option>
                                );
                            })
                        }
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={() => {
                        onClose();
                    }}>
                        Assign
                    </Button>
                    <Button colorScheme='teal' variant='outline' onClick={() => {
                        onClose();
                    }}>
                        close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}