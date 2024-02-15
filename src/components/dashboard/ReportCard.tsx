import { Card, VStack, Text, IconProps } from "@chakra-ui/react";
import { IconContext } from "react-icons";
interface cardProps {
    title: string;
    body: string;
    icon: IconProps;
}
export default function ReportCard({ title, body, icon }: cardProps) {
    return (
        <Card
            variant="outline" direction="row" align="center" paddingTop="6"
            paddingBottom="6" paddingLeft="4" paddingRight="4" gap="14"
            bgColor="brandPallete.text"
        >
            <VStack gap={0} alignItems={"start"}>
                <Text fontSize="md" fontWeight="bold" color="brandPallete.background">
                    {title}
                </Text>
                <Text fontSize="2xl" fontWeight="semibold" color="brandPallete.background">
                    {body}
                </Text>
            </VStack>
            <IconContext.Provider value={{ size: "50", color: "var(--chakra-colors-brandPallete-background)" }}>
                <>{icon}</>
            </IconContext.Provider>
        </Card>
    );
}