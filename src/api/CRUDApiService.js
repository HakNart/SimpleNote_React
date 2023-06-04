import { apiClient } from "./ApiClient";

export const getAllNotesFromUsernameApi = () => apiClient.get(`/users/notes`)

export const deleteNoteApi = (id) => apiClient.delete(`/users/notes/${id}`)

export const getOneNoteByIdApi = (id) => apiClient.get(`/users/notes/${id}`)

export const createNoteApi = (note) => apiClient.post(`/users/notes`, note)

export const updatedNoteApi = (id, note) => apiClient.put(`/users/notes/${id}`, note)