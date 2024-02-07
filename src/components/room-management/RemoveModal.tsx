import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Select, Text, useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTenantsFromRoom, removeTenant, RoomSchema, TenantSchema } from '../../services/room-management/RoomServices';



interface RemoveModal {
    isOpen: boolean;
    onClose: () => void;
    room: RoomSchema | null;
    updateRoomList: (room: Array<RoomSchema>) => void;
}

interface SelectedTenant {
    tenant_id: string;
    contract_id: string;
}

export default function RemoveModal({ isOpen, onClose, room, updateRoomList }: RemoveModal) {
    const [tenantList, setTenantList] = useState<Array<TenantSchema> | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<SelectedTenant | null>(null);
    const toast = useToast();



    function updateSelectedTenant(tenant: SelectedTenant | null) {
        setSelectedTenant(tenant);
    }
    function updateTenantList(tenants: Array<TenantSchema>) {
        setTenantList(tenants);
    }

    useEffect(() => {
        if (room !== null) {
            getTenantsFromRoom(room.room_number).then((response) => {
                if (response !== "fail" && response.length > 0) {
                    setTenantList(response);
                    setSelectedTenant({
                        tenant_id: response[0].tenant_id,
                        contract_id: response[0].contract_id,
                    });
                }
            });
        }
    }, [room]);

    function handleRemove(tenant: SelectedTenant, room: RoomSchema) {
        removeTenant(room.room_number, tenant.tenant_id, tenant.contract_id).then((response) => {
            if (response === "fail") {
                toast({
                    description: "Failed to remove tenant from room",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                updateRoomList(response.roomList);
                updateTenantList(response.tenantList);
                if (response.tenantList.length > 0) {
                    updateSelectedTenant({
                        tenant_id: response.tenantList[0].tenant_id,
                        contract_id: response.tenantList[0].contract_id,
                    });
                } else {
                    updateSelectedTenant(null);
                }
                toast({
                    description: "Tenant removed from room",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }

        });
    }


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
                            <Select
                                onChange={(e) => {
                                    const [tenantId, contractId] = e.target.value.split(" ");
                                    updateSelectedTenant({
                                        tenant_id: tenantId,
                                        contract_id: contractId,
                                    });
                                }}
                            >
                                {
                                    tenantList &&
                                    tenantList.map((e) => {
                                        return (
                                            <option
                                                key={e.tenant_id} value={`${e.tenant_id} ${e.contract_id}`}
                                            >
                                                {`${e.first_name} ${e.last_name}`}
                                            </option>
                                        );
                                    })
                                }
                            </Select>
                    }
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={() => {
                        if (selectedTenant !== null && room !== null) {
                            handleRemove(selectedTenant, room);
                        }
                        onClose();
                    }}>
                        Remove
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