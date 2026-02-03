export interface Delivery {
  id?: number;
  tracking_code: string;
  recipient_name: string;
  address: string;
  time_slot: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'READY' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'FAILED';
}