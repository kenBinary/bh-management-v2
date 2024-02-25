import {
    Flex, Spacer, Heading,
    VStack
} from '@chakra-ui/react';
import ReportCard from '../components/dashboard/ReportCard';
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MyLineChart, MyPieChart } from '../components/charts';
import { useEffect, useState } from 'react';
import { CardMetrics, RoomOverview, YearlyCashIn, getPropertyMetrics, getRoomOverview, getYearlyCashIn } from '../services/dashboardServices';
import { format } from 'date-fns';

export default function Dashboard() {

    const [cardMetrics, setCardMetrics] = useState<CardMetrics>({
        "monthlyCashIn": 0,
        "totalTenants": 0,
        "rentCollections": 0,
        "vacantRooms": 0,
    });

    const [roomOverview, setRoomOverview] = useState<Array<RoomOverview>>([]);

    const [yearlyCashIn, setYearlyCashIn] = useState<Array<YearlyCashIn>>([]);

    useEffect(() => {
        getPropertyMetrics().then((data) => {
            if (data !== "fail") {
                setCardMetrics(data);
            }
        });

        getRoomOverview().then((data) => {
            if (data !== "fail") {
                setRoomOverview(data);
            }
        });

        getYearlyCashIn().then((data) => {
            if (data !== "fail") {
                setYearlyCashIn(data);
            }
        });
    }, []);


    return (
        <Flex
            as='main' padding={4} h="90%" direction="column" gap={2}
            bgColor="brandPallete.background"
        >
            <Flex as="header" justify="center" >
                <Spacer></Spacer>
                <ReportCard title={`${format(new Date(), "MMMM")} Cash-In`} body={`${cardMetrics.monthlyCashIn}`} icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Total Tenants" body={`${cardMetrics.totalTenants}`} icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Rent Collections" body={`${cardMetrics.rentCollections}`} icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
                <ReportCard title="Vacant Rooms" body={`${cardMetrics.vacantRooms}`} icon={<FaRegMoneyBillAlt size="50" />}></ReportCard>
                <Spacer></Spacer>
            </Flex>
            <Flex as="section" flex="1" gap="2">
                <VStack
                    flex="2" bgColor="brandPallete.text"
                    borderRadius="md" padding="4"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        {`${format(new Date(), "yyyy")}  Yearly Cash-In`}
                    </Heading>
                    <MyLineChart
                        data={yearlyCashIn}
                    >
                    </MyLineChart>
                </VStack>
                <VStack
                    flex="1" bgColor="brandPallete.text"
                    borderRadius="md"
                >
                    <Heading fontSize="2xl" color="brandPallete.background">
                        Room Overview
                    </Heading>
                    <MyPieChart
                        data={roomOverview}
                    >
                    </MyPieChart>

                </VStack>
            </Flex>
        </Flex >
    );
}