import {
    Card, CardHeader, CardBody, CardFooter,
    VStack, Image, Text, Button
} from '@chakra-ui/react';
export default function RoomCard() {
    return (
        <Card flexShrink='0' direction="row" size="sm" width="full" overflow="hidden" padding="2" variant="outline">
            <Image flexShrink="0" boxSize="230px" overflow="hidden" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            <VStack width="full" align="start">
                <CardHeader padding="2" fontSize="3xl" fontWeight="bold">
                    Single Room
                </CardHeader>
                <CardBody display="grid" padding="2" gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr" width="full">
                    <Text fontSize="xl">
                        Room Number : 1
                    </Text>
                    <Text fontSize="xl">
                        Room Number : 1
                    </Text>
                    <Text fontSize="xl">
                        Room Number : 1
                    </Text>
                    <Text fontSize="xl">
                        Room Number : 1
                    </Text>
                </CardBody>
                <CardFooter padding="2" gap="2" alignSelf="end">
                    <Button>Asign Tenant</Button>
                    <Button>Remove Tenant</Button>
                </CardFooter>
            </VStack>
        </Card>
    );
}