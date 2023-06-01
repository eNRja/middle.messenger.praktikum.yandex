import { Button } from "../../components/Button";
import { Input } from "../../components/Input/input";
import { Link } from "../../components/Link/link";
import Block from "../../utils/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./login.hbs";

interface ILogin {}

export class LoginPage extends Block {
  constructor(props: ILogin) {
    super(props);
  }

  protected init(): void {
    this.children.inputLogin = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "login",
      type: "text",
      label: "login",
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
      label: "password",
      value: "",
      error: "",
      placeholder: "example",
      type: "password",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.loginButton = new Button({
      label: "Sign in",
      classButton: "submit__button",
      typeButton: "submit",
      events: { click: submit },
    });
    this.children.registrationLink = new Link({
      href: "./registration",
      label: "Have no account?",
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
