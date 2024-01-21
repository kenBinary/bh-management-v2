import { Tabs, TabList, Tab, HStack, Spacer, Circle, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineBedroomParent, MdOutlinePayments } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";


export default function NavBar() {
    return (
        <HStack paddingLeft={"4"} paddingRight={"4"}>
            <HStack>
                <GoPeople size={24}></GoPeople>
                <Text fontWeight={"semibold"} fontSize={"lg"}>Roomster</Text>
            </HStack>
            <Spacer></Spacer>
            <Tabs as={"nav"}>
                <TabList>
                    <Link to="/" >
                        <Tab fontWeight={"semibold"} fontSize={"lg"}>
                            <MdOutlineDashboard size={24}></MdOutlineDashboard>
                            Dashboard
                        </Tab>
                    </Link>
                    <Link to="/rooms" >
                        <Tab fontWeight={"semibold"}>
                            <MdOutlineBedroomParent size={24}></MdOutlineBedroomParent>
                            Rooms
                        </Tab>
                    </Link>
                    <Link to="/tenants" >
                        <Tab fontWeight={"semibold"}>
                            <GoPeople size={24}></GoPeople>
                            Tenants
                        </Tab>
                    </Link>
                    <Link to="/payments" >
                        <Tab fontWeight={"semibold"}>
                            <MdOutlinePayments size={24}></MdOutlinePayments>
                            Payments
                        </Tab>
                    </Link>
                </TabList>
            </Tabs>
            <Spacer></Spacer>
            <Circle>
                <IoLogOutOutline size={24}></IoLogOutOutline>
            </Circle>
        </HStack>
    );
}