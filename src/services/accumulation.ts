import api from "../config/api";
import { StatusCode } from "../entities/Accumulation";

export const getAllAccumulationCode = async ({ page, page_size, status, code } : { page?: number, page_size?: number, status?: StatusCode, code?: string}) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  if (status) params.append('status', status.toString());
  if (code) params.append('code', code.toString());
  return api.get(`/accumulation-code?${params.toString()}`)
}

export const getAccumulationCode = async ({ code } : { code: string }) => {
  return api.get(`/accumulation-code/${code}`)
}

export const updateAccumulationCode = async ({ code, status, new_code } : { code: string, status: StatusCode, new_code?: string}) => {
  return api.put(`/accumulation-code/${code}`, { status, new_code })
}

export const deleteAccumulationCode = async ({ code } : { code: string }) => {
  return api.delete(`/accumulation-code/${code}`)
}

export const createAccumulationCode = async (data: { code: string }) => {
  return api.post('/accumulation-code', data)
}

export const createBulkAccumulationCode = async (data: { codes: string[] }) => {
  return api.post('/bulk-codes', data)
}
