export interface IRouter {
  [key: string]: { title: string; path: string };
}

export const API_PATH = "https://ya-praktikum.tech/api/v2";
export const API_RESOURCES_PATH = `${API_PATH}/resources`;
export const WSS_PATH = "wss://ya-praktikum.tech/ws/chats";

export const ROUTES: IRouter = {
  home: { title: "Main", path: "/" },
  login: { title: "Login", path: "/login" },
  registration: { title: "Registration", path: "/registration" },
  chat: { title: "Chat", path: "/chat" },
  profile: { title: "Profile", path: "/profile" },
  editDetails: { title: "Edit Details", path: "/edit-details" },
  editPassword: { title: "Edit Password", path: "/edit-password" },
  error_404: { title: "Error 404", path: "/error-404" },
  error_500: { title: "Error 500", path: "/error-500" },
};

export const API_ENDPOINTS = {
  users: {
    changeProfile: `${API_PATH}/user/profile`,
    changeAvatar: `${API_PATH}/user/profile/avatar`,
    changePassword: `${API_PATH}/user/password`,
    getUserById: (id: string) => `${API_PATH}/user/${id}`,
    searchUserByLogin: `${API_PATH}/user/search`,
  },
  auth: {
    signUp: `${API_PATH}/auth/signup`,
    signIn: `${API_PATH}/auth/signin`,
    user: `${API_PATH}/auth/user`,
    logout: `${API_PATH}/auth/logout`,
  },
  chats: {
    chats: `${API_PATH}/chats`,
    chatAvatar: `${API_PATH}/chats/avatar`,
    chatUsersById: (id: number) => `${API_PATH}/chats/${id}/users`,
    newMessagesCount: (id: string) => `${API_PATH}/chats/new/${id}`,
    chatsUsers: `${API_PATH}/chats/users`,
    getChatUsers: (id: number) => `${API_PATH}/chats/token/${id}`,
  },
};
