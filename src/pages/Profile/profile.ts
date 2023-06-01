import { Input, InputProps } from "../../components/Input/input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../utils/Block";
import { focusin, focusout } from "../../utils/validation";
import template from "./profile.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";

interface IProfilePagePage {}

export class ProfilePage extends Block {
  constructor(props: IProfilePagePage) {
    super(props);
  }

  protected init(): void {
    this.children.fields = this.props.inputs.map(
      (props: InputProps) => new Input(props)
    );

    this.children.backButton = new Link({
      href: "./",
      label: "",
    });
    this.children.imageAvatar = new Image({
      srcImg: imgAvatar,
      alt: "avatar",
    });
    this.children.inputEmail = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "email",
      type: "email",
      label: "Email",
      disabled: true,
      error: "",
      value: "example@yandex.ru",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputLogin = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "login",
      type: "text",
      label: "Login",
      disabled: true,
      error: "",
      value: "Ivanov Ivan",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "first_name",
      type: "text",
      label: "Name",
      disabled: true,
      error: "",
      value: "Ivan",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputSurName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "second_name",
      type: "text",
      label: "SurName",
      disabled: true,
      error: "",
      value: "Ivanov",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNickName = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "chat_name",
      type: "text",
      label: "NickName",
      disabled: true,
      error: "",
      value: "Ivan III",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputTelephone = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "phone",
      type: "text",
      label: "Telephone",
      disabled: true,
      error: "",
      value: "+7 999 874 2222",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.editDetailsLink = new Link({
      href: "./edit-details",
      label: "Edit details",
      className: "profile__button",
    });
    this.children.editPasswordLink = new Link({
      href: "./edit-password",
      label: "Edit password",
      className: "profile__button",
    });
    this.children.logOutLink = new Link({
      href: "./",
      label: "Log out",
      className: "profile__button_log-out",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
