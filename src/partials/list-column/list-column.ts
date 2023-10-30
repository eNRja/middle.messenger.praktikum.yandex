import Block from "../../core/Block";
import template from "./list-column.hbs";
import Input from "../../components/Input";
import ChatColumn from "../chat-column";
import { focusin, focusout } from "../../utils/validation";
import imgChat from "../../asserts/chat.png";
import PopupBtn from "../../components/popupBtn";
import Modal from "../../components/Modal";
import { renderDOM } from "../../core";
import { store } from "../../core/store";
import { ChatController } from "../../api/controllers/chatController";
import { getTime } from "../../utils/handlers";
import WebSocketController from "../../api/controllers/webSocketController";
import { Link } from "../../components/Link/link";
import { router } from "../../core/router";

const createNewChat = () => {
  const modal = new Modal({
    title: "Create new chat",
    createNewChatBool: true,
  });

  renderDOM(modal, "#modal");
  modal.show();
};
interface ListColumnProps {}

export class ListColumn extends Block {
  constructor(props: ListColumnProps) {
    super(props);
  }

  init() {
    // const gg = input.message_user === store.state.user ? "Вы: " : ""
    this.props.noChats = store.state.chats.length > 0 ? false : true;

    this.children.profileLink = new Link({
      label: "Profile",
      isProfileImg: true,
      className: "list-column__font_grey_a",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/settings");
        },
      },
    });

    this.children.createNewChatBtn = new PopupBtn({
      class: "chat-button",
      divClass: "chat-div_button",
      src: imgChat,
      alt: "add",
      events: {
        click: createNewChat,
      },
    });

    this.children.inputSearch = new Input({
      classInput: "list-column__input",
      name: "message",
      label: "",
      value: "",
      error: "",
      type: "text",
      placeholder: "search",
      events: {
        focusin,
        focusout,
      },
    });

    if (store.state.chats.length > 0) {
      this.children.chatColumn = store.state.chats.map(
        (input: any) =>
          new ChatColumn({
            avatar: input.avatar,
            created_by: input.created_by,
            id: input.id,
            // isYou: input.message_user === store.state.user ? "Вы: " : "",
            last_message: input.last_message ? input.last_message.content : "",
            time: input.last_message
              ? input.last_message.time && getTime(input.last_message.time)
              : "",
            title: input.title,
            unread_count: input.unread_count === 0 ? null : input.unread_count,
            events: {
              click: () => {
                WebSocketController.close(store.state.activeChat.id);
                ChatController.getChatById(input.id);
                store.dispatch({ activeChat: input });
              },
            },
          })
      );
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
