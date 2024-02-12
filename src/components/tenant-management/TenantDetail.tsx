import {
    Flex, Image, Text,
    Button, VStack, Spacer,
    useDisclosure
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import EditTenantModal from "./EditTenantModal";

import { TenantSchema, getTenantImage } from "../../services/tenant-management/TenantServices";
import { useEffect, useState } from "react";

interface TenantDetail {
    selectedTenant: TenantSchema;
    updateSelectedTenant: (selectedTenant: TenantSchema) => void;
}

export default function TenantDetail({ selectedTenant, updateSelectedTenant }: TenantDetail) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fullName = (selectedTenant.first_name !== "" && selectedTenant.last_name !== "") ? `${selectedTenant.first_name} ${selectedTenant.last_name}` : "";
    const contactNumber = (selectedTenant.contact_number !== 0) ? selectedTenant.contact_number : "";
    const occupancyStats = (selectedTenant.occupancy_status !== 0) ? "Occupying a Room" : "Not Occupying a Room";

    const [imageLink, setImageLink] = useState("");
    useEffect(() => {
        getTenantImage(selectedTenant.tenant_id).then((response) => {
            if (response.imageLink) {
                setImageLink(response.imageLink);
            }
        });
    }, [selectedTenant]);

    return (
        <Flex as="section" padding="4" boxShadow="md">
            <EditTenantModal
                onClose={onClose} isOpen={isOpen}
                selectedTenant={selectedTenant} updateSelectedTenant={updateSelectedTenant}
            ></EditTenantModal>
            <Image
                borderRadius="full"
                boxSize="180px"
                src={imageLink}
                alt="tenant image"
            ></Image>
            <VStack flex="1" padding="6">
                <Flex width="full">
                    <Text fontSize="4xl" fontWeight="semibold" color="brandPallete.background">
                        {fullName}
                    </Text>
                    <Spacer></Spacer>
                    <Button onClick={onOpen} colorScheme="teal">Edit Tenant</Button>
                </Flex>
                <Flex width="full" gap="4">
                    <FaPhoneAlt size="25px" color="var(--chakra-colors-brandPallete-background)"></FaPhoneAlt>
                    <VStack align="start">
                        <Text fontSize="lg">
                            (+63) {contactNumber}
                        </Text>
                        <Text fontSize="lg">
                            {(selectedTenant.email) ? selectedTenant.email : "-----"}
                        </Text>
                    </VStack>
                    <VStack align="start">
                        <Text fontSize="lg">
                            {occupancyStats}
                        </Text>
                    </VStack>
                </Flex>
            </VStack>
        </Flex>
    );
}