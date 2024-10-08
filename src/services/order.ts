import api from "../config/api";

export function getOrders({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/order?page=${page}&pageSize=${pageSize}`)
}

export function deleteOrder(orderId: number) {
  return api.delete(`/order/${orderId}`)
}