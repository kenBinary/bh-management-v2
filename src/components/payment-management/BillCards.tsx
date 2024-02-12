import {
    Card, CardBody, Heading,
    Grid, Text, Button, Box,
    Flex,
} from "@chakra-ui/react";
import {
    MdOutlineBedroomChild
} from "react-icons/md";

export function NecessityBillCard() {
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
                            2500 php
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Payment Status
                        </Text>
                        <Text >
                            all necessities paid
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Due Date
                        </Text>
                        <Text >
                            Jan 13, 2025
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" >
                        <Text >
                            Date Paid
                        </Text>
                        <Text >
                            Jan 14, 2025
                        </Text>
                    </Flex>
                </Grid>
                <Button variant='solid' colorScheme='blue' alignSelf="end">
                    Pay
                </Button>
            </CardBody>
        </Card>
    );
}