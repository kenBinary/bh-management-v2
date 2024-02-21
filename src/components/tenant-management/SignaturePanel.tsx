import {
    Button, Box, HStack,
    Heading, Text, SimpleGrid,
    Flex,
    TabPanel,
} from '@chakra-ui/react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

import {
    useRef, useState
} from 'react';
import { format } from 'date-fns';
export interface SignatureUrls {
    tenantDataUrl?: string;
    landlordDataUrl?: string;
}
interface SignaturePanel {
    currentDate: string;
    updateSignatures: (signatures: SignatureUrls) => void;
}
export function SignaturePanel({
    currentDate, updateSignatures,
}: SignaturePanel) {
    const tenantSignatureRef = useRef<ReactSketchCanvasRef>(null);
    const landlordSignatureRef = useRef<ReactSketchCanvasRef>(null);

    const [isTenantConfirmed, setIsTenantConfirmed] = useState<boolean>(false);
    const [isLandlordConfirmed, setIsLandlordConfirmed] = useState<boolean>(false);

    function clearTenantSignature() {
        if (tenantSignatureRef && tenantSignatureRef.current) {
            tenantSignatureRef.current.clearCanvas();
        }
    }
    function clearLandlordSignature() {
        if (landlordSignatureRef && landlordSignatureRef.current) {
            landlordSignatureRef.current.clearCanvas();
        }
    }

    function confirmTenantSignature() {
        setIsTenantConfirmed(!isTenantConfirmed);
        tenantSignatureRef.current?.exportImage("png").then((dataUrl) => {
            updateSignatures({
                tenantDataUrl: dataUrl,
            });
        });
    }

    function confirmLandlordSignature() {
        setIsLandlordConfirmed(!isLandlordConfirmed);
        landlordSignatureRef.current?.exportImage("png").then((dataUrl) => {
            updateSignatures({
                landlordDataUrl: dataUrl,
            });
        });
    }

    return (
        <TabPanel display="flex" flexDirection="column" gap="2">
            <Heading size="md">Signature</Heading>
            <Text>
                By signing below, both parties agree to the terms and conditions of
                this Boarding House Rental Agreement.
            </Text>
            <SimpleGrid columns={2} gap="2">
                <Flex gridColumn="1/2" gridRow="1/2" justifyContent="space-between">
                    <Text>
                        Landlord Signature Here:
                    </Text>
                    <HStack>
                        <Button
                            size="xs" colorScheme='teal'
                            onClick={() => {
                                confirmLandlordSignature();
                            }}
                        >
                            {(isLandlordConfirmed) ? "Re-do" : "Confirm"}
                        </Button>
                        <Button
                            size="xs" colorScheme='red'
                            variant="outline"
                            onClick={() => {
                                if (!isLandlordConfirmed) {
                                    clearLandlordSignature();
                                }
                            }}
                        >
                            clear
                        </Button>
                    </HStack>
                </Flex>
                <Box
                    gridColumn="1/2" pointerEvents={`${(isLandlordConfirmed) ? "none" : "auto"}`}
                    border={`2px solid ${(isLandlordConfirmed) ? "green" : "red"}`} borderRadius="md"
                >
                    <ReactSketchCanvas
                        ref={landlordSignatureRef}
                        width="100%"
                        height="130px"
                        canvasColor="var(--chakra-colors-brandPallete-text)"
                        strokeColor="var(--chakra-colors-brandPallete-background)"
                    />
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
                <Flex gridColumn="2/3" gridRow="1/2" justifyContent="space-between" >
                    <Text>
                        Tenant Signature Here:
                    </Text>
                    <HStack>
                        <Button
                            size="xs" colorScheme='teal'
                            onClick={() => {
                                confirmTenantSignature();
                            }}
                        >
                            {(isTenantConfirmed) ? "Re-do" : "Confirm"}
                        </Button>
                        <Button
                            size="xs" colorScheme='red'
                            variant="outline"
                            onClick={() => {
                                if (!isTenantConfirmed) {
                                    clearTenantSignature();
                                }
                            }}
                        >
                            clear
                        </Button>
                    </HStack>
                </Flex>
                <Box
                    pointerEvents={`${(isTenantConfirmed) ? "none" : "auto"}`}
                    gridColumn="2/3" gridRow="2/3"
                    border={`2px solid ${(isTenantConfirmed) ? "green" : "red"}`} borderRadius="md"
                >
                    <ReactSketchCanvas
                        ref={tenantSignatureRef}
                        width="100%"
                        height="130px"
                        canvasColor="var(--chakra-colors-brandPallete-text)"
                        strokeColor="var(--chakra-colors-brandPallete-background)"
                    />
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
            </SimpleGrid>
        </TabPanel>
    );
}