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
import { RoomOverview, getRoomOverview } from "../services/dashboardServices";

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

    const [roomOverview, setRoomOverview] = useState<Array<RoomOverview>>([]);

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

        getRoomOverview().then((data) => {
            if (data !== "fail") {
                setRoomOverview(data);
            }
        });

    }, []);

    function filterByStatus(statusType: string) {
        fetch("http://localhost:3000/room", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            const roomList = response;
            const newList = roomList.filter((room: RoomSchema) => {
                return room.room_status === statusType;
            });
            setRoomList(newList);
        });
    }

    function filterByPrice(price: number) {
        fetch("http://localhost:3000/room", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            const roomList = response;
            const newList = roomList.filter((room: RoomSchema) => {
                return room.room_fee === price;
            });
            setRoomList(newList);
        });
    }

    function clearFilter() {
        fetch("http://localhost:3000/room", {
            method: "GET"
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setRoomList(response);
        });
    }

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
                    <Button size='xs' colorScheme="teal"
                        onClick={() => {
                            clearFilter();
                        }}
                    >
                        Clear
                    </Button>
                </HStack>
                <Text fontSize='md' fontWeight='semibold'>Room Status</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="occupied" colorScheme="teal"
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    filterByStatus("occupied");
                                }
                            }}
                        >Occupied</Radio>
                        <Radio value="vacant" colorScheme="teal"
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    filterByStatus("vacant");
                                }
                            }}
                        >Vacant</Radio>
                    </VStack>
                </RadioGroup>
                <Text fontSize='md' fontWeight='semibold'>Room Price</Text>
                <RadioGroup>
                    <VStack align="start">
                        <Radio value="2700" colorScheme="teal"
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    filterByPrice(2700);
                                }
                            }}>2700 php</Radio>
                        <Radio value="3500" colorScheme="teal"
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                    filterByPrice(3500);
                                }
                            }}>3500 php</Radio>
                    </VStack>
                </RadioGroup>
            </GridItem>

            <GridItem gridColumn="1/2" bgColor="brandPallete.text" padding="3" borderRadius="md">
                <VStack width="full" height="full">
                    <Heading fontSize="lg" color="brandPallete.background">Room Overview</Heading>
                    <MyPieChart
                        data={roomOverview}
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