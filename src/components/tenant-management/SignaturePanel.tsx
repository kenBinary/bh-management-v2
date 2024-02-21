import {
    Button, Box, HStack,
    Heading, Text, SimpleGrid,
    Flex, Image,
    TabPanel,
} from '@chakra-ui/react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

import {
    useEffect,
    useRef, useState
} from 'react';
import { format } from 'date-fns';
import { SignatureEndpoints, getSignatures } from '../../services/tenant-management/TenantServices';
export interface SignatureUrls {
    tenantDataUrl?: string;
    landlordDataUrl?: string;
}
interface SignaturePanel {
    currentDate: string;
    tenantId: string;
    contractId: string | null;
    updateSignatures: (signatures: SignatureUrls) => void;
}
export function SignaturePanel({
    currentDate, updateSignatures,
    tenantId, contractId,
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

    const [signatures, setSignatures] = useState<SignatureEndpoints | null>(null);

    useEffect(() => {
        if (contractId) {
            getSignatures(tenantId, contractId).then((data) => {
                if (data === "fail") {
                    setSignatures(null);
                } else {
                    console.log(data);
                    setSignatures(data);
                }
            });
        }
    }, [tenantId, contractId]);

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
                        {
                            (signatures)
                                ?
                                null
                                :
                                <>
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
                                </>
                        }
                    </HStack>
                </Flex>
                <Box
                    gridColumn="1/2" pointerEvents={`${(isLandlordConfirmed || signatures) ? "none" : "auto"}`}
                    border={`2px solid ${(isLandlordConfirmed) ? "green" : "red"}`} borderRadius="md"
                >
                    {
                        (signatures)
                            ?
                            <Image src={(signatures) ? signatures.landlord : ''}></Image>
                            :
                            <ReactSketchCanvas
                                ref={landlordSignatureRef}
                                width="100%"
                                height="130px"
                                canvasColor="#EEEEEE"
                                strokeColor="#393E46"
                            />
                    }
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
                <Flex gridColumn="2/3" gridRow="1/2" justifyContent="space-between" >
                    <Text>
                        Tenant Signature Here:
                    </Text>
                    <HStack>
                        {
                            (signatures)
                                ?
                                null
                                :
                                <>
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
                                </>
                        }
                    </HStack>
                </Flex>
                <Box
                    pointerEvents={`${(isTenantConfirmed || signatures) ? "none" : "auto"}`}
                    gridColumn="2/3" gridRow="2/3"
                    border={`2px solid ${(isTenantConfirmed) ? "green" : "red"}`} borderRadius="md"
                >
                    {
                        (signatures)
                            ?
                            <Image src={(signatures) ? `${signatures.tenant}` : ``}></Image>
                            :
                            <ReactSketchCanvas
                                ref={tenantSignatureRef}
                                width="100%"
                                height="130px"
                                canvasColor="#EEEEEE"
                                strokeColor="#393E46"
                            />
                    }
                </Box>
                <Text>
                    {format(new Date(currentDate), "MMM d, yyyy")}
                </Text>
            </SimpleGrid>
        </TabPanel>
    );
}