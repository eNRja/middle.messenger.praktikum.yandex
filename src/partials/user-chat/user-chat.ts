import Input from "../../components/Input";
import Block from "../../core/Block";
import template from "./user-chat.hbs";
import Image from "../../components/Image";
import imgEllipse from "../../asserts/Ellipse.png";
import imgAdd from "../../asserts/add.svg";
import imgDelete from "../../asserts/delete.svg";
import imgVideo from "../../asserts/photo_video.svg";
import imgFile from "../../asserts/file.svg";
import imgLocation from "../../asserts/location.svg";
import { Button } from "../../components/Button";
import { sendMessage } from "../../utils/validation";
import { API_RESOURCES_PATH } from "../../utils/constants";
import PopupBtn from "../../components/popupBtn";
import { store } from "../../core/store";
import {
  closeModalHandler,
  getTime,
  openModal,
  prettyDate,
} from "../../utils/handlers";
import Message from "../messages";
import { IChatMessage } from "../../types";

interface UserChatProps {}

export class UserChat extends Block {
  constructor(props: UserChatProps) {
    super(props);
  }

  init() {
    const messages = store.state.messages[store.state.activeChat.id];

    this.props.chatName = store.state.activeChat.title;
    this.props.noMessages = messages === undefined ? true : false;

    const avatar = store.state.activeChat && store.state.activeChat.avatar;
    const srcImage = avatar ? API_RESOURCES_PATH + avatar : imgEllipse;

    if (messages !== undefined) {
      this.children.messages = messages.map(
        (item: IChatMessage) =>
          new Message({
            chatId: item.chatId,
            content: item.content,
            file: item.file,
            id: item.id,
            isRead: item.isRead,
            time: getTime(item.time),
            date: prettyDate(item.time),
            type: item.type,
            userId: item.userId,
          })
      );
    }

    this.children.imageAvatar = new Image({
      class: "user-chat__header_avatar",
      srcImg: srcImage,
      alt: "avatar",
      events: {
        click: () =>
          openModal({
            title: "Change chat avatar",
            action: closeModalHandler,
            changeChatAvatarBool: true,
          }),
      },
    });
    this.children.addUser = new PopupBtn({
      title: "Add user",
      src: imgAdd,
      alt: "add",
      divClass: "popup-btn",
      events: {
        click: () =>
          openModal({
            title: "Add user",
            action: closeModalHandler,
            addUserBool: true,
          }),
      },
    });
    this.children.deleteUser = new PopupBtn({
      title: "Delete user",
      src: imgDelete,
      alt: "delete",
      divClass: "popup-btn",
      events: {
        click: () =>
          openModal({
            title: "Delete user",
            action: closeModalHandler,
            deleteUserBool: true,
          }),
      },
    });
    this.children.deleteChat = new PopupBtn({
      title: "Delete chat",
      src: imgDelete,
      alt: "delete",
      divClass: "popup-btn",
      events: {
        click: () =>
          openModal({
            title: "Delete chat",
            action: closeModalHandler,
            deleteChatBool: true,
          }),
      },
    });

    this.children.imageVideo = new Image({
      srcImg: imgVideo,
      alt: "video",
    });
    this.children.imageFile = new Image({
      srcImg: imgFile,
      alt: "file",
    });
    this.children.imageLocation = new Image({
      srcImg: imgLocation,
      alt: "location",
    });

    this.children.inputMessage = new Input({
      classInput: "user-chat__footer_input",
      classLabel: "user-chat__footer_label",
      name: "message",
      label: "",
      value: "",
      error: "",
      type: "text",
      placeholder: "Write a message...",
      events: {},
    });
    this.children.sendButton = new Button({
      label: "",
      classButton: "user-chat__footer_send-button",
      typeButton: "submit",
      events: {
        click: (event) => {
          sendMessage({ event, chatId: store.state.activeChat.id });
          const elem = document.querySelectorAll(".message");
          const last = elem[elem.length - 1];
          last && last.scrollIntoView();
        },
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
