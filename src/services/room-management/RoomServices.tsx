export interface TenantSchema {
    tenant_id: string;
    first_name: string;
    last_name: string;
    contract_id: string;
}

export interface RoomSchema {
    room_number: number;
    headcount: number;
    is_full: number;
    room_fee: number;
    room_type: string;
    room_status: string;
    occupant_count: number;
}

export async function getTenants(): Promise<Array<TenantSchema> | "fail"> {
    try {
        const url = "http://localhost:3000/tenant/unassigned";
        const tenant = await fetch(url, {
            method: "GET"
        });
        if (!tenant.ok) {
            throw new Error("fail");
        }
        const tenantData = await tenant.json();
        return tenantData;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return error.message;
    }
}


export async function getTenantsFromRoom(roomNumber: number): Promise<Array<TenantSchema> | "fail"> {
    try {
        const url = `http://localhost:3000/room/${roomNumber}/tenants`;
        const tenant = await fetch(url, {
            method: "GET"
        });
        if (!tenant.ok) {
            throw new Error("fail");
        }
        const tenantData = await tenant.json();
        return tenantData;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return error.message;
    }
}
interface AssignTenantResponse {
    message: string;
    tenantList: Array<TenantSchema>;
    roomList: Array<RoomSchema>;
}

export async function assignTenant(roomNumber: number, tenantId: string, contractId: string): Promise<AssignTenantResponse | "fail"> {
    try {
        const url = `http://localhost:3000/room/${roomNumber}/tenants/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractId: contractId,
                tenantId: tenantId,
            }),
        });
        if (!response.ok) {
            throw new Error("fail");
        }
        const data = await response.json();
        return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return error.message;
    }
}

export async function removeTenant(roomNumber: number, tenantId: string, contractId: string): Promise<AssignTenantResponse | "fail"> {
    // fix route to include tenantID as param and not body
    try {
        const url = `http://localhost:3000/room/${roomNumber}/tenants`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contractId: contractId,
                tenantId: tenantId,
            }),
        });
        if (!response.ok) {
            throw new Error("fail");
        }
        const data = await response.json();
        return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        return error.message;
    }
}