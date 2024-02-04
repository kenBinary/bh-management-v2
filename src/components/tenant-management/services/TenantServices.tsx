export interface TenantDetails {
    first_name: string;
    last_name: string;
    contact_number: number;
}

export async function addTenant(tenantDetail: TenantDetails): Promise<"fail" | "success"> {
    try {
        const response = await fetch("http://localhost:3000/tenant/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: `${tenantDetail.first_name}`,
                lastName: `${tenantDetail.last_name}`,
                contactNum: `${tenantDetail.contact_number}`,
            })
        });
        if (!response.ok) {
            throw new Error("fail");
        }
        return "success";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error.message;
    }
}

export interface TenantSchema extends TenantDetails {
    tenant_id: string;
    occupancy_status: number;
    archive_stauts: number;
}

export async function getTenant(tenantId: string): Promise<Array<TenantSchema> | "fail"> {
    try {
        const tenant = await fetch(`http://localhost:3000/tenant/${tenantId}`, {
            // const tenant = await fetch(`http://localhost:3000/tenant/psg1yJ2kIz`, {
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

export async function editTenant(tenantId: string, firstName: string, lastName: string, contactNumber: number): Promise<"success" | "fail"> {
    const url = `http://localhost:3000/tenant/${tenantId}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newFirstName: firstName,
                newLastName: lastName,
                newContactNum: contactNumber,
            })
        });
        if (!response.ok) {
            throw new Error("fail");
        }
        return "success";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error.message;
    }
}