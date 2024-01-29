import {
    Flex, List,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TenantDetail from "../components/tenant-management/TenantDetail";
import LeaseDetail from "../components/tenant-management/LeaseDetail";
import PaymentHistory from "../components/tenant-management/PaymentHistory";
import NecessityList from "../components/tenant-management/NecessityList";
import TenantListItem from "../components/tenant-management/TenantListItem";

interface TenantDetail {
    tenant_id: string;
    first_name: string;
    last_name: string;
    occupancy_status: number;
    contact_number: number;
    archive_status: number;
}

interface TenantData {
    tenantList: Array<TenantDetail>;
}

export default function TenantManagement() {

    const [tenantData, setTenantData] = useState<TenantData>({
        tenantList: [],
    });

    useEffect(() => {
        const tenantList = fetch("http://localhost:3000/tenant/", {
            method: "GET"
        }).then((response) => {
            return response.json();
        });
        Promise.all([
            tenantList,
        ]).then(([tenantList]) => {
            console.log(tenantList);
            setTenantData({
                tenantList: tenantList,
            });
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    return (
        <Flex height="90%" padding="4" gap="2">
            <List spacing="0.5" flex="1 0 20%" height="full" overflowY="auto" >
                {
                    (tenantData.tenantList.length < 1)
                        ?
                        <div>loading</div>
                        :
                        tenantData.tenantList.map((e) => {
                            return (
                                <TenantListItem name={`${e.first_name} ${e.last_name}`} />
                            );
                        })
                }
            </List>
            <Flex flex="4 0 80%" as="main" direction="column" overflowY="auto">
                <TenantDetail></TenantDetail>
                <LeaseDetail></LeaseDetail>
                <PaymentHistory></PaymentHistory>
                <NecessityList></NecessityList>
            </Flex>
        </Flex>
    );
}