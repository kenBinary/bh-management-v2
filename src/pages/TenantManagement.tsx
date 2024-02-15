import {
    Flex, List, useDisclosure,
    Heading, Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import TenantDetail from "../components/tenant-management/TenantDetail";
import LeaseDetail from "../components/tenant-management/LeaseDetail";
import PaymentHistory from "../components/tenant-management/PaymentHistory";
import TenantListItem from "../components/tenant-management/TenantListItem";
import AddTenantModal from "../components/tenant-management/AddTenantModal";

import { TenantSchema, getTenant } from "../services/tenant-management/TenantServices";


export default function TenantManagement() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [tenantList, setTenantList] = useState<Array<TenantSchema>>([]);

    const [selectedTenant, setSelectedTenant] = useState<TenantSchema>({
        first_name: "",
        last_name: "",
        contact_number: 0,
        tenant_id: "",
        occupancy_status: 0,
        archive_stauts: 0,
        email: "",
        tenant_image: null,
    });

    function updateSelectedTenant(selectedTenant: TenantSchema) {
        setSelectedTenant(selectedTenant);
    }

    function updateTenantList(tenantList: Array<TenantSchema>) {
        setTenantList(tenantList);
    }

    async function selectTenant(tenantId: string): Promise<"fail" | "success"> {
        const response = await getTenant(tenantId);
        if (response === "fail") {
            return response;
        }
        setSelectedTenant(response[0]);
        return "success";
    }

    useEffect(() => {
        const tenantList = fetch("http://localhost:3000/tenant/", {
            method: "GET"
        }).then((response) => {
            return response.json();
        });
        Promise.all([
            tenantList,
        ]).then(([tenantList]) => {
            setSelectedTenant(tenantList[0]);
            setTenantList(tenantList);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <Flex height="90%" padding="4" gap="2" bgColor="brandPallete.background">
            <Flex
                as="aside" flex="1 0 20%" direction="column" bgColor="brandPallete.text"
                padding="2" borderRadius="md"
            >
                <AddTenantModal
                    isOpen={isOpen} onClose={onClose}
                    tenantList={tenantList} updateTenantList={updateTenantList}
                ></AddTenantModal>

                <Flex paddingBottom="2" paddingTop="2" justifyContent="space-between">
                    <Heading size="md" color="brandPallete.background">Tenant List</Heading>
                    <Button size="sm" onClick={onOpen} colorScheme="teal">Add Tenant</Button>
                </Flex>
                <List spacing="0.5" flexGrow="1" overflowY="auto" >
                    {
                        (tenantList.length < 1)
                            ?
                            // TODO: add proper loading ui
                            <div>loading</div>
                            :
                            tenantList.map((e) => {
                                return (
                                    <TenantListItem
                                        tenant_id={e.tenant_id} name={`${e.first_name} ${e.last_name}`}
                                        selectTenant={selectTenant} key={e.tenant_id}
                                    />
                                );
                            })
                    }
                </List>
            </Flex>

            <Flex
                flex="4 0 80%" as="main" direction="column" overflowY="auto"
                bgColor="brandPallete.text" borderRadius="md"
            >
                <TenantDetail
                    selectedTenant={selectedTenant} updateSelectedTenant={updateSelectedTenant}
                ></TenantDetail>
                <LeaseDetail
                    selectedTenant={selectedTenant}
                ></LeaseDetail>
                <PaymentHistory></PaymentHistory>
            </Flex>
        </Flex >
    );
}