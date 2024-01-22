import { Card, VStack, Text, IconProps } from "@chakra-ui/react";
import { IconContext } from "react-icons";
interface cardProps {
    title: string;
    body: string;
    icon: IconProps;
}
export default function ReportCard({ title, body, icon }: cardProps) {
    return (
        <Card variant="outline" direction={"row"} align={"center"} paddingTop={"6"} paddingBottom={"6"} paddingLeft={"4"} paddingRight={"4"} gap={"14"}>
            <VStack gap={0} alignItems={"start"}>
                <Text fontSize="md" fontWeight="bold">{title}</Text>
                <Text fontSize="2xl" fontWeight="semibold">{body}</Text>
            </VStack>
            <IconContext.Provider value={{ size: "50" }}>
                <>{icon}</>
            </IconContext.Provider>
        </Card>
    );
}