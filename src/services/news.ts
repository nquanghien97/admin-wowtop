import api from "../config/api";

export function getAllNews({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/news?page=${page}&pageSize=${pageSize}`)
}

export function createNews(data: FormData) {
  return api.post('news', data)
}

export function getNews(id: number) {
  return api.get(`/news/${id}`)
}

export function updateNews(id: number, data: FormData) {
  return api.put(`/news/${id}`, data)
}

export function deleteNews(id: number) {
  return api.delete(`/news/${id}`)
} 

