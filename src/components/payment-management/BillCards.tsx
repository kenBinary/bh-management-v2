import {
    Card, CardBody, Heading,
    Grid, Text, Button, Box,
    Flex,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { MdOutlineBedroomChild } from "react-icons/md";
import {
    NecessityBill, RoomUtilityBill,
} from "../../services/payment-management/paymentServices";

interface BillCard {
    updateSelectedBill: (bill: RoomUtilityBill | NecessityBill) => void;
}

interface NecessityBillCard extends BillCard {
    bill: NecessityBill;
}
export function NecessityBillCard({ bill, updateSelectedBill }: NecessityBillCard) {
    return (
        <Card
            direction="row" overflow='hidden' variant='outline'
            width="45%" size="sm" boxShadow="md"
        >
            <Box width="25%">
                <MdOutlineBedroomChild size={"100%"} />
            </Box>
            <CardBody display="flex" flexDirection="column" rowGap="2">
                <Heading size='lg'>Necessity Bill</Heading>
                <Grid gridTemplateColumns="1fr 1fr" width="100%" gap="1">
                    <Flex flexDirection="column" >
                        <Text>
                            Total
                        </Text>
                        <Text>
                            ₱ {bill.total_bill}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Payment Status
                        </Text>
                        <Text >
                            {
                                (bill.payment_status)
                                    ?
                                    "all necessities paid"
                                    :
                                    "some necessities not paid"
                            }
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Due Date
                        </Text>
                        <Text >
                            {format(new Date(bill.bill_due), "MMM d, yyyy")}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Date Paid
                        </Text>
                        <Text >
                            {
                                (bill.date_paid)
                                    ?
                                    format(new Date(bill.date_paid), "MMM d, yyyy")
                                    :
                                    "-----"
                            }
                        </Text>
                    </Flex>
                </Grid>
                <Button
                    variant='solid' colorScheme='blue' alignSelf="end"
                    onClick={() => {
                        updateSelectedBill(bill);
                    }}
                >
                    Pay
                </Button>
            </CardBody>
        </Card>
    );
}

interface RoomBillCard extends BillCard {
    bill: RoomUtilityBill;
    onOpen: () => void;
}
export function RoomBillCard({ bill, updateSelectedBill, onOpen }: RoomBillCard) {
    return (
        <Card
            direction="row" overflow='hidden' variant='outline'
            width="45%" size="sm" boxShadow="md"
        >
            <Box width="25%">
                <MdOutlineBedroomChild size={"100%"} />
            </Box>
            <CardBody display="flex" flexDirection="column" rowGap="2">
                <Heading size='lg'>Room Bill</Heading>
                <Grid gridTemplateColumns="1fr 1fr" width="100%" gap="1">
                    <Flex flexDirection="column" >
                        <Text>
                            Total
                        </Text>
                        <Text>
                            ₱ {bill.total_bill}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Payment Status
                        </Text>
                        <Text >
                            {
                                (bill.payment_status)
                                    ?
                                    "room has been paid"
                                    :
                                    "room has not been paid"
                            }
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Due Date
                        </Text>
                        <Text >
                            {format(new Date(bill.bill_due), "MMM d, yyyy")}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Date Paid
                        </Text>
                        <Text >
                            {
                                (bill.date_paid)
                                    ?
                                    format(new Date(bill.date_paid), "MMM d, yyyy")
                                    :
                                    "-----"
                            }
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Room Number
                        </Text>
                        <Text >
                            {
                                (bill.room_number)
                                    ?
                                    bill.room_number
                                    :
                                    "-----"
                            }
                        </Text>
                    </Flex>
                </Grid>
                <Button
                    variant='solid' colorScheme='blue' alignSelf="end"
                    onClick={() => {
                        onOpen();
                        updateSelectedBill(bill);
                    }}
                >
                    Pay
                </Button>
            </CardBody>
        </Card>
    );
}