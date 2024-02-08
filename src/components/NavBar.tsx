import {
    Tabs, TabList, Tab,
    HStack, Spacer, Circle,
    Text, Image
} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineBedroomParent, MdOutlinePayments } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import logo from '/NavBar/logo.svg';


export default function NavBar() {
    const accentFilter: string = "invert(22%) sepia(7%) saturate(1005%) hue-rotate(178deg) brightness(94%) contrast(88%);";
    return (
        <HStack paddingLeft={"4"} paddingRight={"4"} h="10%" bgColor="brandPallete.primary">
            <HStack alignSelf="center" height="full">
                <Image src={logo} alt='website logo' boxSize="60%" filter={accentFilter} />
                <Text fontWeight="semibold" fontSize="2xl" color="brandPallete.text">
                    Roomster
                </Text>
            </HStack>
            <Spacer></Spacer>
            <Tabs as={"nav"} alignSelf="end" variant='enclosed' size="lg">
                <TabList>
                    <Link to="/" >
                        <Tab fontSize="lg" fontWeight={"semibold"} color="brandPallete.text" gap="1">
                            <MdOutlineDashboard size={24} color='var(--chakra-colors-brandPallete-accent)'></MdOutlineDashboard>
                            Dashboard
                        </Tab>
                    </Link>
                    <Link to="/rooms" >
                        <Tab fontSize="lg" fontWeight={"semibold"} color="brandPallete.text" gap="1">
                            <MdOutlineBedroomParent size={24} color='var(--chakra-colors-brandPallete-accent)'></MdOutlineBedroomParent>
                            Rooms
                        </Tab>
                    </Link>
                    <Link to="/tenants">
                        <Tab fontSize="lg" fontWeight={"semibold"} color="brandPallete.text" gap="1">
                            <GoPeople size={24} color='var(--chakra-colors-brandPallete-accent)'></GoPeople>
                            Tenants
                        </Tab>
                    </Link>
                    <Link to="/payments" >
                        <Tab fontSize="lg" fontWeight={"semibold"} color="brandPallete.text" gap="1">
                            <MdOutlinePayments size={24} color='var(--chakra-colors-brandPallete-accent)'></MdOutlinePayments>
                            Payments
                        </Tab>
                    </Link>
                </TabList>
            </Tabs>
            <Spacer></Spacer>
            <Circle alignSelf="center" bgColor="brandPallete.background" padding="2">
                <IoLogOutOutline size={24} color='var(--chakra-colors-brandPallete-accent)'></IoLogOutOutline>
            </Circle>
        </HStack >
    );
}