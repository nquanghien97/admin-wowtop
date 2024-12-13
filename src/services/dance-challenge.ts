import api from "../config/api";

export function getDanceChallenges({ page = 1, page_size = 10 } : { page?: number, page_size?: number }) {
  return api.get(`/dance-challenge?page=${page}&page_size=${page_size}`)
}

export function deleteDanceChallenge(orderId: number) {
  return api.delete(`/dance-challenge/${orderId}`)
}