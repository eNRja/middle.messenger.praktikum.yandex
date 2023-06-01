import { Input, InputProps } from "../../components/Input/input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./edit-details.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";
import { Button } from "../../components/Button";

interface IEditDetailsPagePage {}

export class EditDetailsPage extends Block {
  constructor(props: IEditDetailsPagePage) {
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
      placeholder: "example",
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
      placeholder: "example",
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
      placeholder: "example",
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
      placeholder: "example",
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
      placeholder: "example",
      error: "",
      value: "+7 999 874 2222",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.saveButton = new Button({
      label: "Save",
      classButton: "edit-details__save-button",
      typeButton: "submit",
      events: { click: submit },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
