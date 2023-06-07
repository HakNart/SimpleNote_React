import { apiClient } from "./ApiClient"

export const executeJwtAuthenticationService = (email, password) => {
  return apiClient.post('/api/auth/login', {email:email,password})
}

export const executeRegistrationAuthenticationService = (email, username, password) => {
  return apiClient.post('/api/auth/register', {email:email, username, password})
}