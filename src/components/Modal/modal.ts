import { ChatController } from "../../api/controllers/chatController";
import { UserController } from "../../api/controllers/userController";
import { Block } from "../../core";
import { router } from "../../core/router";
import { store } from "../../core/store";
import { IModal } from "../../types";
import { ROUTES } from "../../utils/constants";
import { closeModalHandler, findModalInputHandler } from "../../utils/handlers";
import { submitFile, submitPopup } from "../../utils/validation";
import { Button } from "../Button";
import Input from "../Input";
import { ModalOverlay } from "../ModalOverlay/modalOverlay";
import template from "./modal.hbs";

export class Modal extends Block {
  constructor(props: IModal) {
    super(props);
  }
  // second user id --> 1136119
  protected init(): void {
    //addFile
    this.children.selectFileInput = new Input({
      classInput: "file-input",
      classLabel: "file-label",
      name: "avatar",
      type: "file",
      error: "",
    });
    this.children.changeButton = new Button({
      label: "Change",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitFile({
            event,
            handler: UserController.changeAvatar,
            action: () => router.go(ROUTES.profile.path),
          });
        },
      },
    });
    this.children.changeChatAvatarButton = new Button({
      label: "Change",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitFile({
            event,
            handler: ChatController.changeChatAvatar,
            chatId: `${store.state.activeChat.id}`,
          });
        },
      },
    });
    this.children.escButton = new Button({
      label: "",
      classButton: "popup__escBtn",
      typeButton: "button",
      events: {
        click: () => {
          closeModalHandler();
        },
      },
    });

    //input for add-delete user
    this.children.actionInput = new Input({
      classInput: "input",
      classLabel: "form_text",
      id: "modal__action_input",
      name: "chatId",
      type: "text",
      label: "Chat id",
      error: "",
    });

    //AddUser
    this.children.addUserButton = new Button({
      label: "Add",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitPopup({
            event,
            handler: () =>
              ChatController.addUserToChat(
                findModalInputHandler(),
                store.state.activeChat.id
              ),
            action: this.props.action,
          });
        },
      },
    });

    //delete user
    this.children.deleteUserButton = new Button({
      label: "Delete",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitPopup({
            event,
            handler: () =>
              ChatController.deleteUserfromChat(
                findModalInputHandler(),
                store.state.activeChat.id
              ),
            action: closeModalHandler,
          });
        },
      },
    });

    //create chat
    this.children.createChatButton = new Button({
      label: "Create",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submitPopup({
            event,
            handler: ChatController.addChat,
            action: closeModalHandler,
          });
        },
      },
    });
    this.children.inputTitle = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "title",
      type: "text",
      label: "title",
      error: "",
    });

    //delete chat
    this.children.deleteChatButton = new Button({
      label: "Confirm",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          event.preventDefault();
          ChatController.deleteChat(store.state.activeChat.id);
          closeModalHandler();
        },
      },
    });
    this.children.inputDeleteChat = new Input({
      classInput: "input-agree",
      classLabel: "label-agree",
      name: "title",
      type: "text",
      label: "Are you sure?",
      error: "",
    });

    //Overlay
    this.children.modalOverlay = new ModalOverlay({
      events: {
        click: () => {
          closeModalHandler();
        },
      },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
