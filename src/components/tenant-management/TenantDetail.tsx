import {
    Flex, Image, Text,
    Button, VStack, Spacer,
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
export default function TenantDetail() {
    return (
        <Flex as="section" padding="4" boxShadow="md">
            <Image
                borderRadius="full"
                boxSize="180px"
                src="https://bit.ly/dan-abramov"
                alt="tenant image"
            ></Image>
            <VStack flex="1" padding="6">
                <Flex width="full">
                    <Text fontSize="3xl" fontWeight="semibold">Jhon Doe</Text>
                    <Spacer></Spacer>
                    <Button>Edit Tenant</Button>
                </Flex>
                <Flex width="full" gap="4">
                    <FaPhoneAlt></FaPhoneAlt>
                    <VStack align="start">
                        <Text>63 123 9234 231</Text>
                        <Text>JhonDoe@gmail.com</Text>
                    </VStack>
                    <VStack align="start">
                        <Text>Occupying</Text>
                        <Text>bababooey</Text>
                    </VStack>
                </Flex>
            </VStack>
        </Flex>
    );
}