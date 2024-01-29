import {
    Card, CardHeader, CardBody, CardFooter,
    VStack, Image, Text, Button
} from '@chakra-ui/react';
interface CardProps {
    roomNumber: number;
    roomStatus: string;
    roomType: string;
    roomFee: number;
}
export default function RoomCard({ roomNumber, roomStatus, roomType, roomFee }: CardProps) {
    return (
        <Card flexShrink='0' direction="row" size="sm" width="full" overflow="hidden" padding="2" variant="outline">
            <Image flexShrink="0" boxSize="230px" overflow="hidden" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            <VStack width="full" align="start">
                <CardHeader padding="2" fontSize="3xl" fontWeight="bold">
                    {`${roomType}`}
                </CardHeader>
                <CardBody display="grid" padding="2" gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr" width="full">
                    <Text fontSize="xl">
                        {`Room Number: ${roomNumber}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Status: ${roomStatus}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Type: ${roomType}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Fee: ${roomFee} ₱`}
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