import { ListItem } from "@chakra-ui/react";
interface ItemProps {
    name: string;
}
export default function TenantListItem({ name }: ItemProps) {
    return (
        <ListItem border="2px solid" borderColor="blue.100" fontSize="xl" padding="2">
            {name}
        </ListItem>
    );
}