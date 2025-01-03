import { InstructorDTO } from '@/store/Models/InstructorDTO'
import axiosInstance from '@/axiosInstance*'
import { ENDPOINTS } from '@/store/constants/api'
import { Session } from '@/store/Models/Session'
// Fonction pour récupérer les sessions en fonction du département
export const fetchSessions = async (
  DepartmentId: string
): Promise<Session[]> => {
  try {
    const response = await axiosInstance.get<Session[]>(
      ENDPOINTS.FETCH_SESSIONS_BY_DEPARTMENT(DepartmentId)
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error)
    throw error
  }
}

export const fetchInstructorsNames = async (
  DepartmentId: string
): Promise<InstructorDTO[]> => {
  try {
    const response = await axiosInstance.get<InstructorDTO[]>(
      ENDPOINTS.FETCH_SESSIONS_BY_DEPARTMENT(DepartmentId)
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error)
    throw error
  }
}

// Fonction pour supprimer une session par ID
export const deleteSession = async (id: string | number): Promise<string> => {
  try {
    const response = await axiosInstance.delete(
      ENDPOINTS.DELETE_SESSION_FOR_INSTRUCTOR(id)
    )
    console.log(response.data)
    return 'Session supprimée avec succès'
  } catch (error) {
    console.error('Erreur lors de la suppression de la session:', error)
    return 'Erreur lors de la suppression de la session'
  }
}
// Fonction pour ajouter une nouvelle session
export const addSession = async (
  sessionData: Session,
  DepartmentId: string
): Promise<Session> => {
  try {
    const response = await axiosInstance.post<Session>(
      ENDPOINTS.ADD_SESSION,
      { ...sessionData, DepartmentId } // Fusionne departmentId avec les données de session
    )
    console.log('Nouvelle session ajoutée:', response.data)
    return response.data
  } catch (error) {
    console.error("Erreur lors de l'ajout de la session:", error)
    throw error
  }
}

// Fonction pour mettre à jour une session par ID avec l'ID dans le corps de la requête
export const updateSession = async (
  sessionId: string | number,
  sessionData: Session
): Promise<Session> => {
  try {
    // Inclure l'ID de la session dans le body de la requête
    const response = await axiosInstance.put<Session>(
      ENDPOINTS.UPDATE_SESSION,
      { ...sessionData, sessionId: sessionId } // L'ID est ajouté au corps de la requête
    )
    console.log('Session :', sessionData)
    console.log('Session 2 put :', { ...sessionData, sessionId: sessionId })

    console.log('Session mise à jour:', response.data)

    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la session:', error)
    throw error
  }
}
