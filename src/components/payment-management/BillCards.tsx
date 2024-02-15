import {
    Card, CardBody, Heading,
    Grid, Text, Button, Image,
    Flex, CardFooter, Stack,

} from "@chakra-ui/react";
import { format } from "date-fns";
import necessityImage from "/PaymentManagement/necessityImage.png";
import roomImage from "/PaymentManagement/roomImage.png";
import {
    NecessityBill, RoomUtilityBill,
} from "../../services/payment-management/paymentServices";

interface BillCard {
    updateSelectedBill: (bill: RoomUtilityBill | NecessityBill) => void;
}

interface NecessityBillCard extends BillCard {
    bill: NecessityBill;
    onOpen: () => void;
}
export function NecessityBillCard({ bill, updateSelectedBill, onOpen }: NecessityBillCard) {
    console.log(bill);
    return (
        <Card
            direction="row" overflow='hidden' variant='outline'
            width="45%" size="sm" boxShadow="md"
        >
            <Image
                objectFit='cover'
                width="35%" flexShrink="0"
                src={necessityImage}
            />
            <Stack flex="1">
                <CardBody display="flex" flexDirection="column" rowGap="2">
                    <Heading
                        size='lg' color="brandPallete.background"
                    >
                        Necessity Bill
                    </Heading>
                    <Grid gridTemplateColumns="1fr 1fr" width="100%" gap="1" flex="1">
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Total
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                ₱ {bill.total_bill}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Due Date
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {format(new Date(bill.bill_due), "MMM d, yyyy")}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Date Paid
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
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
                </CardBody>

                <CardFooter display="flex" justifyContent="end">
                    <Button
                        variant='solid' colorScheme='teal'
                        onClick={() => {
                            updateSelectedBill(bill);
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

interface RoomBillCard extends BillCard {
    bill: RoomUtilityBill;
    onOpen: () => void;
}
export function RoomBillCard({ bill, updateSelectedBill, onOpen }: RoomBillCard) {
    return (
        <Card
            direction="row" overflow='hidden' variant='outline'
            width="45%" size="sm" boxShadow="md" h="250px"
        >
            <Image
                objectFit='cover'
                width="35%" flexShrink="0"
                src={roomImage}
            />
            <Stack flex="1">
                <CardBody display="flex" flexDirection="column" rowGap="2" >
                    <Heading
                        size='lg' color="brandPallete.background"
                    >
                        Room Bill
                    </Heading>
                    <Grid gridTemplateColumns="1fr 1fr" width="100%" gap="1" flex="1">
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Total
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                ₱ {bill.total_bill}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Room Number
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {
                                    (bill.room_number)
                                        ?
                                        bill.room_number
                                        :
                                        "-----"
                                }
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Due Date
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
                                {format(new Date(bill.bill_due), "MMM d, yyyy")}
                            </Text>
                        </Flex>
                        <Flex flexDirection="column" >
                            <Text color="brandPallete.background" fontSize="xl" fontWeight="semibold">
                                Date Paid
                            </Text>
                            <Text color="brandPallete.background" fontWeight="medium">
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
                </CardBody>
                <CardFooter display="flex" justifyContent="end">
                    <Button
                        variant='solid' colorScheme='teal'
                        onClick={() => {
                            updateSelectedBill(bill);
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