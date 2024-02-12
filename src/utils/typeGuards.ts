import { RoomUtilityBill } from "../services/payment-management/paymentServices";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRoomUtilityBill(obj: any): obj is RoomUtilityBill {
    return 'room_number' in obj && 'total_bill' in obj && 'bill_due' in obj && 'date_paid' in obj && 'payment_status' in obj && 'room_utility_bill_id' in obj;
}