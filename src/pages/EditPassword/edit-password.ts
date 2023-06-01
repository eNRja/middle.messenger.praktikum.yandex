import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/Input/input";
import Link from "../../components/Link";
import Image from "../../components/Image";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./edit-password.hbs";
import imgAvatar from "../../asserts/avatar_default.svg";

interface IEditPasswordPage {}

export class EditPasswordPage extends Block {
  constructor(props: IEditPasswordPage) {
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
    this.children.inputOldPassword = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "password",
      type: "password",
      label: "Old password",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNewPassword = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "newPassword",
      type: "password",
      label: "New password",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputNewPasswordAgain = new Input({
      classInput: "row_input",
      classLabel: "row_title",
      name: "NewPasswordAgain",
      type: "password",
      label: "New password again",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });

    this.children.saveButton = new Button({
      label: "Save",
      classButton: "save-button",
      typeButton: "submit",
      events: { click: submit },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
