import { Button } from "../../components/Button";
import { Input } from "../../components/Input/input";
import { Link } from "../../components/Link/link";
import Block from "../../core/Block";
import { focusin, focusout, submit } from "../../utils/validation";
import template from "./registration.hbs";
import { AuthController } from "../../api/controllers/authController";
import { ROUTES } from "../../utils/constants";
import { router } from "../../core/router";
import { withStore } from "../../hocs/withStore";
import { withRouter } from "../../hocs/withRouter";

interface IRegistration {}

class RegistrationPage extends Block {
  constructor(props: IRegistration) {
    super(props);
  }

  protected init(): void {
    this.children.inputEmail = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "email",
      type: "email",
      label: "email",
      placeholder: "example",
      error: "",
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputLogin = new Input({
      classInput: "input",
      classLabel: "form_text",
      name: "login",
      type: "text",
      label: "login",
      placeholder: "example",
      error: "",
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
      events: {
        focusin,
        focusout,
      },
    });

    this.children.loginButton = new Button({
      label: "Log in",
      classButton: "submit__button",
      typeButton: "submit",
      events: {
        click: (event) => {
          submit({
            event,
            handler: AuthController.signUp,
            action: () => router.go(ROUTES.home.path),
          });
        },
      },
    });
    this.children.loginLink = new Link({
      label: "Have an account?",
      events: {
        click: (event) => {
          event.preventDefault();
          router.go("/messenger");
        },
      },
    });
  }
  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withAuthError = withStore((state) => ({ authError: state.authError }));

export default withAuthError(withRouter(RegistrationPage));
