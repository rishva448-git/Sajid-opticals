import { CustomerOrder } from '@/types';

const ORDERS_STORAGE_KEY = 'sajith_eye_care_orders_v1';

export function saveOrder(order: CustomerOrder): void {
  try {
    const orders = getOrders();
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...orders]));
  } catch {
    // WhatsApp checkout remains available when browser storage is disabled.
  }
}

export function getOrders(): CustomerOrder[] {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CustomerOrder[]) : [];
  } catch {
    return [];
  }
}

export function findOrder(orderId: string, phone: string): CustomerOrder | undefined {
  const normalizedPhone = phone.replace(/\D/g, '').slice(-10);
  return getOrders().find(
    (order) =>
      order.id.toLowerCase() === orderId.trim().toLowerCase() &&
      order.customerPhone.replace(/\D/g, '').slice(-10) === normalizedPhone
  );
}

export function findOrderById(orderId: string): CustomerOrder | undefined {
  return getOrders().find((order) => order.id === orderId);
}