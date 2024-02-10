import {
    Card, CardHeader, CardBody, CardFooter,
    VStack, Image, Text, Button
} from '@chakra-ui/react';

import roomImage from "/RoomManagement/room.png";

import { RoomSchema } from '../../services/room-management/RoomServices';
import { capitalizeWords } from '../../utils/StringUtils';
interface CardProps {
    room: RoomSchema;
    openAssignModal: () => void;
    openRemoveModal: () => void;
    updateSelectedRoom: (room: RoomSchema) => void;
}
export default function RoomCard({ room, openAssignModal, openRemoveModal, updateSelectedRoom }: CardProps) {
    return (
        <Card flexShrink='0' direction="row" size="sm" width="full" overflow="hidden" padding="2" variant="filled">
            <Image flexShrink="0" boxSize="230px" overflow="hidden" src={roomImage} alt='image of a room' />
            <VStack width="full" align="start">
                <CardHeader padding="2" fontSize="4xl" fontWeight="bold" color="brandPallete.background">
                    {capitalizeWords(room.room_type)}
                </CardHeader>
                <CardBody display="grid" padding="2" gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr 1fr" width="full">
                    <Text fontSize="2xl" fontWeight="medium" color="brandPallete.background">
                        {`Room Number: ${room.room_number}`}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium" color="brandPallete.background">
                        {`Room Status: ${capitalizeWords(room.room_status)}`}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium" color="brandPallete.background">
                        {`Room Type: ${capitalizeWords(room.room_type)}`}
                    </Text>
                    <Text fontSize="2xl" fontWeight="medium" color="brandPallete.background">
                        {`Room Fee: ${room.room_fee} ₱`}
                    </Text>
                </CardBody>
                <CardFooter padding="2" gap="2" alignSelf="end">
                    {
                        (room.is_full)
                            ?
                            null
                            :
                            <Button
                                colorScheme="teal"
                                onClick={() => {
                                    openAssignModal();
                                    updateSelectedRoom(room);
                                }}
                            >Asign Tenant</Button>
                    }
                    <Button
                        colorScheme="red" variant="outline"
                        onClick={() => {
                            updateSelectedRoom(room);
                            openRemoveModal();
                        }}
                    >Remove Tenant</Button>
                </CardFooter>
            </VStack>
        </Card>
    );
}