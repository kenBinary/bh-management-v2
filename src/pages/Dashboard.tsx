import {
    Flex, Spacer, Heading,
    VStack
} from '@chakra-ui/react';
import ReportCard from '../components/dashboard/ReportCard';
import { FaRegMoneyBillAlt } from "react-icons/fa";

export default function Dashboard() {
    return (
        <Flex
            as='main' padding={4} h="90%" direction="column" gap={2}
            bgColor="brandPallete.background"
        >
            <Flex as="header" justify="center" >
                <Spacer></Spacer>
                <ReportCard title="Monthly Cash-in" body="2533" icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Monthly Cash-in" body="2533" icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Monthly Cash-in" body="2533" icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Monthly Cash-in" body="2533" icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
            </Flex>
            <Flex as="section" flex="1" gap="2">
                <VStack
                    flex="2" bgColor="brandPallete.text"
                    borderRadius="md"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        Yearly Cash-In
                    </Heading>
                </VStack>
                <VStack
                    flex="1" bgColor="brandPallete.text"
                    borderRadius="md"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        Yearly Cash-In
                    </Heading>
                </VStack>
            </Flex>
        </Flex >
    );
}