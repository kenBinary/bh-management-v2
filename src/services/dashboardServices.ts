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

export interface RoomOverview {
    name: string;
    value: number;
}

export async function getRoomOverview(): Promise<Array<RoomOverview> | "fail"> {
    const url = `http://localhost:3000/analytics/room-overview`;
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

export interface YearlyCashIn {
    name: string;
    value: number;
}

export async function getYearlyCashIn(): Promise<Array<YearlyCashIn> | "fail"> {
    const url = `http://localhost:3000/analytics/yearly-cash-in`;
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