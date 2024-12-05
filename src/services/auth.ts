import api from "../config/api";

export function login({ phone_number, password } : { phone_number: string, password: string }) {
  return api.post('/auth/login' , {phone_number, password })
} 

export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}