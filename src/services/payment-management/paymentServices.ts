interface Response {
    message?: string;
}
export interface AssignedTenants {
    tenant_id: string;
    contract_id: string;
    first_name: string;
    last_name: string;
}

interface GetAssignedTenants extends Response {
    assignedTenants: Array<AssignedTenants>;
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