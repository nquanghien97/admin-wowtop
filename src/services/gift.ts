import api from "../config/api"
import { GiftStatus } from "../entities/Gift";

export const getAllGifts = ({ page, page_size, name } : { page?: number, page_size?: number, name?: string }) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (name) params.append('name', name.toString());
  return api.get(`/gift?${params.toString()}`)
}

export const getGift = (id: number) => {
  return api.get(`/gift/${id}`)
}

export const createGift = (data: FormData) => {
  return api.post('/gift', data)
}

export const updateGift = ({ id, data } : { id: string, data: FormData }) => {
  return api.put(`/gift/${id}`, data)
}

export const deleteGift = (id: number) => {
  return api.delete(`/gift/${id}`)
}

export const exchangedGift = ({ page, page_size, full_name, gift_name } : { page?: number, page_size?: number, full_name?: string, gift_name?: string }) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (full_name) params.append('full_name', full_name.toString());
  if (gift_name) params.append('gift_name', gift_name.toString());
  return api.get(`/exchange-gift?${params.toString()}`)
}

export const changeStatusExchangeGift = ({ id, status } : { id: number, status: GiftStatus}) => {
  const data = { status };
  return api.put(`/exchange-gift/${id}`, data);
}
