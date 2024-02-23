import {
    Flex, Spacer, Heading,
    VStack
} from '@chakra-ui/react';
import ReportCard from '../components/dashboard/ReportCard';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MyLineChart, MyPieChart } from '../components/charts';

export default function Dashboard() {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
        },
        {
            "name": "Page B",
            "uv": 3000,
        },
        {
            "name": "Page C",
            "uv": 2000,
        },
        {
            "name": "Page D",
            "uv": 2780,
        },
        {
            "name": "Page E",
            "uv": 1890,
        },
        {
            "name": "Page F",
            "uv": 2390,
        },
        {
            "name": "Page G",
            "uv": 3490,
        }
    ];
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
                    borderRadius="md" padding="4"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        Yearly Cash-In
                    </Heading>
                    <MyLineChart
                        data={data}
                    >
                    </MyLineChart>
                </VStack>
                <VStack
                    flex="1" bgColor="brandPallete.text"
                    borderRadius="md"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        Yearly Cash-In
                    </Heading>
                    <MyPieChart
                        data={data}
                    >
                    </MyPieChart>

                </VStack>
            </Flex>
        </Flex >
    );
}