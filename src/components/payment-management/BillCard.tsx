import {
    Card, CardBody, Heading,
    Grid, Text, Button, Box
} from "@chakra-ui/react";
import {
    MdOutlineBedroomChild
} from "react-icons/md";
export default function BillCard() {
    return (
        <Card
            direction="row"
            overflow='hidden'
            variant='outline'
            width="45%"
            size="md"
            boxShadow="md"
        >
            <Box width="25%">
                <MdOutlineBedroomChild size="full" />
            </Box>
            <CardBody display="flex" flexDirection="column">
                <Heading size='md'>Room and Utility Bill</Heading>
                <Grid gridTemplateColumns="1fr 1fr" width="100%">
                    <Text py='2' flexBasis="1 0 50%">
                        Total: 2500 php
                    </Text>
                    <Text py='2' flexBasis="1 0 50%">
                        Room Number: 3
                    </Text>
                    <Text py='2' flexBasis="1 0 50%">
                        Due: Jan 13, 2025
                    </Text>
                </Grid>
                <Button variant='solid' colorScheme='blue' alignSelf="end">
                    Pay
                </Button>
            </CardBody>
        </Card>
    );
}