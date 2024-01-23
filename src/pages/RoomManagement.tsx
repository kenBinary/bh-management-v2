import {
    Grid, GridItem, Radio, RadioGroup,
    VStack, Text, Heading, HStack,
    Button, Spacer,
} from "@chakra-ui/react";
import RoomCard from "../components/room-management/RoomCard";


export default function RoomManagement() {
    return (
        <Grid padding={4} gap="2" h="90%" gridTemplateRows="1fr 3fr" gridTemplateColumns="1fr 4fr">
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
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                    <RoomCard></RoomCard>
                </VStack>
            </GridItem>
        </Grid>
    );
}