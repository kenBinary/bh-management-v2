import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Select, useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTenants, RoomSchema, TenantSchema } from '../../services/room-management/RoomServices';
import { assignTenant } from '../../services/room-management/RoomServices';



interface AssignModal {
    isOpen: boolean;
    onClose: () => void;
    room: RoomSchema | null;
    updateRoomList: (room: Array<RoomSchema>) => void;
}

interface SelectedTenant {
    tenant_id: string;
    contract_id: string;
}

export default function AssignModal({ isOpen, onClose, room, updateRoomList }: AssignModal) {

    const [tenantList, setTenantList] = useState<Array<TenantSchema> | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<SelectedTenant | null>(null);

    const toast = useToast();

    function updateSelectedTenant(tenant: SelectedTenant) {
        setSelectedTenant(tenant);
    }

    function handleAssign(tenant: SelectedTenant, room: RoomSchema) {
        assignTenant(room.room_number, tenant.tenant_id, tenant.contract_id).then((response) => {
            if (response === "fail") {
                toast({
                    description: "Failed to Assign Tenant ro Room",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                updateRoomList(response.roomList);
                updateSelectedTenant({
                    tenant_id: response.tenantList[0].tenant_id,
                    contract_id: response.tenantList[0].contract_id,
                });
                toast({
                    description: "Tenant Assigned to room",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        });
    }

    useEffect(() => {
        getTenants().then((response) => {
            if (response !== "fail" && response.length > 0) {
                setTenantList(response);
                setSelectedTenant({
                    tenant_id: response[0].tenant_id,
                    contract_id: response[0].contract_id,
                });
            }
        });
    }, [room]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign a Tenant</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md'>Tenant List</Heading>
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
                            (tenantList !== null && tenantList.length > 0)
                                ?
                                tenantList.map((e) => {
                                    const fullName = e.first_name + e.last_name;
                                    return (
                                        <option
                                            key={e.tenant_id} value={`${e.tenant_id} ${e.contract_id}`}
                                        >
                                            {fullName}
                                        </option>
                                    );
                                })
                                :
                                null
                        }
                    </Select>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='teal' mr={3}
                        onClick={() => {
                            if (selectedTenant !== null && room !== null) {
                                handleAssign(selectedTenant, room);
                            }
                            onClose();
                        }}
                    >
                        Assign
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