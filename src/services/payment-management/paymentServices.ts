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