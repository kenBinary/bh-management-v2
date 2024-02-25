export interface CardMetrics {
    monthlyCashIn: number;
    totalTenants: number;
    rentCollections: number;
    vacantRooms: number;
}

export async function getPropertyMetrics(): Promise<CardMetrics | "fail"> {
    const url = `http://localhost:3000/analytics/property-metrics`;
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