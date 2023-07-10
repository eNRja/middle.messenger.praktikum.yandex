import { IUser, TChatItem } from "../../types";
import { Store } from "./Store";

export interface IActiveChat {
  avatar: string | null;
  created_by: number;
  id: number;
  last_message: null;
  title: string;
  unread_count: number;
}

export interface AppState {
  authError: string | null;
  profileError: string | null;
  chatsError: string | null;
  user: IUser | null;
  chats: TChatItem[];
  activeChat: IActiveChat;
  users: IUser[];
  messages: any;
  // Record<number, IChatMessage[]>
  appIsInited: boolean;
}

export const defaultActiveChat = {
  avatar: null,
  created_by: 0,
  id: 0,
  last_message: null,
  title: "",
  unread_count: 0,
};

export const defaultState: AppState = {
  authError: null,
  profileError: null,
  chatsError: null,
  user: null,
  chats: [],
  activeChat: defaultActiveChat,
  users: [],
  messages: {},
  appIsInited: false,
};

export const store = new Store<AppState>(defaultState);
