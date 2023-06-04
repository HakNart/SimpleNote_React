import { apiClient } from "./ApiClient"

export const executeJwtAuthenticationService = (username, password) => {
  return apiClient.post('/api/auth/login', {email:username,password})
}