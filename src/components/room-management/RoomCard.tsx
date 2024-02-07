import {
    Card, CardHeader, CardBody, CardFooter,
    VStack, Image, Text, Button
} from '@chakra-ui/react';

import { RoomSchema } from '../../services/room-management/RoomServices';
interface CardProps {
    room: RoomSchema;
    openAssignModal: () => void;
    openRemoveModal: () => void;
}
export default function RoomCard({ room, openAssignModal, openRemoveModal }: CardProps) {
    return (
        <Card flexShrink='0' direction="row" size="sm" width="full" overflow="hidden" padding="2" variant="outline">
            <Image flexShrink="0" boxSize="230px" overflow="hidden" src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            <VStack width="full" align="start">
                <CardHeader padding="2" fontSize="3xl" fontWeight="bold">
                    {`${room.room_type}`}
                </CardHeader>
                <CardBody display="grid" padding="2" gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr" width="full">
                    <Text fontSize="xl">
                        {`Room Number: ${room.room_number}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Status: ${room.room_status}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Type: ${room.room_type}`}
                    </Text>
                    <Text fontSize="xl">
                        {`Room Fee: ${room.room_fee} ₱`}
                    </Text>
                </CardBody>
                <CardFooter padding="2" gap="2" alignSelf="end">
                    {
                        (room.is_full)
                            ?
                            null
                            :
                            <Button onClick={openAssignModal}>Asign Tenant</Button>
                    }
                    <Button onClick={openRemoveModal}>Remove Tenant</Button>
                </CardFooter>
            </VStack>
        </Card>
    );
}