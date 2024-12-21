export const API_BASE_URL = 'http://localhost:4000/api'

export const ENDPOINTS = {
  // DEPARTMENTS
  GET_DEPARTMENTS_NAMES_IDS: `${API_BASE_URL}/department/names-ids`,
  //Departements :
  FETCH_DEPARTEMENTS: () => `${API_BASE_URL}/department/all`,
  CREATE_DEPARTEMENT: () => `${API_BASE_URL}/department/create`,
  UPDATE_DEPARTEMENT: (departmentId: string) =>
    `${API_BASE_URL}/department/update/${departmentId}`,
  DELETE_DEPARTEMENT: (departmentId: string) =>
    `${API_BASE_URL}/department/delete/${departmentId}`,
  //Instructors :
  FETCH_INSTRUCTORS: () => `${API_BASE_URL}/instructor/all`,
  CREATE_INSTRUCTOR: () => `${API_BASE_URL}/instructor/create-with-department`,
  UPDATE_INSTRUCTOR: (instructorId: string) =>
    `${API_BASE_URL}/instructor/update/${instructorId}`,
  DELETE_INSTRUCTOR: (instructorId: string) =>
    `${API_BASE_URL}/instructor/delete/${instructorId}`,
  GET_INSTRUCTORS_NAMES: `${API_BASE_URL}/instructor/get-instructors-names`,
  // Members :
  FETCH_MEMBERS: (departmentId: string) =>
    `${API_BASE_URL}/member/all/${departmentId}`,
  FETCH_MEMBERS_FOR_ADMIN: `${API_BASE_URL}/member/admin/all`,
  GET_MEMBERS_NAMES: `${API_BASE_URL}/member/get-members-names`,
  UPDATE_MEMBER_FOR_ADMIN: (idUser: string) =>
    `${API_BASE_URL}/member/update/${idUser}`,
  DELETE_MEMBER_FOR_ADMIN: (idUser: string | number) =>
    `${API_BASE_URL}/member/delete/${idUser}`,
  ADD_MEMBER_FOR_ADMIN: `${API_BASE_URL}/member/create`,
  // Sessions :
  FETCH_SESSIONS_BY_DEPARTMENT: (DepartmentId: string) =>
    `${API_BASE_URL}/session/department/${DepartmentId}`,
  UPDATE_SESSION: `${API_BASE_URL}/session/Instructor_modify_Session_In_department/`,
  ADD_SESSION: `${API_BASE_URL}/session/add-session-in-department/`,
  DELETE_SESSION_FOR_INSTRUCTOR: (idSession: string | number) =>
    `${API_BASE_URL}/session/${idSession}`,
  // Response :
  FETCH_RESPONSES_FOR_INSTRUCTOR: (idAssignment: string) =>
    `${API_BASE_URL}/response/responsesByAssignment/${idAssignment}`,
  ADD_RESPONSE_FOR_MEMBER: `${API_BASE_URL}/response/responses`,
  FETCH_RESPONSE_BY_ASSIGNMENT_AND_USER: `${API_BASE_URL}/response/responsesByAssignmentIdAndUserId`,
  UPDATE_RESPONSE_BY_MEMBER: (idResponse: string) =>
    `${API_BASE_URL}/response/update/${idResponse}`,

  // Authentification
  LOGIN: `${API_BASE_URL}/user/login`,
  LOGOUT: `${API_BASE_URL}/user/logout`,

  // Chats :
  FETCH_CHATS_FOR_INSTRUCTOR: (instructorId: string) =>
    `${API_BASE_URL}/chats/${instructorId}`,
  FETCH_MESSAGES_FOR_CHAT: (Chat_Id: string) =>
    `${API_BASE_URL}/chats/getChat/${Chat_Id}`,
  CREATE_MESSAGES_IN_CHAT: () => `${API_BASE_URL}/chats/addMessage`,
 
  // Assignments :
  FETCH_ASSIGNMENTS: (departmentId: string) =>
    `${API_BASE_URL}/assignment/department/${departmentId}`,
  CREATE_ASSIGNMENT: (departmentId: string) =>
    `${API_BASE_URL}/assignment/department/${departmentId}/addAssignment`,
  UPDATE_ASSIGNMENT: (assignmentId: string) =>
    `${API_BASE_URL}/assignment/updateAssignment/${assignmentId}`,
  DELETE_ASSIGNMENT: (assignmentId: string , departmentId: string) =>
    `${API_BASE_URL}/assignment/deleteAssignment/${assignmentId}/${departmentId}`,
  FETCH_ALL_Assignements: () => `${API_BASE_URL}/assignment/getAssignments`
}
