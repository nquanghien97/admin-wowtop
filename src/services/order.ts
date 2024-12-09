import api from "../config/api";

export function getOrders({ page = 1, page_size = 10 } : { page?: number, page_size?: number }) {
  return api.get(`/order?page=${page}&page_size=${page_size}`)
}

export function deleteOrder(orderId: number) {
  return api.delete(`/order/${orderId}`)
}