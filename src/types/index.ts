// Авторизация, регистрация
export type TSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

//Профиль
export type TUserProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TUserPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type TUserLogin = {
  login: string;
};

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

// Чат
export type TLastMessageUser = {
  first_name: string;
  second_name: string;
  avatar: string | null;
  email: string;
  login: string;
  phone: string;
};

export type TLastMessage = {
  user: TLastMessageUser;
  time: string;
  content: string;
};

export type TChatItem = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: TLastMessage | null;
  created_by: number;
};

export interface IChatUser extends IUser {
  role: string;
}

export type TChatTitleData = {
  title: string;
};

export type TChatIdData = {
  chatid: number;
};

export type TActiveChat = {
  users: IChatUser[];
  id: number;
};

export interface IChatMessage {
  chatId: number;
  content: string;
  file: {
    id: number;
    userId: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  } | null;
  id: number;
  isRead: boolean;
  time: string;
  type: string;
  userId: number;
}

export type TAPIError = {
  reason: string;
};

export type Token = {
  token: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type ChatMessageDTO = {
  id: number;
  time: string;
  content: string;
  user: UserDTO;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: ChatMessageDTO;
};

export type ChatsDTO = ChatDTO[] | [];

export type FileDTO = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type MessageDTO = {
  id: number;
  is_read: boolean | null;
  chat_id: number | null;
  time: string;
  type: "message" | "file";
  user_id: number;
  content: string;
  file: FileDTO | null;
};

export interface IModal {
  title: string;
  addUserBool?: boolean;
  changeAvatarBool?: boolean;
  deleteUserBool?: boolean;
  deleteChatBool?: boolean;
  createNewChatBool?: boolean;
  changeChatAvatarBool?: boolean;
  action?: () => void;
}
