import {
    Grid, GridItem, Radio, RadioGroup,
    VStack, Text, Heading, HStack,
    Button, Spacer, useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RoomCard from "../components/room-management/RoomCard";
import AssignModal from "../components/room-management/AssignModal";
import RemoveModal from "../components/room-management/RemoveModal";
import { RoomSchema } from "../services/room-management/RoomServices";
interface RoomList {
    room_number: number;
    headcount: number;
    is_full: number;
    room_fee: number;
    room_status: "vacant" | "occupied";
    room_type: "single room" | "double room";
}
interface RoomData {
    roomList: Array<RoomList>;
}

export default function RoomManagement() {

    const { isOpen: isAssignOpen, onOpen: onAssignOpen, onClose: onAssignClose } = useDisclosure();

    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveCLose } = useDisclosure();

    const [selectedRoom, setSelectedRoom] = useState<RoomSchema | null>(null);

    const [roomData, setRoomData] = useState<RoomData>({
        roomList: [],
    });

    function updateSelectedRoom(room: RoomSchema) {
        setSelectedRoom(room);
    }

    useEffect(() => {
        const roomList = fetch("http://localhost:3000/room", {
            method: "GET"
        }).then((response) => {
            return response.json();
        });

        Promise.all([
            roomList, roomList
        ]).then(([roomList]) => {
            setRoomData({
                roomList: roomList
            });
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    return (
        <Grid padding={4} gap="2" h="90%" gridTemplateRows="1fr 3fr" gridTemplateColumns="1fr 4fr">
            <AssignModal
                isOpen={isAssignOpen} onClose={onAssignClose}
            >
            </AssignModal>
            <RemoveModal
                isOpen={isRemoveOpen} onClose={onRemoveCLose}
                room={selectedRoom}
            >
            </RemoveModal>
            <GridItem gridColumn="1/2">
                <HStack align="center">
                    <Heading fontSize='2xl'>Filter</Heading>
                    <Spacer></Spacer>
                    <Button size='xs'>Clear</Button>
                </HStack>
                <Text fontSize='md' fontWeight='semibold'>Room Status</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="occupied">Occupied</Radio>
                        <Radio value="vacant">Vacant</Radio>
                    </VStack>
                </RadioGroup>
                <Text fontSize='md' fontWeight='semibold'>Room Price</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="2700">2700 php</Radio>
                        <Radio value="3500">3500 php</Radio>
                    </VStack>
                </RadioGroup>
            </GridItem>

            <GridItem gridColumn="1/2">
                <VStack>
                    <Heading fontSize="lg">Room Overview</Heading>
                </VStack>
            </GridItem>

            <GridItem gridColumn="2/3" gridRow="1/3" display='flex' flexDirection='column'>
                <Heading flexShrink="0" flexBasis='10%'>Room List</Heading>
                <VStack overflow="auto" flexShrink='0' flexGrow='1' flexBasis='90%'>
                    {(roomData.roomList.length < 1) ?
                        <div>loading</div>
                        :
                        roomData.roomList.map((e) => {
                            return (
                                <RoomCard
                                    key={e.room_number} room={e}
                                    openAssignModal={onAssignOpen} openRemoveModal={onRemoveOpen}
                                    updateSelectedRoom={updateSelectedRoom}
                                ></RoomCard>
                            );
                        })
                    }
                </VStack>
            </GridItem>

        </Grid>
    );
}