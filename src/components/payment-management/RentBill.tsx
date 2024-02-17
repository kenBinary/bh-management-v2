import {
    Card, CardBody, Heading,
    Grid, Text, Button, Image,
    Flex, CardFooter, Stack,

} from "@chakra-ui/react";
import { format } from "date-fns";

import billImage from "/PaymentManagement/billImage.png";
import {
    NecessityBill, RoomUtilityBill,
} from "../../services/payment-management/paymentServices";
import { SelectedBill } from "../../pages/PaymentManagement";

interface RentBIll {
    necessityBill: NecessityBill | null;
    roomUtilityBill: RoomUtilityBill;
    necessityCount: number;
    onOpen: () => void;
    updateSelectedBill: (bill: SelectedBill) => void;
}
export function RentBill({
    necessityBill, roomUtilityBill,
    necessityCount, onOpen, updateSelectedBill
}: RentBIll) {
    return (
        <Card
            direction="row" overflow='hidden' variant='outline'
            width="80%" size="sm" boxShadow="md" h="250px"
        >
            <Image
                objectFit='cover'
                width="35%" flexShrink="0"
                src={billImage}
            />
            <Stack flex="1">
                <CardBody display="flex" flexDirection="column" rowGap="2" >
                    <Heading
                        size='lg' color="brandPallete.background"
                    >
                        {
                            (roomUtilityBill)
                                ?
                                `Bill For ${format(new Date(roomUtilityBill.bill_due), "MMMM")}`
                                :
                                null
                        }
                    </Heading>
                    <Grid gridTemplateColumns="1fr 1fr" width="100%" gap="1" flex="1">
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Total
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                ₱
                                {
                                    (necessityBill)
                                        ?
                                        necessityBill.total_bill + roomUtilityBill.total_bill
                                        :
                                        roomUtilityBill.total_bill
                                }
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Due Date
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {format(new Date(roomUtilityBill.bill_due), "MMM d, yyyy")}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Room Number
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {roomUtilityBill.room_number}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Number of necessities
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {necessityCount}
                            </Text>
                        </Flex>

                    </Grid>
                </CardBody>
                <CardFooter display="flex" justifyContent="end">
                    <Button
                        variant='solid' colorScheme='teal'
                        onClick={() => {
                            updateSelectedBill({
                                necessityBill: necessityBill,
                                roomUtilityBill: roomUtilityBill,
                            });
                            onOpen();
                        }}
                    >
                        Pay
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}