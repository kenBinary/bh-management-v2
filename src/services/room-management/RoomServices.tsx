export interface TenantSchema {
    tenant_id: string;
    first_name: string;
    last_name: string;
    occupancy_status: number;
    contact_number: number;
    archive_status: number;
}

export interface RoomSchema {
    room_number: number;
    headcount: number;
    is_full: number;
    room_fee: number;
    room_type: string;
    room_status: string;
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
        const url = `http://localhost:3000/room/${roomNumber}/tenant`;
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