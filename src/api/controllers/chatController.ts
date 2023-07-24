import { defaultActiveChat, store } from "../../core/store";
import { IChatUser, TChatTitleData } from "../../types";
import { ChatAPI, TChatsQueryParams } from "../chatApi";
import { UserController } from "./userController";
import WebSocketController from "./webSocketController";

const chatAPI = new ChatAPI();

export class ChatController {
  static async getChats(params?: TChatsQueryParams) {
    return chatAPI
      .getChatList(params)
      .then((response) => {
        store.dispatch({ chats: response.response });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getChatList(params?: TChatsQueryParams) {
    return chatAPI
      .getChatList(params)
      .then((response) => response)
      .catch((error) => {
        return error;
      });
  }

  static async addChat(data: TChatTitleData) {
    return chatAPI
      .createNewChat(data)
      .then(() => chatAPI.getChatList())
      .then((response) => {
        store.dispatch({
          chats: response.response,
        });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async deleteChat(chatId: number) {
    return chatAPI
      .deleteChatById(chatId)
      .then(() => chatAPI.getChatList())
      .then((response) => {
        WebSocketController.close(chatId);
        store.dispatch({
          chats: response.response,
          activeChat: defaultActiveChat,
        });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getUsersByLogin(login: string) {
    return UserController.getUsersByLogin(login)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async addUserToChat(id: number, chatId: number) {
    return chatAPI
      .addUsersToChat([id], chatId)
      .then((response) => {
        this.getChatUsersById(chatId);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async deleteUserfromChat(id: number, chatId: number) {
    return chatAPI
      .deleteUsersFromChat([id], chatId)
      .then((response) => {
        this.getChatUsersById(chatId);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getChatById(chatId: number) {
    let chatUsers: IChatUser[];
    return chatAPI
      .getChatUsersById(chatId)
      .then((response) => {
        chatUsers = response.response;
        return ChatController.getToken(chatId);
      })
      .then((response) => {
        const chatTokenResponse = response.response;
        const { token } = chatTokenResponse;
        if (token) {
          store.dispatch({
            users: chatUsers,
          });
          WebSocketController.connect(chatId, token);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getChatUsersById(chatId: number) {
    return chatAPI
      .getChatUsersById(chatId)
      .then((response) => {
        store.dispatch({
          users: response.response,
        });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  static async getToken(chatId: number) {
    return chatAPI
      .getChatToken(chatId)
      .then((response) => response)
      .catch((error) => {
        return error;
      });
  }

  static async changeChatAvatar(data: FormData) {
    return chatAPI
      .postChatAvatar(data)
      .then((response) => {
        store.dispatch({ activeChat: response.response });
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
