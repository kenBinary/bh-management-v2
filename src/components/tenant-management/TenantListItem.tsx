import { ListItem } from "@chakra-ui/react";
interface ItemProps {
    name: string;
    tenant_id: string;
    selectTenant: (tenantId: string) => Promise<"fail" | "success">;
}
export default function TenantListItem({ name, tenant_id, selectTenant }: ItemProps) {

    async function handleClick(e: React.MouseEvent<HTMLLIElement>) {
        const event = e.target as HTMLInputElement;
        const id = event.getAttribute("data-tenant_id");
        if (id === null) {
            return;
        }
        await selectTenant(id);
    }
    return (
        <ListItem
            cursor="pointer" border="2px solid"
            borderColor="brandPallete.secondary" fontSize="xl"
            padding="2" data-tenant_id={tenant_id}
            onClick={handleClick} fontWeight="medium"
            borderRadius="md" bgColor="brandPallete.secondary"
            color="brandPallete.text" _hover={{
                backgroundColor: "brandPallete.text",
                color: "brandPallete.secondary"
            }}
        >
            {name}
        </ListItem>
    );
}