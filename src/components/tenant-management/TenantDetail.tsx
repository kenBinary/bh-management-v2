import {
    Flex, Image, Text,
    Button, VStack, Spacer,
    useDisclosure
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import EditTenantModal from "./EditTenantModal";

import { TenantSchema } from "../../services/tenant-management/TenantServices";

interface TenantDetail {
    tenantDetails: TenantSchema;
}

export default function TenantDetail({ tenantDetails }: TenantDetail) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const fullName = (tenantDetails.first_name !== "" && tenantDetails.last_name !== "") ? `${tenantDetails.first_name} ${tenantDetails.last_name}` : "";
    const contactNumber = (tenantDetails.contact_number !== 0) ? tenantDetails.contact_number : "";
    const occupancyStats = (tenantDetails.occupancy_status !== 0) ? "Occupying a Room" : "Not Occupying a Room";

    return (
        <Flex as="section" padding="4" boxShadow="md">
            <EditTenantModal
                onClose={onClose} isOpen={isOpen}
                tenantDetails={tenantDetails}
            ></EditTenantModal>
            <Image
                borderRadius="full"
                boxSize="180px"
                src="https://bit.ly/dan-abramov"
                alt="tenant image"
            ></Image>
            <VStack flex="1" padding="6">
                <Flex width="full">
                    <Text fontSize="3xl" fontWeight="semibold">
                        {fullName}
                    </Text>
                    <Spacer></Spacer>
                    <Button onClick={onOpen}>Edit Tenant</Button>
                </Flex>
                <Flex width="full" gap="4">
                    <FaPhoneAlt></FaPhoneAlt>
                    <VStack align="start">
                        <Text>{contactNumber}</Text>
                        <Text>JhonDoe@gmail.com</Text>
                    </VStack>
                    <VStack align="start">
                        <Text>{occupancyStats}</Text>
                        <Text>bababooey</Text>
                    </VStack>
                </Flex>
            </VStack>
        </Flex>
    );
}