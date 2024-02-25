interface Response {
    message?: string;
}
export interface AssignedTenant {
    tenant_id: string;
    contract_id: string;
    first_name: string;
    last_name: string;
}

interface GetAssignedTenants extends Response {
    assignedTenants: Array<AssignedTenant>;
}
export async function getAssignedTenants(): Promise<GetAssignedTenants | "fail"> {
    const url = "http://localhost:3000/tenant/assigned";
    const response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

export interface NecessityBill {
    total_bill: number;
    bill_due: string;
    date_paid: null | string;
    payment_status: number;
    necessity_bill_id: string;
}

interface GetNecessityBills extends Response {
    data: Array<NecessityBill>;
}

export async function getNecessityBills(contractId: string): Promise<GetNecessityBills | "fail"> {
    const url = `http://localhost:3000/contract/${contractId}/necessity-bills`;
    const response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

export interface RoomUtilityBill {
    room_number: number;
    total_bill: number;
    bill_due: string;
    date_paid: null | string;
    payment_status: number;
    room_utility_bill_id: string;
}

interface GetRoomUtilityBill extends Response {
    data: Array<RoomUtilityBill>;
}

export async function getRoomUtilityBills(contractId: string): Promise<GetRoomUtilityBill | "fail"> {
    const url = `http://localhost:3000/contract/${contractId}/room-utility-bills`;
    const response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

interface PayRoomUtilityBills extends Response {
    data: Array<RoomUtilityBill>;
}

export async function payRoomUtilityBills(
    billId: string, roomNumber: number, previousDue: string,
    contractId: string,
): Promise<PayRoomUtilityBills | "fail"> {
    const url = `http://localhost:3000/contract/${contractId}/room-utility-bills/${billId}`;
    const payload = {
        roomNumber: roomNumber,
        previousDue: previousDue,
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

interface payNecessityBill extends Response {
    data: Array<NecessityBill>;
}

export async function payNecessityBill(
    billId: string, contractId: string,
    paidNecessities: object, previousDue: string,
): Promise<payNecessityBill | "fail"> {
    const url = `http://localhost:3000/contract/${contractId}/necessity-bills/${billId}`;
    const payload = {
        previousDue: previousDue,
        paidNecessities: paidNecessities,
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

export interface PaymentCategories {
    name: string;
    value: number;
}

export async function getPaymentCategories(): Promise<Array<PaymentCategories> | "fail"> {
    const url = `http://localhost:3000/analytics/payment-categories`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return "fail";
    }
}