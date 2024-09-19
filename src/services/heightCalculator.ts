import api from "../config/api";

export interface SearchFormType {
  page?: number;
  pageSize?: number;
  code?: string;
  phoneNumber?: string;
  parentName?: string;
  fullName?: string;
}

export function getInformations({ page, pageSize, code, fullName, phoneNumber, parentName }: SearchFormType) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (code) params.append('code', code.toString());
  if (fullName) params.append('fullName', fullName.toString());
  if (phoneNumber) params.append('phoneNumber', phoneNumber.toString());
  if (parentName) params.append('parentName', parentName.toString());

  return api.get(`/height-calculator?${params.toString()}`)
}

export function getInformation(id: number) {
  return api.get(`/height-calculator/${id}`)
}

export function deleteInformation(id: number) {
  return api.delete(`/height-calculator/${id}`)
} 