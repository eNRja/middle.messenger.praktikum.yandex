import { store } from "../../core/store";
import { MessageDTO } from "../../types";
import { Message, transformMessages } from "../../utils/apiTransformers";
import {
  WSEvents,
  WS_BASE_URL,
  WebSocketTransport,
} from "../../utils/webSocketTransport";

class WebSocketController {
  private threads: Map<number, WebSocketTransport>;

  constructor() {
    this.threads = new Map();
  }

  private subscribe(activeChatID: number, ws: WebSocketTransport) {
    ws.on(WSEvents.Message, (event) => {
      this.onMessage(activeChatID, event);
    });

    ws.on(WSEvents.Close, () => {
      this.onClose(activeChatID);
    });
  }

  private async onMessage(
    activeChatID: number,
    data: MessageDTO | MessageDTO[]
  ) {
    let messages: MessageDTO[] = [];

    if (Array.isArray(data)) {
      messages = data.reverse();
    } else {
      messages.push(data);
    }

    const allMessages = store.getState().messages;
    const currentMessages = allMessages[activeChatID] || [];
    const messagesToAdd = [...currentMessages, ...transformMessages(messages)];
    store.dispatch({
      messages: {
        [activeChatID]: [...messagesToAdd],
      },
    });
  }

  private onClose(activeChatID: number) {
    try {
      this.threads.delete(activeChatID);
    } catch (e) {
      console.error(e);
    }
  }

  async connect(activeChatID: number, token: string) {
    try {
      if (this.threads.has(activeChatID)) {
        return;
      }

      const userID = store.getState().user?.id;

      if (!userID) {
        throw new Error(`User not found`);
      }

      const ws = new WebSocketTransport(
        `${WS_BASE_URL}/${userID}/${activeChatID}/${token}`
      );

      await ws.connect();

      this.subscribe(activeChatID, ws);
      this.threads.set(activeChatID, ws);

      this.fetchOldMessages(activeChatID);
    } catch (e) {
      console.error(e);
    }
  }

  async send(message: string) {
    const { id: activeChatID } = store.getState().activeChat;

    if (!activeChatID) {
      throw new Error("Chat is not connected");
    }

    const socket = this.threads.get(activeChatID);
    if (socket) {
      socket.send({
        type: "message",
        content: message.trim(),
      });
    }
  }

  fetchOldMessages(activeChat: number) {
    const socket = this.threads.get(activeChat);

    if (!socket) {
      throw new Error(`Chat ${activeChat} is not connected`);
    }

    socket.send({ type: "get old", content: "0" });
  }

  closeAll() {
    Array.from(this.threads.values()).forEach((thread) => thread.close());
  }

  close(chatID: number) {
    console.log("ws: closed");
    const socket = this.threads.get(chatID);
    socket?.close();
  }
}

export default new WebSocketController();
