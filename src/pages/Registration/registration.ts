import { Button } from "../../components/Button";
import { Input, InputProps } from "../../components/Input/input";
import { Link } from "../../components/Link/link";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./registration.hbs";

interface IRegistration {}

export class RegistrationPage extends Block {
  constructor(props: IRegistration) {
    super(props);
  }

  protected init(): void {
    this.children.fields = this.props.inputs.map(
      (props: InputProps) => new Input(props)
    );

    this.children.inputEmail = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "email",
      type: "email",
      label: "email",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputName = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "first_name",
      type: "text",
      label: "name",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputSurname = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "second_name",
      type: "text",
      label: "second_name",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputTelephone = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "phone",
      type: "text",
      label: "phone",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPassword = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "password",
      type: "password",
      label: "password",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPasswordAgain = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "password",
      type: "password",
      label: "password again",
      placeholder: "example",
      error: "",
      value: this.props.login,
      events: {
        focusin,
        focusout,
      },
    });

    this.children.loginButton = new Button({
      label: "Log in",
      classButton: "submit__button",
      typeButton: "submit",
      events: { click: submit },
    });
    this.children.loginLink = new Link({
      href: "./login",
      label: "Have an account?",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
