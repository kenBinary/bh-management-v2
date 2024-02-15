import {
    Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody,
    ModalCloseButton, Button, Heading,
    Checkbox, CheckboxGroup, SimpleGrid
} from '@chakra-ui/react';
import {
    NecessityBill, AssignedTenant, payNecessityBill,
} from '../../services/payment-management/paymentServices';
import { useEffect, useState } from 'react';
import { NecessitySchema, getNecessityList } from '../../services/tenant-management/TenantServices';

interface PayNecessityModal {
    isOpen: boolean;
    onClose: () => void;
    selectedBill: NecessityBill | null;
    selectedTenant: AssignedTenant | null;
    updateNecessityBills: (necessityBills: Array<NecessityBill> | null) => void;
}


export default function PayNecessityModal({
    isOpen, onClose, selectedBill, selectedTenant,
    updateNecessityBills,
}: PayNecessityModal) {

    const [necessityList, setNecessityList] = useState<Array<NecessitySchema> | null>(null);
    const [selectedNecessities, setSelectedNecessities] = useState<object>({});

    useEffect(() => {
        if (selectedTenant) {
            getNecessityList(selectedTenant.contract_id).then((response) => {
                if (response.data && response.data.length > 0) {
                    setNecessityList(response.data);
                } else {
                    setNecessityList(null);
                }
            });
        }
    }, [selectedTenant]);


    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="3xl" fontWeight="bold" color="brandPallete.background">
                    Pay Necessities
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Heading size='md' color="brandPallete.background">
                        Select Necessities to pay
                    </Heading>
                    <CheckboxGroup
                        colorScheme='teal' size="lg"
                    >
                        <SimpleGrid columns={2}>
                            {
                                (necessityList && necessityList.length > 0)
                                    ?
                                    necessityList.map((necessity) => {
                                        return (
                                            <Checkbox
                                                value={necessity.necessity_id}
                                                fontWeight="semibold" color="brandPallete.background"
                                                onChange={(e) => {
                                                    const { value, checked } = e.target;
                                                    setSelectedNecessities({
                                                        ...selectedNecessities,
                                                        [value]: checked,
                                                    });
                                                }}
                                            >
                                                {necessity.necessity_type}
                                            </Checkbox>
                                        );
                                    })
                                    :
                                    null
                            }
                        </SimpleGrid>
                    </CheckboxGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme='teal' mr={3}
                        onClick={() => {
                            if (selectedBill && selectedTenant && selectedNecessities) {
                                payNecessityBill(
                                    selectedBill.necessity_bill_id, selectedTenant.contract_id,
                                    selectedNecessities, selectedBill.bill_due
                                ).then((response) => {
                                    if (response !== "fail" && response.data.length > 0) {
                                        updateNecessityBills(response.data);
                                    } else {
                                        updateNecessityBills(null);
                                    }
                                });
                            }
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