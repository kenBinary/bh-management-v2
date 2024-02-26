import {
    Box, Heading
} from "@chakra-ui/react";
import DataTable from "../DataTable";
import { useEffect, useState } from "react";
import { PaymentHistorySchema, getPaymentHistory } from "../../services/tenant-management/TenantServices";
interface PaymentHistoryProps {
    tenantId: string;
}
export default function PaymentHistory({ tenantId }: PaymentHistoryProps) {

    const [paymentHistory, setPaymentHistory] = useState<Array<PaymentHistorySchema>>([]);

    useEffect(() => {
        getPaymentHistory(tenantId).then((data) => {
            if (data !== "fail") {
                setPaymentHistory(data);
            }
        });

    }, [tenantId]);
    return (
        <Box as="section" overflowY="auto">
            <Heading
                size="sm" padding="2" color="brandPallete.background"
            >
                Payment History
            </Heading>
            <Box>
                <DataTable
                    data={paymentHistory}
                />
            </Box>
        </Box>
    );
}