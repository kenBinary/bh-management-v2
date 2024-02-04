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
            borderColor="blue.100" fontSize="xl"
            padding="2" data-tenant_id={tenant_id}
            onClick={handleClick}
        >
            {name}
        </ListItem>
    );
}