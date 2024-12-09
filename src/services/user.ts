import api from "../config/api"
import { parseJwt } from "../utils/parseJwt"

export const getCurrentUser = async () => {
  return await api.get('/current-user')
}

export const getUserRole = () => {
  const token = localStorage.getItem('token') as string
  const data_parse = parseJwt(token)
  return data_parse.user_role
}

export const getAllUsers = async ({ page, page_size, phone_number, full_name } : { page?: number, page_size?: number, phone_number?: string, full_name?: string}) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (phone_number) params.append('phone_number', phone_number.toString());
  if (full_name) params.append('full_name', full_name.toString());
  return api.get(`/users?${params.toString()}`)
}

export const getUser = async (id: number) => {
  return await api.get(`/users/${id}`)
}

export const updateUser = async ({ id, data } : { id: number, data: { full_name: string } }) =>  {
  return await api.put(`/users/${id}`, data)
}

export const deleteUser = async (id: number) => {
  return await api.delete(`/users/${id}`)
}