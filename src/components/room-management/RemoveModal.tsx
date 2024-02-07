import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Select, Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTenantsFromRoom, RoomSchema, TenantSchema } from '../../services/room-management/RoomServices';



interface RemoveModal {
    isOpen: boolean;
    onClose: () => void;
    room: RoomSchema | null;
}

export default function RemoveModal({ isOpen, onClose, room }: RemoveModal) {
    const [tenantList, setTenantList] = useState<Array<TenantSchema> | null>(null);

    useEffect(() => {
        if (room !== null) {
            getTenantsFromRoom(room.room_number).then((response) => {
                if (response !== "fail") {
                    setTenantList(response);
                }
            });
        }
    }, [room]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Remove a Tenant</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md'>Tenant List</Heading>
                    {
                        (tenantList === null || tenantList.length < 1)
                            ?
                            <Text>No tenant in this room</Text>
                            :
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
                    }
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