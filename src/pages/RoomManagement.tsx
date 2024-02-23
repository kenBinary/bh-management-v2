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
import { MyPieChart } from "../components/charts";

export default function RoomManagement() {

    const { isOpen: isAssignOpen, onOpen: onAssignOpen, onClose: onAssignClose } = useDisclosure();

    const { isOpen: isRemoveOpen, onOpen: onRemoveOpen, onClose: onRemoveCLose } = useDisclosure();

    const [selectedRoom, setSelectedRoom] = useState<RoomSchema | null>(null);


    const [roomList, setRoomList] = useState<Array<RoomSchema>>([]);

    function updateSelectedRoom(room: RoomSchema) {
        setSelectedRoom(room);
    }

    function updateRoomList(room: Array<RoomSchema>) {
        setRoomList(room);
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
            setRoomList(roomList);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    const mockData = [
        { name: 'a', value: 5 },
        { name: 'b', value: 10 },
        { name: 'c', value: 15 },
    ];

    return (
        <Grid
            padding={4} gap="2" h="90%" gridTemplateRows="1fr 3fr" gridTemplateColumns="1fr 4fr"
            bgColor="brandPallete.background"
        >
            <AssignModal
                isOpen={isAssignOpen} onClose={onAssignClose}
                room={selectedRoom} updateRoomList={updateRoomList}
            >
            </AssignModal>
            <RemoveModal
                isOpen={isRemoveOpen} onClose={onRemoveCLose}
                room={selectedRoom} updateRoomList={updateRoomList}
            >
            </RemoveModal>

            <GridItem gridColumn="1/2" bgColor="brandPallete.text" padding="3" borderRadius="md">
                <HStack
                    align="center"
                >
                    <Heading fontSize='2xl' color="brandPallete.background">
                        Filter
                    </Heading>
                    <Spacer></Spacer>
                    <Button size='xs' colorScheme="teal">
                        Clear
                    </Button>
                </HStack>
                <Text fontSize='md' fontWeight='semibold'>Room Status</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="occupied" colorScheme="teal">Occupied</Radio>
                        <Radio value="vacant" colorScheme="teal">Vacant</Radio>
                    </VStack>
                </RadioGroup>
                <Text fontSize='md' fontWeight='semibold'>Room Price</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="2700" colorScheme="teal">2700 php</Radio>
                        <Radio value="3500" colorScheme="teal">3500 php</Radio>
                    </VStack>
                </RadioGroup>
            </GridItem>

            <GridItem gridColumn="1/2" bgColor="brandPallete.text" padding="3" borderRadius="md">
                <VStack width="full" height="full">
                    <Heading fontSize="lg" color="brandPallete.background">Room Overview</Heading>
                    <MyPieChart
                        data={mockData}
                    >
                    </MyPieChart>
                </VStack>
            </GridItem>

            <GridItem gridColumn="2/3" gridRow="1/3" display='flex' flexDirection='column' gap="2">
                <Heading
                    flexShrink="0" flexBasis='5%' color="brandPallete.text"
                    bgColor="brandPallete.secondary" padding="2" borderRadius="md"
                >
                    Room List
                </Heading>
                <VStack overflow="auto" flexShrink='0' flexGrow='1' flexBasis='90%'>
                    {(roomList.length < 1) ?
                        <div>loading</div>
                        :
                        roomList.map((e) => {
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

        </Grid >
    );
}