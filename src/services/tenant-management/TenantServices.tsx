export interface TenantDetails {
    first_name: string;
    last_name: string;
    contact_number: number;
    email?: string;
    tenant_image: File | null | string;
}
export interface TenantSchema extends TenantDetails {
    tenant_id: string;
    occupancy_status?: number;
    archive_stauts?: number;
}

interface PostFetch {
    message: string,
}

interface AddTenantResponse extends PostFetch {
    data: TenantSchema;
}

export async function addTenant(tenantDetail: TenantDetails): Promise<"fail" | TenantSchema> {
    try {
        const formData = new FormData();
        formData.append("firstName", tenantDetail.first_name);
        formData.append("lastName", tenantDetail.last_name);
        formData.append("contactNum", tenantDetail.contact_number.toString());
        formData.append("email", (tenantDetail.email) ? tenantDetail.email : "");
        formData.append("tenantImage", (tenantDetail.tenant_image) ? tenantDetail.tenant_image : "");
        const response = await fetch("http://localhost:3000/tenant/", {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("fail");
        } else {
            const { data }: AddTenantResponse = await response.json();
            return data;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error.message;
    }
}

export async function getTenants(): Promise<Array<TenantSchema> | "fail"> {
    const url = "http://localhost:3000/tenant/";
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

export async function getTenant(tenantId: string): Promise<Array<TenantSchema> | "fail"> {
    try {
        const tenant = await fetch(`http://localhost:3000/tenant/${tenantId}`, {
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

export async function editTenant(
    tenantId: string, firstName: string, lastName: string,
    contactNumber: number, email: string, image: string | File,
): Promise<TenantSchema | "fail"> {

    const formData = new FormData();
    formData.append("newFirstName", firstName);
    formData.append("newLastName", lastName);
    formData.append("newContactNum", contactNumber.toString());
    formData.append("newEmail", email);
    formData.append("newImage", image);
    const url = `http://localhost:3000/tenant/${tenantId}`;

    try {
        const response = await fetch(url, {
            method: "PUT",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("fail");
        } else {
            const { data } = await response.json();
            return data;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return error.message;
    }
}

export interface ContractSchema {
    contract_id?: string | null;
    tenant_id?: string;
    room_number?: number | null;
    start_date: string | null;
    end_date: string | null;
    contract_status?: number;
}
export async function getContract(tenantId: string): Promise<Array<ContractSchema> | "fail"> {
    const url = `http://localhost:3000/tenant/${tenantId}/contracts/`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const contract: Array<ContractSchema> = await response.json();
        if (contract.length < 1) {
            return "fail";
        }
        return contract;
    }
    else return "fail";
}

export async function newContract(tenantId: string, startDate: string | null, endDate: string | null): Promise<Array<ContractSchema> | "fail"> {
    const url = "http://localhost:3000/contract/";
    if (!startDate) {
        return "fail";
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tenantId: tenantId,
            startDate: startDate,
            endDate: endDate,
        })
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}

export async function editContract(tenantId: string, contract: ContractSchema): Promise<"fail" | "success"> {
    const url = `http://localhost:3000/tenant/${tenantId}/contracts/${contract.contract_id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            room_number: contract.room_number,
            end_date: contract.end_date,
            contract_status: contract.contract_status,
        }),
    });
    if (response.ok) {
        return "success";
    }
    return "fail";
}

export interface NecessitySchema {
    necessity_id?: string;
    necessity_type: string;
    necessity_fee: number;
}
interface AddNecessityReturn {
    necessities: Array<NecessitySchema>;
    message: string;
}

export async function addNecessity(contractId: string, necessityFee: number, necessityType: string): Promise<AddNecessityReturn | false> {
    const url = `http://localhost:3000/contract/${contractId}/necessities`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            necessityType: necessityType,
            necessityFee: necessityFee,
        }),
    });
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
}
interface GetNecessity {
    message: string;
    data?: Array<NecessitySchema>;
}
export async function getNecessityList(contractId: string): Promise<GetNecessity> {
    const url = `http://localhost:3000/contract/${contractId}/necessities`;
    const response = await fetch(url, {
        method: "GET"
    });
    const data: GetNecessity = await response.json();
    return data;
}

interface GetTenantImage {
    message?: string;
    imageLink?: string;
}
export async function getTenantImage(tenantId: string): Promise<GetTenantImage> {
    const url = `http://localhost:3000/tenant/${tenantId}/images`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        return {
            imageLink: imageUrl,
        };
    } else {
        return await response.json();
    }
}

export interface LeaseDetails {
    room_number: number;
    total_bill: number;
    start_date: string;
    end_date: string | null;
}

interface GetLeaseDetails {
    message: string;
    data: Array<LeaseDetails>;

}

export async function getLeaseDetails(tenantId: string): Promise<"fail" | GetLeaseDetails> {
    const url = `http://localhost:3000/tenant/${tenantId}/lease-details`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const json = await response.json();
        return json;
    } else {
        return "fail";
    }
}
export interface CollectionDetails {
    currentInvoices: number;
    pastDueInvoices: number;
    totalRent: number;
    totalNecessity: number;
    total: number;
}

interface GetCollectionDetails {
    message: string;
    collectionDetails: CollectionDetails;

}
export async function getCollectionDetails(tenantId: string): Promise<"fail" | GetCollectionDetails> {
    const url = `http://localhost:3000/tenant/${tenantId}/collection-details`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return "fail";
}

interface AddSignaturesReturn {
    landlordSignature: string;
    tenantSignature: string;
}
interface AddSignatures {
    contractId: string;
    dateSigned: string;
    signatories: Array<string>;
    tenantSignature: File | null | string | Blob;
    landlordSignature: File | null | string | Blob;
}

export async function addSignatures(newSignature: AddSignatures): Promise<false | AddSignaturesReturn> {
    try {
        const url = `http://localhost:3000/contract/${newSignature.contractId}/signatures`;
        const formData = new FormData();
        formData.append("dateSigned", newSignature.dateSigned);
        formData.append("signatories", JSON.stringify(newSignature.signatories));
        formData.append("images", (newSignature.landlordSignature) ? newSignature.landlordSignature : "");
        formData.append("images", (newSignature.tenantSignature) ? newSignature.tenantSignature : "");
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            return response.ok;
        }
        return await response.json();
    } catch (error) {
        return false;
    }
}

export interface SignatureEndpoints {
    landlord: string;
    tenant: string;
}

export async function getSignatures(tenantId: string, contractId: string): Promise<SignatureEndpoints | "fail"> {
    const url = `http://localhost:3000/tenant/${tenantId}/contracts/${contractId}/signatures`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        const urls = await response.json();
        return urls;
    } else {
        return "fail";
    }
}